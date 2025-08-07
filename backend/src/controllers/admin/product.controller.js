import { v2 as cloudinary } from "cloudinary";
import { handleImageUpload } from "../../helpers/cloudinary.js";
import { Product } from "../../models/product.model.js";

const handleImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await handleImageUpload(url);
    console.log("result", result);
    res
      .status(200)
      .json({
        success: true,
        message: "Image uploaded successfully",
        data: result,
      });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};


const addProduct = async (req,res)=>{
  const {image, title, description, category, price, brand, salePrice, totalStock} = req.body;
  console.log("req.body", req.body);
  
  try {
    const product = await Product.create({image, title, description, category, price, brand, salePrice, totalStock});
    res.status(200).json({success:true, message:"Product added successfully", data:product});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:"Internal Server Error", error:error});
    
  }

}

const getAllProducts = async (req,res)=>{
  try {
    const products = await Product.find({});
    if(!products){
      return res.status(404).json({success:false, message:"Products not found"});
    }
    res.status(200).json({success:true, message:"Products fetched successfully", data:products});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:"Internal Server Error", error:error});
    
  }
}

const getProductById = async (req,res)=>{
  const {id} = req.params;
  try {
    const product = await Product.findById(id);
    if(!product){
      return res.status(404).json({success:false, message:"Product not found"});
    }
    res.status(200).json({success:true, message:"Product fetched successfully", data:product});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:"Internal Server Error", error:error});
    
  }
}


const deleteProduct = async (req,res)=>{
  const {id} = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({success:false, message:"Product not found"});
    }
    res.status(200).json({success:true, message:"Product deleted successfully", data:product});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:"Internal Server Error", error:error});
    
  }
}

const updateProduct = async (req,res)=>{
  const {id} = req.params;
  console.log("req.body", req.body);
  
  const {image, title, description, category, price, brand, sellPrice, totalStock} = req.body;
  console.log("req.body", req.body);
  
  try {
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product){
      return res.status(404).json({success:false, message:"Product not found"});
    }

    const updateProduct = await Product.findByIdAndUpdate(
      {_id:id},
      { image,title, description, category, price, brand, sellPrice, totalStock},
      {new:true}
    )
    res.status(200).json({success:true, message:"Product updated successfully", data:updateProduct});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:"Internal Server Error", error:error});
    
  }
}




export { 
    handleImage,
    addProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct
 };
