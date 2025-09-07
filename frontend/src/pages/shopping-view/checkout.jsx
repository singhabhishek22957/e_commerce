
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder, createNewOrderWithStripe } from "@/store/shop/order-slice";

const ShopCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const [addressId, setAddressId] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const {approvalUrl} = useSelector((state) => state.shoppingOrder);
  const dispatch = useDispatch();
  const {toast} = useToast();
  const totalAmt =
    cartItems.items &&
    cartItems.items.length > 0 &&
    cartItems.items.reduce(
      (acc, item) =>
        acc +
        (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0
    );

    const handleInitiatePaypalPayment = () => {
      if(cartItems.length === 0){
        return toast({
          title: "Error",
          description: "Your cart is empty",
          variant: "destructive",
        });
      }
      if(addressId === null){
        return toast({
          title: "Error",
          description: "Please select an address",
          variant: "destructive",
        });
      }
      console.log("cartItems",cartItems);
      
      
      const orderData = {
        userId: user?.id,
        cartId:cartItems._id,
            cartItems:cartItems.items.map((item)=>({
                productId:item.productId,
                quantity:item.quantity,
                title:item.title,
                price:item.salePrice > 0 ? item.salePrice : item.price,
                image:item.image
            })),
            addressId:addressId,
            orderStatus:"pending",
            paymentStatus:"pending",
            paymentMethod:"paypal",
            totalAmount:totalAmt,
            totalQuantity:cartItems.items.reduce((acc, item) => acc + item.quantity, 0),
            orderDate:new Date().toISOString(),
            paymentId:"",
            payerId:"",
            orderUpdateDate:new Date().toISOString(),
      }
      console.log("orderData", orderData);
      
      console.log("cartItems", cartItems);
      // dispatch(createNewOrder(orderData)).then((res)=>{
      //   console.log("res", res);
      //   if(res.payload.success){
      //     setIsPaymentStarted(true);

      //   }else{
      //     toast({
      //       title: "Error",
      //       description: res.payload.message,
      //       variant: "destructive",
      //     });
      //   }
        
      // })
      dispatch(createNewOrderWithStripe(orderData)).then((res)=>{
        console.log("res", res);
        if(res.payload.success){
          setIsPaymentStarted(true);

        }else{
          toast({
            title: "Error",
            description: res.payload.message,
            variant: "destructive",
          });
        }
      })
      
      
    }

    if(approvalUrl){
      window.location.href = approvalUrl
    }
  return (
    <div className=" flex flex-col ">
      <div className=" relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="orders image"
          className=" w-full h-full object-cover object-center"
        />
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address addressId={addressId} setAddressId={setAddressId} />
        <div className=" flex flex-col gap-4">
          {cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((product) => (
                <UserCartItemsContent key={product.id} cartItems={product} />
              ))
            : null}
          <div className=" mt-8 space-y-4 ">
            <div className=" flex justify-between ">
              <span className=" font-bold">Total</span>
              <span className=" font-bold">₹{totalAmt}</span>
            </div>
          </div>
          <div className=" mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className=" w-full">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
