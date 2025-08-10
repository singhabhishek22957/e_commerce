import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({ product  , setOpenCreateProductsDialog, setCurrentEditedId, setFormData , handleDeleteProduct}) => {
  return (
    <Card className=" w-full max-w-sm mx-auto">
      <div className=" ">
        <div className=" relative">
          <img
            src={product?.image}
            alt={product?.title}
            className=" w-full h-[300px] object-contain rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className=" text-xl font-bold mb-2">{product?.title}</h2>
          <div className={`${product?.salePrice > 0 ? "" : "hidden"} font-bold text-lg text-red-500`}> {(100 - (product?.salePrice / product?.price) * 100).toFixed(0)}% off</div>
          <div className=" flex justify-between items-center mb-2 ">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary `}
            >
              ₹{product?.price}
            </span>
            <span className={` text-lg font-semibold text-primary ${product?.salePrice > 0 ? "" : "hidden"} `}>₹{product?.salePrice}</span>
          </div>
          
        </CardContent>
        <CardFooter className=' flex justify-between items-center '>
            <Button onClick={()=>{
              setOpenCreateProductsDialog(true)
              setCurrentEditedId(product?._id)
              setFormData(product)
            }} >Edit</Button>
            <Button onClick={() => handleDeleteProduct(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
