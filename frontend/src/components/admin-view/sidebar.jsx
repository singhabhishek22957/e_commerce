import { adminSidebarMenuItems } from '@/config';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React, { Fragment } from 'react';
import { FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const menuItems = (setOpen) =>{
    const navigate = useNavigate();
    return <nav className=' flex flex-col mt-8 gap-2'>
        {
            adminSidebarMenuItems.map((item)=>(
                <div key={item.label} onClick={()=> {
                    setOpen(false);
                    navigate(item.path);
                }} className=' flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-accent-foreground'>
                    < item.icon/>
                    <span>{item.label}</span>
                </div >
            ))
        }

    </nav>
}

const AdminSideBar = ({open , setOpen}) => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent  side='left' className=' bg-background w-52  '>
                    <div className=' flex flex-col h-full'>
                        <SheetHeader className=' border-b'>
                            
                            <SheetTitle className=' flex gap-2 items-center justify-center'>
                                <FaChartLine/>
                                <span>Admin Panel</span>
                                </SheetTitle>
                        </SheetHeader>
                        {menuItems(setOpen)}
                    </div>
                </SheetContent>
            </Sheet>
            <aside className=' hidden w-64 flex-col border-r bg-background p-6 lg:flex' >
                <div className=' flex cursor-pointer items-center gap-2' onClick={()=>{
                navigate('/admin/dashboard');
                
            }}>
                    <FaChartLine/>
                    <h1 className=' text-xl font-extrabold '>  Admin Panel</h1>
                </div>
                {menuItems()}
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;
