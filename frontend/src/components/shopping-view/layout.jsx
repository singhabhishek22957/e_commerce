import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import { useSelector } from "react-redux";
import CardSkeleton from "../common/CardSkeleton";

const ShoppingLayout = () => {
  return (
    <div className=" flex  flex-col bg-white overflow-hidden ">
      {/* common component */}
      <ShoppingHeader/>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
