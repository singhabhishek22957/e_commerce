import { populate } from "dotenv";
import { Cart } from "../../models/cart.model.js";
import { Product } from "../../models/product.model.js";

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data Provided" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      const newCart = await Cart.create({ userId: userId, items: [] });
      // return res.status(200).json({success:true, message:"Product added to cart successfully", data:newCart});
    }
    const findCurrentProductIndex = cart?.items?.findIndex(
      (item) => item.productId.toString() == productId
    );
    if (findCurrentProductIndex == -1) {
      cart.items.push({ productId: productId, quantity: quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }
    await cart.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Product added to cart successfully",
        data: cart,
      });
  } catch (error) {
    console.log("error", error);

    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
const fetchCartItem = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data Provided" });
    }
    const cart = await Cart.findOne({ userId: userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const validItems = cart.items.filter((item) => item.productId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedItems = validItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
    }));
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: {
        ...cart._doc,
        items: populatedItems,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data Provided" });
    }
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() == productId
    );
    if (findCurrentProductIndex == -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populatedItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      quantity: item.quantity,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
    }));
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: {
        ...cart._doc,
        items: populatedItems,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.params;
    console.log("we intering to delete with  user and product", userId, productId);
    
  try {
    if(!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data Provided" });
    }
    console.log(" user and product are found ");
    
    const cart = await Cart.findOne({ userId: userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    })

    console.log("we finding a cart");
    
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    console.log("cart found");
    

    cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId);
    console.log("cart items filtered");
    
    await cart.save();
    console.log("cart saved");
    
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    })

    console.log("cart populated");
    
    const populatedItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      quantity: item.quantity,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
    }));

    console.log("cart items mapped");
    

    console.log(" sending response");
    
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: {
        ...cart._doc,
        items: populatedItems,
      },
    });



  } catch (error) {
    console.log(error);
     return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};


export { addToCart, fetchCartItem, updateCartItem, deleteCartItem };
