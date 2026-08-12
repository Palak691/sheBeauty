import React from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import { Home } from '../pages/Home'
import { DashboardLayout } from '../layouts/AuthDashboardLayout/DashboardLayout'
import { Skincare } from '../pages/skinCare/Skincare'
import { Tools } from '../pages/tools/Tools'
import { Haircare } from '../pages/hairCare/Haircare'
import { ExploreAll } from '../components/exploreAll/ExploreAll'
import { Signup } from '../pages/signup/Signup'
import { Login } from '../pages/login/Login'
import { ProductListing } from '../pages/productListings/ProductListing'
import { Makeup } from '../pages/makeup/Makeup'
import { ProductDetails } from '../pages/productDetails/ProductDetails'
import { Wishlist } from '../pages/wishlist/Wishlist'
import { Cart } from '../pages/cart/Cart'
import { EditProfile } from '../pages/editProfile/Editprofile'
import { Profile } from '../pages/profile/Profile'
import Contact from '../pages/contact/Contact'
import { Checkout } from '../pages/checkout/Checkout'
import { ProtectedRoute } from '../components/protectedRoute/ProtectedRoute'
import { FreeGifts } from '../pages/freeGifts/FreeGifts'
import { Bestsellers } from '../pages/allBestsellers/Bestsellers'
import { OrderSuccess } from '../pages/orderSuccess/OrderSuccess'
import { MyOrders } from '../pages/myOrders/MyOrders'
import { AdminDashboard } from '../pages/admin/dashboard/AdminDashboard'
import { AdminLayout } from '../layouts/AdminLayout/AdminLayout'
import { AdminProtectedRoute } from '../components/adminProtectedRoute/AdminProtectedRoute'
import { EditProducts } from '../pages/admin/editProducts/EditProducts'
import { Orders } from '../pages/admin/orders/Orders'
import { Users } from '../pages/admin/users/Users'
import { AllProducts } from '../pages/admin/allProducts/AllProducts'
import { AddProducts } from '../pages/admin/addProducts/AddProducts'
import { EditOrder } from '../pages/admin/editOrders/EditOrder'
import { ViewUser } from '../pages/admin/viewUser/ViewUser'
import { OrderHistory } from '../pages/orderHistory/OrderHistory'




const router = createBrowserRouter([
    {
        element : <DashboardLayout/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/allproducts',
                element : <ProductListing/>
            },
            {
                path : '/skincare',
                element : <Skincare/>
            },
            {
                path : '/tools',
                element : <Tools/>

            },
            {
                path : '/haircare',
                element : <Haircare/>
            },
            {
                path : '/makeup',
                element : <Makeup/>
            },
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : "/signup",
                element : <Signup/>
            },
            {
                path : '/product/:slug',
                element : <ProductDetails/>
            },
            
            
            {
                path : '/wishlist',
                element :
                <ProtectedRoute>
                    <Wishlist/>
                </ProtectedRoute>
            },
            {
                path : '/edit_profile',
                
                element :
                <ProtectedRoute>
                    <EditProfile/>
                </ProtectedRoute> 
            },
            {
                path : '/cart',
                element :
                <ProtectedRoute>
                    <Cart/>
                </ProtectedRoute>
            },
            {
                path : '/profile',
                element :
                <ProtectedRoute>
                    <Profile/>
                </ProtectedRoute>
            },
            {
                path : '/contact',
                element : <Contact/>
            },
            {
                path : '/checkout',
                element : 
                <ProtectedRoute>
                    <Checkout/>
                </ProtectedRoute>
            },
            {
                path : '/freeGift',
                element : <FreeGifts/>
            },
            {
                path : '/allbestsellers',
                element : <Bestsellers/>
            },
            {
              path : '/OrderSuccess',
              element : 
               <ProtectedRoute>
                <OrderSuccess/>
                </ProtectedRoute>
            },
            {
                path : '/myOrders',
                element : 
                <ProtectedRoute>
                 <MyOrders/>
                </ProtectedRoute>
            },
               {
                path : '/orderHistory',
                element : 
                <ProtectedRoute>
                    <OrderHistory/>
                </ProtectedRoute>
            },
           
        ]
    },
    {
        path : '/admin',
        element :(
        <AdminProtectedRoute>
        <AdminLayout/>
         </AdminProtectedRoute>
    ),
        children : [
            {
                index :  true,
                element : <AdminDashboard/>
            },
            {
                path : 'products',
                element : <AllProducts/>
            },
            {
                path : 'products/new',
                element : <AddProducts/>
            },
            {
                path : 'products/:id/edit',
                element : <EditProducts/>
            },
            {
                path : 'orders',
                element : <Orders/>
            },
            {
               path : 'orders/:id/edit',
               element : <EditOrder/> 
            },
            {
                path : 'users',
                element : <Users/>
            },
            {
             path : 'users/:id',
             element : <ViewUser/>
            }
        ]
    }

])


export const AppRoute = () => {
    
  return (
    <RouterProvider router={router}/>
  )
}
