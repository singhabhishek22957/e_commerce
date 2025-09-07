import React, { useEffect  } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { X } from "lucide-react"; // ✅ missing import
import { useDispatch, useSelector } from "react-redux";
import { getAddressById } from "@/store/shop/address-slice";

const ShoppingOrderDetailsView = ({ order }) => {
const { addressDetails } = useSelector((state) => state.shoppingAddress);
const {user} = useSelector((state) => state.auth);

  console.log("order", order);

  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("addressId from order", order?.addressId);
    
   if(order?.addressId){
    dispatch(getAddressById(order?.addressId)).then((res)=>{
      console.log("res", res);
    })
   }
   console.log("address", addressDetails);
  },[dispatch,order?.addressId])

  
  

  return (
    
    <DialogContent className={`  h-[80vh] overflow-auto scroll-smooth mt-6 mb-6 sm:max-w-[600px]  ${order==null|| addressDetails==null && "hidden"}`}>
      <DialogTitle>Order Details</DialogTitle>

      {/* ✅ Proper Radix Close button */}

      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Id</p>
            <Label>{order?._id}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>
              {order?.orderDate.split("T")[0].split("-").reverse().join("-")}
            </Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{order?.paymentStatus}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>{order?.orderStatus}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹ {order?.totalAmount}</Label>
          </div>
        </div>

        <Separator />

        <div className="gap-4 grid">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>

            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2"></th>{" "}
                  {/* Image column without heading */}
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.cartItems?.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-2">
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {item?.title}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {item?.quantity}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      ₹ {item?.price * item?.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Information</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Name: {user?.name} </span>
              <span>Address: {addressDetails?.address}</span>
              <span>City: {addressDetails?.city}</span>
              <span>State: {addressDetails?.state}</span>
              <span>Phone: {addressDetails?.contact}</span>
              <span>Notes: {addressDetails?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
