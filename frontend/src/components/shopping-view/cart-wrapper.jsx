import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

import { ShoppingCart } from "lucide-react";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
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
  return cartItems && cartItems.length > 0 ? (
    <SheetContent className=" sm:max-w-md  ">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => (
              <UserCartItemsContent key={items.id} cartItems={items} />
            ))
          : null}
      </div>
      <div className=" mt-8 space-y-4 ">
        <div className=" flex justify-between ">
          <span className=" font-bold">Total</span>
          <span className=" font-bold">₹{totalAmt}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          setOpenCartSheet(false);
          navigate("/shop/checkout");
        }}
        className=" w-full mt-6 "
      >
        Checkout
      </Button>
    </SheetContent>
  ) : (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-12 flex flex-col items-center justify-center text-center space-y-6">
        {/* Icon */}
        <div className="rounded-full bg-gray-100 p-6">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Looks like you haven’t added anything to your cart yet.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => (
            navigate("/shop/listing"),
            setOpenCartSheet(false)
          )}
         className="px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
          Continue Shopping
        </Button>
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
