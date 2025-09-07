import { DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";

const initialFormData = {
    status: "",
}
const AdminOrdersDetailsView = ({order, setClose}) => {
    const [formData, setFormData] = useState(initialFormData)
    const dispatch = useDispatch();
    const {toast} = useToast();
    const handleUpdateStatus = (e) => {
        e.preventDefault();
        console.log("formData", formData);
        dispatch(updateOrderStatus({orderId:order._id,orderStatus:formData.status})).then((res)=>{
          console.log("res", res);
          if(res.payload.success){
            setClose(false);
            toast({
              title: "Success",
              description: res.payload.message,
              variant: "success",
              className: "bg-green-600 text-white"
            })
          }else{
            toast({
              title: "Error",
              description: res.payload.message,
              variant: "destructive"
            })
          }
          
        })

        

    }
  return (
    <DialogContent className="  h-[80vh] overflow-auto scroll-smooth mt-6 mb-6 sm:max-w-[600px]">
      <DialogTitle>Order Details</DialogTitle>
      <div className=" grid gap-6">
        <div className=" grid gap-2">
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Id</p>
            <Label>{order?._id}</Label>
          </div>
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Date</p>
            <Label>{order?.orderDate?.split("T")[0].split("-").reverse().join("/")}</Label>
          </div>
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Status</p>
            <Label>
              <Badge
                      className={`py-1 px-3 ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500"
                          : "bg-black"
                      }`}
                    >
                      {order?.orderStatus}
                    </Badge>
            </Label>
          </div>
          <div className=" flex mt-6 items-center justify-between ">
            <p className=" font-medium ">Order Price</p>
            <Label>₹{order?.totalAmount}</Label>
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
              {/* <span>Name: {user?.name} </span>
              <span>Address: {addressDetails?.address}</span>
              <span>City: {addressDetails?.city}</span>
              <span>State: {addressDetails?.state}</span>
              <span>Phone: {addressDetails?.contact}</span>
              <span>Notes: {addressDetails?.notes}</span> */}
               <span>AddressId: {order?.addressId} </span>
              
            </div>
          </div>
        </div>
       
        <Separator />
        <div className=" ">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  {
                    label: "In Process",
                    id: "inProcess",
                  },
                  {
                    label: "In Shipping",
                    id: "inShipping",
                  },
                  {
                    label: "Pending",
                    id: "pending",
                  },
                  {
                    label: "rejected",
                    id: "rejected",
                  },
                  {
                    label: "Cancelled",
                    id: "cancelled",
                  },
                  {
                    label: "Delivered",
                    id: "delivered",
                  },
                ],
              },
            ]}
          formData={formData} setFormData={setFormData} buttonText={"Update Order Status"} onSubmit={handleUpdateStatus} />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrdersDetailsView;
