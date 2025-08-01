import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/auth-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
    username: '',
    name: '',
    email: '',
    password: '',
}

const AuthRegister = () => {
    const [fromData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(fromData);
        dispatch(registerUser(fromData)).then((res)=>{
            console.log(res);
            if(res.payload.success){
                toast({
                    title: "Success",
                    description: res.payload.message,
                    variant: 'success'

                })
                navigate('/auth/login');
            }else{
                toast({
                    title: "Error",
                    description: res.payload.message,
                    variant: 'destructive'
                })
            }
            
            
            // navigate('/auth/login');
        })

    }
    console.log(fromData);
    
    return (
        <div className=' mx-auto w-full max-w-md space-y-6'>
           <div className=' text-center'>
            <h1 className=' text-3xl font-bold tracking-tight text-foreground '>Create an account</h1>
            <p className=' mt-2 '>Already have an account?
                <Link to='/auth/login' className=' text-primary font-medium ml-2 hover:underline text-red-500 '>Login</Link>
            </p>
           </div>
           <CommonForm formControls={registerFormControls}
           buttonText={'Sign Up'}
           formData={fromData}
           setFormData={setFormData}
           onSubmit={onSubmit}
          />
        </div>
    );
}

export default AuthRegister;
