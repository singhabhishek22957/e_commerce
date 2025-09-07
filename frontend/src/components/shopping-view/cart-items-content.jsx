import React from "react";
import { Button } from "../ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const { productsList } = useSelector((state) => state.shoppingProduct);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const handleCartItemDelete = (cartItems) => {
    dispatch(
      deleteCartItem({ userId: user.id, productId: cartItems.productId })
    ).then((res) => {
      if (res.payload.success) {
        toast({
          title: "Product removed from cart",
          description: "Product removed from cart successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error to remove Product from cart",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };

  const handleUpdateQuantity = (cartItems, type) => {
    if (type === "plus") {
      let product = productsList.find(
        (item) => item._id === cartItems.productId
      );
      let totalStock = product.totalStock;
      if (cartItems.quantity + 1 > totalStock) {
        return toast({
          title: "Product is out of stock",
          description: `only you can buy ${totalStock} of this product`,
          variant: "destructive",
        });
      }
    }

    dispatch(
      updateCartItem({
        userId: user.id,
        productId: cartItems.productId,
        quantity:
          type == "plus" ? cartItems.quantity + 1 : cartItems.quantity - 1,
        type,
      })
    ).then((res) => {
      console.log("res", res);
      if (res.payload.success) {
        toast({
          title: "Product quantity updated",
          description: "Product quantity updated successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error to update Product quantity",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <div className=" flex items-center space-x-4">
      <img
        className=" w-20 h-20 rounded object-cover"
        src={cartItems.image}
        alt={cartItems.title}
      />
      <div className=" flex-1  ">
        <h3 className=" font-extrabold">{cartItems.title}</h3>
        <div className=" flex items-center mt-1">
          <Button
            className=" h-8 w-8 rounded-full hover:bg-gray-500 active:bg-gray-100"
            variant="outline"
            size="icon"
            disabled={cartItems.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
          >
            <FaMinus className=" w-4 h-4" />
            <span className=" sr-only">Decrease</span>
          </Button>
          <span className=" font-semibold mr-2 ml-2">{cartItems.quantity}</span>
          <Button
            className=" h-8 w-8 rounded-full hover:bg-gray-500 active:bg-gray-100"
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
          >
            <FaPlus />
            <span className=" w-4 h-4 sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className=" flex flex-col items-end">
        <p className=" font-semibold">
          ₹
          {(
            (cartItems.salePrice > 0 ? cartItems.salePrice : cartItems.price) *
            cartItems.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className=" cursor-pointer mt-1 "
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
