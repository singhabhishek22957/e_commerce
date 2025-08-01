import React, { useEffect } from 'react';
import { Button } from './components/ui/button';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProduct from './pages/admin-view/product';
import AdminOrders from './pages/admin-view/orders';
import ShoppingLayout from './components/shopping-view/layout';
import ShopHome from './pages/shopping-view/home';
import ShopAccount from './pages/shopping-view/account';
import ShopListing from './pages/shopping-view/listing';
import ShopCheckout from './pages/shopping-view/checkout';
import CheckAuth from './components/common/check-auth';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from './components/ui/skeleton';
import CardSkeleton from './components/common/CardSkeleton';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '@/store/auth-slice';
const App = () => {
  // const isAuthenticated = false;
  // const user = {
  //   role: 'user'
  // }
  const {isAuthenticated, user, isLoading} = useSelector(state=> state.auth)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading){
    return (
      <CardSkeleton/>
    )
  }
  
  return (
    <div className=' flex flex-col overflow-hidden bg-white '>
      {/*  common component */}
      <Routes>
        <Route path='*' element={ <Navigate to="/auth/login" replace /> } />
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
        <Route path='login' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLogin/>
          </CheckAuth>} />
        <Route path='register' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthRegister/>
          </CheckAuth>
        } />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        </Route>



        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
        <Route path='dashboard' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminDashboard/>
          </CheckAuth>
        } />
        <Route path='products' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminProduct/>
          </CheckAuth>
        } />
        <Route path='orders' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminOrders/>
          </CheckAuth>
        } />
        <Route path='*' element={<h1>404 Not Found</h1>} />
        </Route>


        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
        <Route path='*' element={<h1>404 Not Found</h1>} />
        <Route path='home' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopHome/>
          </CheckAuth>
        } />
        <Route path='account' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopAccount/>
          </CheckAuth>
        } />
        <Route path='listing' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopListing/>
          </CheckAuth>
        } />
        <Route path='checkout' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopCheckout/>
          </CheckAuth>
        } />
        </Route>

      </Routes>


    </div>
  );
}

export default App;
