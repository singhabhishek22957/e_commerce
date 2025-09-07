import { Sheet, SheetContent } from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu } from "../ui/dropdown-menu";
import { MdOutlineShoppingCart } from "react-icons/md";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItem } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { LogoutUser } from "@/store/auth-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchparams, setSearchParams] = useSearchParams();

  const handleNavigate=(menuItem) =>{

    sessionStorage.removeItem("filters");
    const currentFilter = menuItem.id ==='home'|| menuItem.id==='products' || menuItem.id==='search'?null:{category:[menuItem.id]}
  
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes('listing')&& currentFilter!==null?setSearchParams(new URLSearchParams(`?category=${menuItem.id}`)):
    navigate(menuItem.path);
  }
  return (
    <nav className="  flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item, index) => (
        <Label onClick={()=>handleNavigate(item)} key={index}  className=" cursor-pointer text-sm font-medium">
          {item.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleLogout = () => {
    dispatch(LogoutUser()).then((res) => {
      console.log(res);
      if (res.payload.success) {
         toast({
          title: "Logout Success",
          description: res.payload.message,
          variant: "default",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Error to logout",
          description: res.payload.message,
          variant: "destructive",
        });
      }
    });
  };
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItem({ userId: user?.id }));
    }
  }, [dispatch, user?.id]);

  console.log("cartItems", cartItems);
  return (
    <div className=" flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <SheetTrigger asChild>
          <Button variant=""
          className=' relative bg-gray-600'
          >
            <MdOutlineShoppingCart size={24} />
            <span className={`absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white ${cartItems?.items?.length === undefined||cartItems?.items?.length === 0 ? "hidden" : ""} `}>{cartItems?.items?.length || 0}</span>
            <span className="sr-only">User Cart</span>
          </Button>
        </SheetTrigger>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems.items || []} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black ">
            <AvatarFallback className=" bg-black text-white font-extrabold ">
              {user.name.toUpperCase().charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className=" w-auto mt-3 bg-gray-100 border-b border-gray-400 rounded-lg flex flex-col items-start p-3 mr-2 ">
          <DropdownMenuLabel className=" font-semibold">Logged in as {user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Separator />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className=" mt-1 w-full flex items-center bg-gray-200 rounded-sm p-1 cursor-pointer hover:bg-gray-300 hover:text-white "
          >
            <FaUser size={24} className=" mr-2  h-2 w-4" />
            <span className=" ">Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleLogout()}
            className=" mt-1 flex items-center w-full bg-gray-200 rounded-sm p-1 cursor-pointer hover:bg-gray-300 hover:text-white "
          >
            <FiLogOut size={24} className=" mr-2  h-2 w-4" />
            <span className="">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className=" sticky top-0 z-40 w-full border-b bg-background">
      <div className=" flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={"/shop/home"} className=" flex items-center gap-2 ">
          <FaHome size={24} className=" h-6 w-6" />
          <span className=" font-bold ">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className=" md:hidden ">
              <GiHamburgerMenu size={24} />
              <span className=" sr-only">Toggle Header Menu </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className=" w-full max-w-xs  ">
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className=" hidden lg:block ">
          <MenuItems />
        </div>
        {isAuthenticated && (
          <div className=" hidden lg:block">
            <HeaderRightContent />
          </div>
        )}
      </div>
    </header>
  );
};

export default ShoppingHeader;
