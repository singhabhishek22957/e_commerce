import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

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
          {product?.salePrice > 0 ? (
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
          <div className={`${product?.salePrice > 0 ? "" : "hidden"} font-bold text-lg text-red-500`}> {(100 - (product?.salePrice / product?.price) * 100).toFixed(0)}% off</div>
        </CardContent>
      </div>

      <CardFooter>
        <Button onClick={() => handleAddToCart(product._id)} className="w-full">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
