import React, { useEffect, useState } from "react";
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
import { Label } from "@radix-ui/react-dropdown-menu";
import StarRatingComponent from "../common/star-rating";
import { addProductReview, getProductReview } from "@/store/shop/review-slice";
const ProductDetailsDialog = ({ open, setOpen, productDetail }) => {
  const { reviewList } = useSelector((state) => state.shoppingReview);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleRatingChange = (getRating) => {
    setReviewRating(getRating);
  };

  const handleAddReview = () => {
    dispatch(
      addProductReview({
        userId: user?.id,
        username: user?.username,
        productId: productDetail?._id,
        reviewValue: reviewRating,
        reviewMessage: reviewMessage,
      })
    ).then((res) => {
      if (res.payload.success) {
        toast({
          title: "Review added",
          description: "Review added successfully",
          variant: "default",
        });
        dispatch(getProductReview(productDetail?._id));
      } else {
        toast({
          title: "Error to add Review",
          description: res.payload.message,
          variant: "destructive",
        });
      }
      setReviewMessage("");
      setReviewRating(0);
      console.log("res", res);
    });
  };

  const handleAddToCart = (getCurrentProductID, totalStock) => {
    console.log("getCurrentProductID", getCurrentProductID);
    console.log("cartItems", cartItems);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductID
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          return toast({
            title: "Product is out of stock",
            description: `only you can buy ${totalStock} of this product`,
            variant: "destructive",
          });
        }
      }
    }
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
    console.log("User details", user);
    
    setOpen(false);
    setReviewMessage("");
    setReviewRating(0);
    dispatch(setProductDetails());
  };

  // fetch product review
  useEffect(() => {
    dispatch(getProductReview(productDetail?._id)).then((res) => {
      console.log("res product review", res);
    });
  }, [productDetail]);
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
              <StarRatingComponent rating={productDetail?.totalRating} />
            </div>
            <span className=" text-muted-foreground">
              {productDetail?.totalRating}
            </span>
          </div>
          <div className=" mt-5 mb-5 ">
            {productDetail?.totalStock === 0 ? (
              <Button
                className=" w-full  cursor-not-allowed opacity-60"
                onClick={() => {
                  toast({
                    title: "Out of stock",
                    description: "Product is out of stock",
                    variant: "destructive",
                  });
                }}
              >
                Out of stock
              </Button>
            ) : (
              <Button
                className=" w-full"
                onClick={() =>
                  handleAddToCart(productDetail?._id, productDetail?.totalStock)
                }
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />

          {/* <Reviews /> */}
          <div className=" max-h-[300px] gap-3 overflow-auto">
            <h2 className=" text-xl font-bold mb-4">Reviews</h2>
            {reviewList && reviewList.length > 0
              ? reviewList.map((review) => (
                  <div className=" grid gap-6 ">
                    <div className=" flex gap-4">
                      <Avatar className=" w-10 h-10 border">
                        <AvatarFallback>
                          {review.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className=" grid gap-1">
                        <div className=" flex items-center gap-2">
                          <h3>{review.username}</h3>
                        </div>
                        <div className=" flex items-center gap-0.5">
                          <StarRatingComponent rating={review.reviewValue} />
                        </div>
                        <p className=" pb-3">{review.reviewMessage}</p>
                      </div>
                    </div>
                  </div>
                ))
              : "No Reviews Found"}
            <div className=" mt-10 flex flex-col gap-2 mb-2">
              <Label>Write a review</Label>
              <div className=" flex gap-1 ">
                <StarRatingComponent
                  rating={reviewRating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMessage}
                onChange={(event) => setReviewMessage(event.target.value)}
                placeholder="Write a review"
              />
              <Button
                disabled={reviewMessage.trim() === "" || reviewRating === 0}
                onClick={handleAddReview}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
