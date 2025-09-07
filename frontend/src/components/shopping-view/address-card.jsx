import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleUpdateAddress,
  handleDeleteAddress,
  setAddressId,
  addressId,
}) => {
  return (
    <Card
      onClick={() => setAddressId(addressInfo?._id)}
      className={`w-full  cursor-pointer ${
        addressInfo?._id === addressId ? "border-2 border-blue-500" : ""
      }`}
    >
      <CardContent className=" grid gap-4">
        <Label className=" text-sm font-semibold">
          <span className=" text-muted-foreground">Address:</span>{" "}
          {addressInfo?.address}
        </Label>
        <Label>
          <span className=" text-muted-foreground">Contact:</span>{" "}
          {addressInfo?.contact}
        </Label>
        <Label>
          <span className=" text-muted-foreground">City:</span>{" "}
          {addressInfo?.city}
        </Label>
        <Label>
          <span className=" text-muted-foreground">State:</span>{" "}
          {addressInfo?.state}
        </Label>
        <Label>
          <span className=" text-muted-foreground">Country:</span>{" "}
          {addressInfo?.country}
        </Label>
        <Label>
          <span className=" text-muted-foreground">Pincode:</span>{" "}
          {addressInfo?.pincode}
        </Label>
        <Label>
          <span className=" text-muted-foreground">Notes:</span>{" "}
          {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className=" p-3 flex gap-2 justify-between">
        <Button
          onClick={() => handleUpdateAddress(addressInfo)}
          className=" bg-gray-300 text-black hover:bg-gray-400 hover:text-white w-full"
        >
          Update
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className=" bg-gray-300 text-black hover:bg-gray-400 hover:text-white w-full"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
