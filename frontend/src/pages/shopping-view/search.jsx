import ProductDetailsDialog from '@/components/shopping-view/product-details';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { addToCart, fetchCartItem } from '@/store/shop/cart-slice';
import { fetchedProductDetails } from '@/store/shop/products-slice';
import { resetSearchResult, searchActions } from '@/store/shop/search-slice';
import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const ShoppingSearch = () => {
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const {productDetails} = useSelector((state) => state.shoppingProduct);
    const {searchResult} = useSelector((state) => state.shoppingSearch);
    const {cartItems} = useSelector((state) => state.shoppingCart);
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


    
      const  handleGetProductDetails = (getCurrentProductID)=> {
        console.log("getCurrentProductID", getCurrentProductID);
        dispatch(fetchedProductDetails(getCurrentProductID)).then((res) => {
          console.log("res", res);
          if (res.payload.success) {
            setOpenDetailsDialog(true);
            // toast({
            //   title: "Product Details Fetched",
            //   description: "Product details fetched successfully",
            //   variant: "default",
            // });
          } else {
            toast({
              title: "Error to fetch Product Details",
              description: "Something went wrong",
              variant: "destructive",
            });
          }
        });
    
        // console.log("productDetails", productDetails);
      }
    
      const handleAddToCart = (getCurrentProductID, totalStock) => {
        console.log("getCurrentProductID", getCurrentProductID);
        console.log("cartItems", cartItems);
        let getCartItems = cartItems.items || [];
    
        if (getCartItems.length) {
          const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductID
          );
    
          if (indexOfCurrentItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if (getQuantity + 1 > totalStock) {
              return toast({
                title: "Product is out of stock",
                description: `only you can buy ${totalStock} of this product`,
                variant: "destructive",
              });
            }
          }
        }
    
        dispatch(
          addToCart({
            userId: user?.id,
            productId: getCurrentProductID,
            quantity: 1,
          })
        ).then((res) => {
          console.log("res", res);
          if (res.payload.success) {
            toast({
              title: "Product added to cart",
              description: "Product added to cart successfully",
              variant: "default",
            });
            dispatch(fetchCartItem({ userId: user?.id }));
          } else {
            toast({
              title: "Error to add Product to cart",
              description: "Something went wrong",
              variant: "destructive",
            });
          }
        });
      };
    

    useEffect(() => {
        if(keyword && keyword.trim() !== '' && keyword.length>3) {
            console.log("keyword", keyword);
            setTimeout(()=>{
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(searchActions(keyword));
            },1000)
        }else{

            console.log("reset introduced ");
            
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResult());
        }
    },[keyword])

    console.log("searchResult", searchResult);

    
    return (
        <div className=' container mx-auto md:px-6 px-4 py-8'>
            <div className=' flex justify-center mb-8'>
                <div className=' w-full flex items-center'>
                    <Input value={keyword} name='keyword' onChange={(e) => setKeyword(e.target.value)} type='text' placeholder='Search Products.........' className=' w-full  py-6' />
                    
                </div>
            </div>
            {
                !searchResult.length? <h1 className=' text-5xl font-extrabold text-center'>No Result Found</h1>:null
            }
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchResult && searchResult.length>0&&searchResult.map((item)=>(
                        <ShoppingProductTile product={item} key={item._id} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />
                    ))
                }
                
            </div>

             <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetail={productDetails}
      />
           
        </div>
    );
}

export default ShoppingSearch;
