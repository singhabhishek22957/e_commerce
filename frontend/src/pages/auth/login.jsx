import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
}

const AuthLogin = () => {
    const [fromData, setFormData] = useState({});
    const dispatch = useDispatch();
    const {toast} = useToast();
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(fromData);
        console.log("Done2");
        console.log("dispatch", dispatch);
        
        dispatch(loginUser(fromData)).then((res)=>{
            console.log("Done1");
            console.log(res);
            if(res.payload.success){
                toast({
                    title: "Success",
                    description: res.payload.message
                })
                toast({
                    title: "Login Success",
                    description: "Welcome back! "+res.payload.data.name,
                })
                
            }else{
                toast({
                    title: "Error",
                    description: res.payload.message,
                    variant: 'destructive'
                })
            }
            console.log("Done");
            
        })
        console.log("Done");
        


    }

    console.log(fromData);
    
    return (
        <div className=' mx-auto w-full max-w-md space-y-6'>
           <div className=' text-center'>
            <h1 className=' text-3xl font-bold tracking-tight text-foreground '>Sign in your account</h1>
            <p className=' mt-2 '>Create a new account!
                <Link to='/auth/register' className=' text-primary font-medium ml-2 hover:underline text-red-500 '>Register</Link>
            </p>
           </div>
           <CommonForm formControls={loginFormControls}
           buttonText={'Login'}
           formData={fromData}
           setFormData={setFormData}
           onSubmit={onSubmit}
          />
        </div>
    );
}

export default AuthLogin;
