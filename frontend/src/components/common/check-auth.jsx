import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({isAuthenticated , user, children }) => {
    const location = useLocation();
    
    if(!isAuthenticated && !(location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))){
        return <Navigate to="/auth/login" />

    }

    if(isAuthenticated && (location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))){
        if(user?.role === 'admin'){
            return <Navigate to="/admin/dashboard" />
        }else{
            return <Navigate to="/shop/home" />
        }
    }

    if(isAuthenticated && user?.role === 'user' && location.pathname.includes('/admin')){
        return <Navigate to="/shop/home" />
    }

    return (
        <>
            {children}
        </>
    );
}

export default CheckAuth;
