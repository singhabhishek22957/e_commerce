import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { toast } from "@/hooks/use-toast";

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className=" w-full max-w-sm mx-auto ">
      <div onClick={() => handleGetProductDetails(product._id)} className="">
        <div className=" relative">
          <img
            src={product.image}
            alt={product.title}
            className=" w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className=" absolute top-2 right-2 bg-green-600 hover:bg-green-700">
              Out of stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className=" absolute top-2 right-2 bg-yellow-600 hover:bg-yellow-700">
              {`Only ${product?.totalStock} ${
                product?.totalStock === 1 ? "item" : "items"
              } left`}
            </Badge>
          ) :null}
          {
           product?.salePrice > 0 ? (
            <Badge className=" absolute top-2 left-2 bg-red-600 hover:bg-red-700">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className=" p-4 ">
          <h2 className=" text-xl font-bold mb-2 ">{product.title}</h2>
          <div className=" flex justify-between items-center mb-2 ">
            <span className=" text-[16px] text-muted-foreground">
              {categoryOptionsMap[product.category]}
            </span>
            <span className=" text-[16px] text-muted-foreground">
              {brandOptionsMap[product.brand]}
            </span>
          </div>
          <div className=" flex justify-between items-center mb-2 ">
            <span
              className={` text-lg font-semibold text-primary ${
                product.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{product.price}
            </span>
            {product.salePrice > 0 && (
              <span className=" text-sm text-muted-foreground">
                ₹{product.salePrice}
              </span>
            )}
          </div>
          <div
            className={`${
              product?.salePrice > 0 ? "" : "hidden"
            } font-bold text-lg text-red-500`}
          >
            {" "}
            {(100 - (product?.salePrice / product?.price) * 100).toFixed(0)}%
            off
          </div>
        </CardContent>
      </div>

      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button
            onClick={() => {
              toast({
                title: "Out of stock",
                description: "Product is out of stock",
                variant: "destructive",
              });
            }}
            className="w-full opacity-60 cursor-not-allowed"
          >
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product._id, product.totalStock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
