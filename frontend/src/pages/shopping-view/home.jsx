import React, { use, useEffect, useState } from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchedFilteredProducts,
  fetchedProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import {
  SiNike,
  SiPuma,
  SiAdidas,
  SiZara,
  SiLevelsdotfyi,
  SiHandm,
} from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
const ShopHome = () => {
  const { productsList } = useSelector((state) => state.shoppingProduct);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandWithIcon = [
    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "levi", label: "Levi's", icon: SiLevelsdotfyi },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "h&m", label: "H&M", icon: SiHandm },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth)
  const {productDetails} = useSelector(state => state.shoppingProduct)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const handleNavigateToListingPage = (category, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [category.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  function handleGetProductDetails(getCurrentProductID) {
    console.log("getCurrentProductID", getCurrentProductID);
    dispatch(fetchedProductDetails(getCurrentProductID)).then((res) => {
      console.log("res", res);
      if (res.payload.success) {
        toast({
          title: "Product Details Fetched",
          description: "Product details fetched successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Error to fetch Product Details",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    });
  }

  
    const handleAddToCart = (getCurrentProductID) => {
      console.log("getCurrentProductID", getCurrentProductID);
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
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    dispatch(
      fetchedFilteredProducts({
        filterParams: {},
        sortParams: { sortBy: "price-lowtohigh" },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className=" flex flex-col min-h-screen ">
      <div className=" relative w-full overflow-hidden h-[600px]">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="banner image"
            className={`  ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }  absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          variant="outline"
          size="icon"
          className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80`}
        >
          <ChevronLeftIcon className=" w-6 h-6" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          variant="outline"
          size="icon"
          className={` absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80`}
        >
          <ChevronRightIcon className=" w-6 h-6" />
        </Button>
      </div>
      <section className=" py-12 bg-gray-50">
        <div className=" container mx-auto px-4">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((category) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
                className=" cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className=" flex flex-col items-center justify-center p-6">
                  <category.icon className=" w-12 h-12 mb-4 text-primary" />
                  <span className=" font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className=" py-12 bg-gray-50">
        <div className=" container mx-auto px-4">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((category) => (
              <Card
                onClick={() => handleNavigateToListingPage(category, "brand")}
                className=" cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className=" flex flex-col items-center justify-center p-6">
                  <category.icon className=" w-12 h-12 mb-4 text-primary" />
                  <span className=" font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className=" py-12 ">
        <div className=" container mx-auto px-4">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsList.map((productItem) => (
              <ShoppingProductTile product={productItem} handleGetProductDetails={()=>handleGetProductDetails(productItem._id)} handleAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetail={productDetails}
      />
    </div>
  );
};

export default ShopHome;
