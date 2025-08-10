import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { IoStar } from "react-icons/io5";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
const ProductDetailsDialog = ({ open, setOpen, productDetail }) => {

  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  
    const handleAddToCart = (getCurrentProductID) => {
      console.log("getCurrentProductID", getCurrentProductID);
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductID,
          quantity: 1,
        })
      ).then((res) => {
        console.log("res", res);
        if (res.payload.success) {
          toast({
            title: "Product added to cart",
            description: "Product added to cart successfully",
            variant: "default",
          });
          dispatch(fetchCartItem({ userId: user?.id }));
        } else {
          toast({
            title: "Error to add Product to cart",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      });
    };

    const handleDialogClose = () => {
      setOpen(false);
      dispatch(setProductDetails());
    };
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className=" grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className=" relative overflow-hidden rounded-lg">
          <img
            src={productDetail?.image}
            alt={productDetail?.title}
            width={600}
            height={600}
            className=" aspect-square w-full object-cover"
          />
        </div>

        <div className=" m-2">
          <div>
            <h1 className=" text-3xl font-extrabold">{productDetail?.title}</h1>
            <p className=" text-muted-foreground text-2xl mb-2 ">
              {productDetail?.description}
            </p>
          </div>
          <div className=" flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetail?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{productDetail?.price}
            </p>
            {productDetail?.salePrice > 0 && (
              <p className=" text-3xl font-bold text-muted-foreground">
                ₹{productDetail?.salePrice}
              </p>
            )}
          </div>
          <div className=" flex items-center gap-2 mt-2">
            <div className=" flex items-center gap-0.5">
              <IoStar className=" text-yellow-500 w-5 h-5 " />
              <IoStar className=" text-yellow-500 w-5 h-5 " />
              <IoStar className=" text-yellow-500 w-5 h-5 " />
              <IoStar className=" text-yellow-500 w-5 h-5 " />
              <IoStar className=" text-yellow-500 w-5 h-5 " />
            </div>
            <span className=" text-muted-foreground">4.5</span>
          </div>
          <div className=" mt-5 mb-5 ">
            <Button className=" w-full" onClick={() => handleAddToCart(productDetail?._id)}  >Add to cart</Button>
          </div>
          <Separator />
          <div className=" max-h-[300px] overflow-auto">
            <h2 className=" text-xl font-bold mb-4">Reviews</h2>
            <div className=" grid gap-6 ">
              <div className=" flex gap-4">
                <Avatar className=" w-10 h-10 border">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className=" grid gap-1">
                  <div className=" flex items-center gap-2">
                    <h3>User Name</h3>
                  </div>
                  <div className=" flex items-center gap-0.5">
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                  </div>
                  <p>This is awesome product</p>
                </div>
              </div>
            </div>
            <div className=" grid gap-6 ">
              <div className=" flex gap-4">
                <Avatar className=" w-10 h-10 border">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className=" grid gap-1">
                  <div className=" flex items-center gap-2">
                    <h3>User Name</h3>
                  </div>
                  <div className=" flex items-center gap-0.5">
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                  </div>
                  <p>This is awesome product</p>
                </div>
              </div>
            </div>
            <div className=" grid gap-6 ">
              <div className=" flex gap-4">
                <Avatar className=" w-10 h-10 border">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className=" grid gap-1">
                  <div className=" flex items-center gap-2">
                    <h3>User Name</h3>
                  </div>
                  <div className=" flex items-center gap-0.5">
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                  </div>
                  <p>This is awesome product</p>
                </div>
              </div>
            </div>
            <div className=" grid gap-6 ">
              <div className=" flex gap-4">
                <Avatar className=" w-10 h-10 border">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className=" grid gap-1">
                  <div className=" flex items-center gap-2">
                    <h3>User Name</h3>
                  </div>
                  <div className=" flex items-center gap-0.5">
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                  </div>
                  <p>This is awesome product</p>
                </div>
              </div>
            </div>
            <div className=" grid gap-6 ">
              <div className=" flex gap-4">
                <Avatar className=" w-10 h-10 border">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className=" grid gap-1">
                  <div className=" flex items-center gap-2">
                    <h3>User Name</h3>
                  </div>
                  <div className=" flex items-center gap-0.5">
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                    <IoStar className=" text-yellow-500 w-5 h-5 fill-primary" />
                  </div>
                  <p>This is awesome product</p>
                </div>
              </div>
            </div>
            <div className=" mt-6 flex gap-2 mb-2">
              <Input placeholder="Write a review" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
