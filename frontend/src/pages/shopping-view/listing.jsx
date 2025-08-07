import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { fetchedFilteredProducts, fetchedProductDetails } from "@/store/shop/products-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LucideArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

const ShopListing = () => {
  const { productsList, productDetails } = useSelector((state) => state.shoppingProduct);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {toast} = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const handleSort = (value) => {
    console.log("value", value);
  };
  const handleFilter = (getSectionId, getCurrentOption) => {
    console.log("filters", filters);

    console.log("getSectionId", getSectionId);
    console.log("getCurrentOption", getCurrentOption);
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = { ...copyFilters, [getSectionId]: [getCurrentOption] };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    console.log("copyFilters", copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const createSearchParamsHelper = (filtersParams) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filtersParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${paramValue}`);
      }
    }
    return queryParams.join("&");
  };

  function handleGetProductDetails(getCurrentProductID){
    console.log("getCurrentProductID", getCurrentProductID);
    dispatch(fetchedProductDetails(getCurrentProductID)).then((res)=>{
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
    })
    
    console.log("productDetails", productDetails);
  }

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryParams = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryParams));
    }
  }, [filters]);

  useEffect(() => {
    setSort(sortOptions[0].id);
    setFilters(JSON.parse(sessionStorage.getItem("filters")));
  }, []);
  console.log("filters", filters);
  console.log("searchParams", searchParams);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchedFilteredProducts({ filtersParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
      if(productDetails!==null){
        setOpenDetailsDialog(true);
      }
  },[productDetails]);
  console.log("productDetails", productDetails);
  
  console.log("productsList", productsList);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 ">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className=" bg-background w-full rounded-lg shadow-sm">
        <div className=" p-4  border-b flex items-center justify-between">
          <h2 className=" text-lg font-extrabold">All Products</h2>
          <div className=" flex items-center gap-3 ">
            <span className=" text-muted-foreground ">
              {productsList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className=" flex items-center gap-1"
                >
                  <LucideArrowUpDown size={24} />
                  <span>sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className=" w-auto mt-2 z-50 bg-background border border-gray-400 p-2 rounded-lg flex flex-col items-center justify-center "
              >
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSort}
                  className=" "
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem
                      key={item.value}
                      value={item.id}
                      className=""
                    >
                      <span>{item.label}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productsList &&
            productsList.length > 0 &&
            productsList.map((product) => (
              <ShoppingProductTile key={product.id} product={product} handleGetProductDetails={handleGetProductDetails} />
            ))}
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetail={productDetails} />
    </div>
  );
};

export default ShopListing;
