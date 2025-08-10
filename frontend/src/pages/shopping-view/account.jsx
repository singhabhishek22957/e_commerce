import React from "react";
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Orders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

const ShopAccount = () => {
  return (
    <div className=" flex flex-col">
      <div className=" relative h-[300px] w-full overflow-hidden">
        <img
          
          src={accImg}
          alt="account image"
          className=" w-full h-full object-cover object-center"
        />
      </div>
      <div className=" container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className=" flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <Tabs defaultValue="orders">
                <TabsList className=' text-lg space-x-8'>
                    <TabsTrigger className="" value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="address">Address</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                   <ShoppingOrders />
                </TabsContent>
                <TabsContent value="address">
                    <Address />
                </TabsContent>
                
            </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopAccount;
