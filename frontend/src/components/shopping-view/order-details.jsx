import React from 'react';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import CommonForm from '../common/form';
import { DialogContent } from '../ui/dialog';


const ShoppingOrderDetailsView = () => {

    return (
            <DialogContent className=" h-[80vh] overflow-auto scroll-smooth mt-6 mb-6 sm:max-w-[600px]">
      <div className=" grid gap-6">
        <div className=" grid gap-2">
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Id</p>
            <Label>#123456</Label>
          </div>
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Date</p>
            <Label>12-12-2022</Label>
          </div>
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Status</p>
            <Label>Pending</Label>
          </div>
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Price</p>
            <Label>₹500</Label>
          </div>
        </div>
        <Separator />
        <div className=" gap-4 grid">
          <div className=" grid gap-2">
            <div className=" font-medium">Order Details</div>
            <ul className=" grid gap-3 ">
              <li className=" flex items-center justify-between ">
                <p className=" text-sm font-medium ">Product</p>
                <p className=" text-sm font-medium ">Quantity</p>
                <p className=" text-sm font-medium ">Price</p>
              </li>
              <li className=" flex items-center justify-between ">
                <p className=" text-sm ">Product 1</p>
                <p className=" text-sm ">1</p>
                <p>₹500</p>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <div className=" grid gap-4">
          <div className=" grid gap-2">
            <div className=" font-medium ">Shipping Information</div>
            <div className=" grid gap-0.5 text-muted-foreground ">
              <span>Name: John Doe</span>
              <span>Address: 123 Main St, Anytown, USA</span>
              <span>City: Anytown</span>
              <span>State: California</span>
              <span>Phone: (123) 456-7890</span>
              <span>Notes: Special instructions</span>
            </div>
          </div>
        </div>
       
      </div>
    </DialogContent>
    );
}

export default ShoppingOrderDetailsView;
