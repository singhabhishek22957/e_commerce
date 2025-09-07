import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import CardSkeleton from "../common/CardSkeleton";

const ShoppingLayout = () => {
  return (
    <div className=" flex  flex-col bg-white  ">
      {/* common component */}
      <ShoppingHeader/>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
