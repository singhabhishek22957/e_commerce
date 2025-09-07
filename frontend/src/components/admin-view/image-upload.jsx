import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { FileIcon, ImportIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, {  useRef } from "react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,

}) => {
  const inputRef = useRef(null);
  const { toast } = useToast();
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
  // const [isImageUploadBtnDisabled, setIsImageUploadBtnDisabled] =
  //   useState(false);
  const uploadImageToCloudinary = async () => {
    if (!imageFile) {
      toast({
        title: "Image File Not Found",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const data = new FormData();
    data.append("my_file", imageFile);
    setImageLoadingState(true);
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/product/upload-product-image`,
      data
    );
    console.log("response", response);
    setImageLoadingState(false);
    if (response) {
      setUploadedImageUrl(response.data.data.secure_url);
      // setIsImageUploadBtnDisabled(true);
      toast({
        title: "Image Upload Success",
        description: "Image uploaded successfully",
        variant: "default",
      });
    } else {
      toast({
        title: "Image Upload Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // useEffect(()=>{
  //   if(imageFile!==null){
  //     uploadImageToCloudinary();
  //   }
  // },[imageFile])
  return (
    <div className=" w-full max-w-md mx-auto mt-4">
      <Label className=" text-lg font-semibold mb-2 block"> Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg  p-4 ${isEditMode?" opacity-60":""}`}
      >
        <Input
          id="image-upload"
          type="file"
          className=" hidden"
          ref={inputRef}
          onChange={imageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${isEditMode?"cursor-not-allowed":""}`}
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
      <Button
        onClick={uploadImageToCloudinary}
        className={`${uploadedImageUrl!==null ? "hidden" : ""} ${isEditMode?"opacity-60":""} mt-4`}
        disabled={imageLoadingState||isEditMode}
       
      >
        {imageLoadingState ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
};

export default ProductImageUpload;
