import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl
}) => {
  const inputRef = useRef(null);
  const imageFileChange = (e) => {
    console.log("e.target.file", e.target.files[0]);
    const selectImage = e.target.files[0];
    if (selectImage) {
      setImageFile(selectImage);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append('my_file',imageFile);
    const response = await axios.post("http://localhost:3000/api/admin/product/upload-product-image",data);
    console.log("response",response);
    
    if(response){
      setUploadedImageUrl(response.data.url);
    }
  }

  useEffect(()=>{
    if(imageFile!==null){
      uploadImageToCloudinary();
    }
  },[imageFile])
  return (
    <div className=" w-full max-w-md mx-auto mt-4">
      <Label className=" text-lg font-semibold mb-2 block"> Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className=" border-2 border-dashed rounded-lg  p-4 "
      >
        <Input
          id="image-upload"
          type="file"
          className=" hidden"
          ref={inputRef}
          onChange={imageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className=" flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className=" w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : (
          <div className=" flex items-center justify-between">
            <div className=" flex items-center ">
              <FileIcon className=" w-8 h-8 text-primary mr-2" />
            </div>
            <p className=" text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className=" text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className=" w-4 h-4" />
              <span className=" sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
