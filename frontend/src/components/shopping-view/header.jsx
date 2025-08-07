import { Sheet, SheetContent } from '@/components/ui/sheet';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';
import { DropdownMenu } from "../ui/dropdown-menu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { FaRegUser } from "react-icons/fa";
import { FaUser } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';

const ShoppingHeader = () => {

    const {isAuthenticated, user} = useSelector(state=> state.auth)
    console.log("user", user );
    const navigate = useNavigate();
    
    const MenuItems = ()=>{
        return <nav className=' flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
            {
                shoppingViewHeaderMenuItems.map((item,index)=>(
                    <Link key={index} to={item.path} className=' text-sm font-medium'>{item.label}</Link>
                ))
            }
        </nav>
    }

    const HeaderRightContent = () => {
        const {user} = useSelector(state=> state.auth)
        return (
          <div className=" flex lg:items-center lg:flex-row flex-col gap-4">
            <Button variant="outline" >
              <MdOutlineShoppingCart size={24} />
              <span className="  sr-only">User Cart</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className=' bg-black '>
                        <AvatarFallback className=' bg-black text-white font-extrabold'>{user.name.toUpperCase().charAt(0)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' className=' w-56 '>
                    <DropdownMenuLabel>Logged in as {user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => navigate('/shop/account')} className=' flex items-center '>
                        <FaUser size={24} className=' mr-2  h-2 w-4'/>
                        <span className=' ml-2 '>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                     <DropdownMenuItem onClick={() => navigate('/auth/logout')} className=' flex items-center '>
                        <FiLogOut size={24} className=' mr-2  h-2 w-4'/>
                        <span className=' ml-2 '>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      };
    return (
        <header className=' sticky top-0 z-40 w-full border-b bg-background'>
            <div className=' flex h-16 items-center justify-between px-4 md:px-6'>
                <Link to={'/shop/home'} className=' flex items-center gap-2 '>
                <FaHome size={24} className=' h-6 w-6' />
                <span className=' font-bold '>Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon' className=' md:hidden '>
                            <GiHamburgerMenu size={24} />
                            <span className=' sr-only'>Toggle Header Menu </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className=' w-full max-w-xs  '>
                        <MenuItems/>
                    </SheetContent>
                </Sheet>
                <div className=' hidden lg:block '>
                    <MenuItems/>
                </div>
                {
                    isAuthenticated && (
                        <div className=' hidden lg:block'>
                            <HeaderRightContent/>
                        </div>
                    )
                }
            </div>
        </header>
    );
}

export default ShoppingHeader;
