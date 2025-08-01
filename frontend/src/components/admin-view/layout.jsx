import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from './sidebar';
import { useSelector } from 'react-redux';
import CardSkeleton from '../common/CardSkeleton';
import AdminHeader from './header';

const AdminLayout = () => {
    const [openSidebar , setOpenSidebar] = useState(false);
    return (
        <div className=' flex min-h-screen w-full '>
            {/*  admin side bar */}
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
            <div className='  flex flex-1 flex-col'>
                {/* admin header */}
                <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />
                <main className=' flex flex-1 bg-muted/100 p-4 md:p-6'>
                    <Outlet/>
                </main>
            </div>
            
        </div>
    );
}

export default AdminLayout;
