import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems , setOpenCartSheet}) => {
  const navigate = useNavigate();
  const totalAmt =
    cartItems &&
    cartItems.length > 0 &&
    cartItems.reduce(
      (acc, item) =>
        acc +
        (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0
    );
  return (
    <SheetContent className=" sm:max-w-md  ">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" mt-8 space-y-4">
        {cartItems &&
          cartItems.length > 0?
          cartItems.map((items) => (
            <UserCartItemsContent key={items.id} cartItems={items} />
          )):null}
      </div>
      <div className=" mt-8 space-y-4 ">
        <div className=" flex justify-between ">
          <span className=" font-bold">Total</span>
          <span className=" font-bold">₹{totalAmt}</span>
        </div>
      </div>
      <Button onClick={()=> {
        setOpenCartSheet(false);
        navigate("/shop/checkout");
      }} className=" w-full mt-6 ">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
