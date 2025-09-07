import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin-view/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { addNewProducts, deleteProduct, getAllProducts, updateProduct } from "@/store/admin/products-slice";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  brand: "",
  salePrice: "",
  totalStock: "",
};
const AdminProduct = () => {
  const { toast } = useToast();
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =useState(false);
  const [formData, setFormData] = useState(initialState);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productsList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  },[dispatch])
  const onSubmit = async (e) => {
    e.preventDefault();

    if(currentEditedId!==null){
      dispatch(updateProduct({
        id:currentEditedId,formData
      })).then((res)=>{
        if (res.payload.success) {
        toast({
          title: "Product Updated",
          description: "Product Updated successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error to update Product",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
        
      })
    }else{
      console.log("uploadedImage", uploadedImage);
    if (!uploadedImage) {
      return toast({
        title: "Image File Not Found",
        description: "Please select an image file",
        variant: "destructive",
      });
    }
    const formDatToSend = {
      ...formData,
      image:uploadedImage,
    }
    dispatch(addNewProducts(formDatToSend)).then((res) => {
      if (res.payload.success) {
        dispatch(getAllProducts());
        toast({
          title: "Product Added",
          description: "Product added successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
      console.log("res", res);
      setOpenCreateProductsDialog(false);
      setFormData(initialState);
      setImageFile(null);
      setUploadedImage(null);
    });
    }
    
  };
  console.log("formData", formData);

  const isFormValid=()=>{
    return Object.keys(formData).map((key)=> formData[key]!=="").every((isValid)=>isValid);
  }

  const handleDeleteProduct = (getCurrentProductId)=>{
    console.log("getCurrentProductId", getCurrentProductId);
    dispatch(deleteProduct({id:getCurrentProductId})).then((res)=>{
      if (res.payload.success) {
        toast({
          title: "Product Deleted",
          description: "Product deleted successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error to delete Product",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
      
    })
  }
  
 
  
  return (
    <Fragment >
      <div className=" w-full mb-5 flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add new Product
        </Button>
      </div>
      <div className=" grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {productsList &&
          productsList.length > 0 &&
          productsList.map((product) => (
            <AdminProductTile setFormData={setFormData} handleDeleteProduct={handleDeleteProduct} setCurrentEditedId={setCurrentEditedId} setOpenCreateProductsDialog={setOpenCreateProductsDialog} product={product} key={product._id} />
          ))}
      </div>
      
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={()=>{
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
          
        }}
        
      >
        
        <SheetContent side="right" className=" overflow-auto  ">
          <SheetHeader>
            <SheetTitle>{currentEditedId?"Update Product":"Add Product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImage}
            setUploadedImageUrl={setUploadedImage}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode = {currentEditedId!=null}
          />
          <div className=" py-6 ">
            <CommonForm
              onSubmit={onSubmit}
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId?"Update Product":"Add Product"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProduct;
