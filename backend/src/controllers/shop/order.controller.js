import paypal from "../../helpers/paypal.js";
import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";

import stripe from "stripe";
import { Product } from "../../models/product.model.js";
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  const {
    userId,
    cartItems,
    addressId,
    orderStatus,
    paymentStatus,
    paymentMethod,
    totalAmount,
    totalQuantity,
    orderDate,
    paymentId,
    payerId,
    orderUpdateDate,
  } = req.body;
  try {
    console.log("req.body", req.body);
    console.log("Client id", process.env.PAYPAL_CLIENT_ID);
    console.log("Client secret", process.env.PAYPAL_CLIENT_SECRET);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.FRONTEND_URL}/shop/paypal-return`,
        cancel_url: `${process.env.FRONTEND_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => {
              return {
                name: item.title,
                sku: item.productId,
                price: item.price,
                currency: "USD",
                quantity: item.quantity,
              };
            }),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Thanks for shopping with us",
        },
      ],
    };

    console.log("create_payment_json", create_payment_json);
    console.log("Paypal", paypal);

    paypal.payment.create(create_payment_json, async function (error, payment) {
      if (error) {
        console.log("error", error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
          error: error.message,
        });
      } else {
        const newlyCreatedOrder = await Order.create({
          userId,
          cartItems,
          addressId,
          orderStatus,
          paymentStatus,
          paymentMethod,
          totalAmount,
          totalQuantity,
          orderDate,
          paymentId,
          payerId,
          orderUpdateDate,
        });

        const approveLink = payment.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        return res.status(201).json({
          success: true,
          message: "Order created successfully",
          data: newlyCreatedOrder,
          orderId: newlyCreatedOrder._id,
          paymentLink: approveLink,
        });
      }
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createOrderWithStripe = async (req, res) => {
  console.log("req.body", req.body);

  const {
    cartId,
    userId,
    cartItems,
    addressId,
    orderStatus,
    paymentStatus,
    paymentMethod,
    totalAmount,
    totalQuantity,
    orderDate,
    paymentId,
    payerId,
    orderUpdateDate,
  } = req.body;

  try {
    const orderCreate = await Order.create({
      userId,
      cartId,
      cartItems,
      addressId,
      orderStatus,
      paymentStatus,
      paymentMethod,
      totalAmount,
      totalQuantity,
      orderDate,
      paymentId,
      payerId,
      orderUpdateDate,
    });

    if (!orderCreate) {
      return res.status(500).json({
        success: false,
        message: "Error while creating order",
      });
    }
    const metadataObject = {
      userId: String(userId),
      cartId: String(cartId),
      addressId: String(addressId),
      totalAmount: String(totalAmount),
      totalQuantity: String(totalQuantity),
      orderId: String(orderCreate._id),
    };
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      metadata: metadataObject,
      success_url: `${process.env.FRONTEND_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/shop/stripe-cancel`,
    });

    if (!session) {
      return res.status(500).json({
        success: false,
        message: "Error while creating stripe payment",
      });
    }
    console.log("I am here");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: session,
      url: session.url,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in stripe",
      error: error.message,
    });
  }
};

const capturePayment = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const payment = await stripeClient.checkout.sessions.retrieve(sessionId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const paymentInfo = await stripeClient.paymentIntents.retrieve(
      payment.payment_intent
    );
    if (payment.payment_status === "paid") {
      const orderCreate = await Order.findByIdAndUpdate(
        { _id: payment.metadata.orderId },
        {
          paymentStatus: "paid",
          paymentId: paymentInfo.id,
          payerId: paymentInfo.payer,
          orderStatus: "placed",
        },
        { new: true }
      );

      if (!orderCreate) {
        return res.status(404).json({
          success: false,
          message: "Something error to payment",
        });
      }

      for(let item of orderCreate.cartItems){
        let product = await Product.findById(item.productId);
        if(!product){
          return res.status(404).json({
            success: false,
            message: "not enough product stock for this product",
          });
        }

        if(product.totalStock < item.quantity){
          return res.status(404).json({
            success: false,
            message: "not enough product stock for this product",
          });
        }
        product.totalStock -= item.quantity;;
        await product.save();
      }

      const deleteCart = await Cart.findByIdAndDelete(payment.metadata.cartId);
      if (!deleteCart) {
        return res.status(404).json({
          success: false,
          message: "Something error to payment",
        });
      }

      return res.status(200).json({
        success: true,
        orderData: orderCreate,
        paymentData: payment,
        paymentInfo: paymentInfo,
        message: "Payment captured successfully",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const order = await Order.find({ userId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export {
  createOrder,
  capturePayment,
  createOrderWithStripe,
  getOrderByUser,
  getOrderById,
};
