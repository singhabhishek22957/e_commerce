import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useState } from 'react';
import ProductImageUpload from '../../components/admin-view/image-upload';

const initialState = {
    Image:null,
    title: '',
    description: '',
    category: '',
    price: '',
    brand: '',
    sellPrice: '',
    totalStock: '',
};
const AdminProduct = () => {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData , setFormData] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const [imageFile , setImageFile] = useState(null);
    const [uploadedImage , setUploadedImage] = useState(null);

    return (
        <Fragment>
            <div className=' w-full mb-5 flex justify-end'>
                <Button onClick={() => setOpenCreateProductsDialog(true)}>Add new Product</Button>
            </div>
            <div className=' grid gap-4 md:grid-cols-3 lg:grid-cols-4 '>

            </div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => setOpenCreateProductsDialog(false)}>
                <SheetContent side='right' className=' overflow-auto  '>
                    
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImage} setUploadedImageUrl={setUploadedImage}/>
                    <div className=' py-6 '>
                        <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText='Add Product'/>
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProduct;
