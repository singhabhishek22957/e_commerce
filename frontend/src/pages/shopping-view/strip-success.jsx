import { fetchCartItem } from '@/store/shop/cart-slice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const StripSuccess = () => {
    const {user} = useSelector((state) => state.auth);
     const dispatch = useDispatch();
    useEffect(()=>{
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const sessionId = params.get('session_id');
        console.log(sessionId);


        if(sessionId){
            // localStorage.setItem('sessionId',sessionId);
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/order/stripe-session/${sessionId}`).then((response)=>{
                console.log(response);

                if(response.data.orderData.paymentStatus === "paid"){
                    dispatch(fetchCartItem(user._id));
                }
            })

        }
        
    },[])
  
    
    return (
        <div>
            <h1>Stripe Success</h1>
        </div>
    );
}


export default StripSuccess;
