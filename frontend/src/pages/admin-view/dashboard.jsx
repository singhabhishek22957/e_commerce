import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { addFeatureImage, getFeatureImages } from "@/store/common/feature-slice";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
    const {featureImages} = useSelector((state) => state.commonFeature);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);
  const dispatch = useDispatch();
  console.log("uploadedImage", uploadedImage);
//   const handleFeatureImage = () => {
//     if(!uploadedImage) {
//       return toast({
//         title: "Image File Not Found",
//         description: "Please select an image file",
//         variant: "destructive",
//       });
//     }
   
   
//   };

   useEffect(()=>{
        if(imageFile!==null){
             dispatch(addFeatureImage(uploadedImage)).then((res) => {
      console.log("res", res);
      if (res.payload.success) {
        toast({
          title: "Success",
          description: res.payload.message,
          variant: "success",
          className: "bg-green-600 text-white",
        });
        dispatch(getFeatureImages());
        setImageFile(null);
        setShowResetButton(true);
      } else {
        toast({
          title: "Error",
          description: res.payload.message,
          variant: "destructive",
        });
      }
    });
        }
    })

  useEffect(()=>{
    dispatch(getFeatureImages()).then((res)=>{
      console.log("res", res);
    })
  },[dispatch])

  console.log("Feature Images", featureImages);
  
  return (
    <>
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImage}
        setUploadedImageUrl={setUploadedImage}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
      />
      <span   className={` text-sm text-muted-foreground ${showResetButton ? "" : "hidden"}`}> Do you want upload another image <span onClick={() => {
        setUploadedImage(null);
        setShowResetButton(false);
      }}  className=" text-primary underline cursor-pointer ">click here</span></span>
    </div>
    <div>
        <div className=" mt-8 space-y-4 ">
            <div className=" flex justify-start gap-3 " >
                <span className=" font-bold">Total:</span>
                <span className=" font-bold">₹{featureImages.length}</span>
            </div>
            <div className=" flex justify-start ">
                <h1 className=" text-xl font-extrabold">Feature Images</h1>
            </div>
            <div  className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {
                    featureImages.map((image) => (
                        <div key={image._id} className=" relative aspect-square overflow-hidden rounded-md border" >
                            <img src={image.image} alt={image.title} className=" h-full w-full object-cover object-center" />
                            <Button title="Delete" className=" absolute top-2 right-2 bg-primary text-white" ><Trash /></Button>
                        </div>
                    ))
                }
                
            </div>
        </div>

    </div>
    </>
  );
};

export default AdminDashboard;
