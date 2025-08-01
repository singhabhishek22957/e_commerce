import React from 'react';
import { Button } from '../ui/button';
import { FiLogOut ,FiMenu} from 'react-icons/fi';

const AdminHeader = ({open , setOpen}) => {
    return (
        <header className='flex items-center justify-between px-2 py-2  '>
            <Button onClick={() => setOpen(!open)} className=' lg:hidden sm:block bg-white text-black hover:text-white hover:bg-blue-500' 
                >
                <FiMenu size={24}/>
            </Button>
            <div className=' flex flex-1 justify-end '>
                <Button className=' inline-flex gap-2 items-center bg-white text-black rounded-sm px-4 text-sm hover:text-white hover:bg-blue-500 shadow-sm'><FiLogOut/> Logout</Button>
            </div>
        </header>
    );
}

export default AdminHeader;
