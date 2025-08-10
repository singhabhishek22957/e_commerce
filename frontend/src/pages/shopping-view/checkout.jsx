import React from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShopCheckout = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const totalAmt =
    cartItems.items &&
    cartItems.items.length > 0 &&
    cartItems.items.reduce(
      (acc, item) =>
        acc +
        (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0
    );
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
        <Address />
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
            <Button className=" w-full">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
