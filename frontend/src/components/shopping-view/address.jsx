import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from "@/store/shop/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./address-card";

const initialAddressFromData = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  notes: "",
  contact: "",
};
const Address = () => {
  const [formData, setFormData] = useState(initialAddressFromData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);
  const [currentUpdatedId, setCurrentUpdatedId] = useState(null);
  const handleMangedAddress = (e) => {
    e.preventDefault();

    if (currentUpdatedId !== null)
      return dispatch(
        updateAddress({
          addressData: formData,
          addressId: currentUpdatedId,
          userId: user?.id,
        })
      ).then((res) => {
        console.log(res);
        if (res.payload.success) {
          toast({
            title: "Success",
            description: res.payload.message,
            variant: "default",
          });
          setFormData(initialAddressFromData);
          setCurrentUpdatedId(null);
          dispatch(fetchAddress(user?.id));
        } else {
          toast({
            title: "Error",
            description: res.payload.message,
            variant: "destructive",
          });
        }
      });

      if(addressList?.length >= 5) return toast({
        title: "Error",
        description: "You can add only 5 address",
        variant: "destructive",
      });

    console.log(formData);
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((res) => {
      console.log(res);
      if (res.payload.success) {
        toast({
          title: "Success",
          description: res.payload.message,
          variant: "default",
        });
        setFormData(initialAddressFromData);
        dispatch(fetchAddress(user?.id));
      } else {
        toast({
          title: "Error",
          description: res.payload.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleUpdateAddress = (addressInfo) => {
    setFormData({
      address: addressInfo?.address,
      city: addressInfo?.city,
      state: addressInfo?.state,
      country: addressInfo?.country,
      pincode: addressInfo?.pincode,
      notes: addressInfo?.notes,
      contact: addressInfo?.contact,
    });
    setCurrentUpdatedId(addressInfo?._id);
  };

  const handleDeleteAddress = (addressId) => {
    console.log(addressId);
    dispatch(
      deleteAddress({ userId: addressId?.userId, addressId: addressId?._id })
    ).then((res) => {
      if (res.payload.success) {
        toast({
          title: "Success",
          description: res.payload.message,
          variant: "default",
        });
        dispatch(fetchAddress(user?.id));
      } else {
        toast({
          title: "Error",
          description: res.payload.message,
          variant: "destructive",
        });
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);
  console.log("addressList", addressList);

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((isValid) => isValid);
  };
  return (
    <Card>
      <div className=" mb-5 p-3 grid grid-cols-1 sm:grid-cols-2   gap-3">
        {addressList && addressList.length > 0
          ? addressList.map((address) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                key={address.id}
                addressInfo={address}
                handleUpdateAddress={handleUpdateAddress}
              />
            ))
          : ""}
      </div>
      <CardHeader>
        <CardTitle>
          {currentUpdatedId ? "Update Address" : "Add Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          isBtnDisabled={!isFormValid()}
          formData={formData}
          buttonText={currentUpdatedId ? "Update Address" : "Add Address"}
          onSubmit={handleMangedAddress}
          setFormData={setFormData}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
