import React, { useEffect, useState } from 'react'
import './Nav.css'
import mylogo from '../../../assets/images/logo2.jpeg'
import { NavLink, useNavigate, useNavigation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getAllProducts } from '../../../config/redux/action/productAction'
import { Navicons } from '../../icons/Navicons'
import { useLocation } from 'react-router-dom'

export const Nav = () => {
  const nav = useNavigate();
  const {currentUser} = useSelector((state)=>state.auth);
  const {allCategory} = useSelector((state)=>state.product);
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams , setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';//search bar functionality
// 'search' is the query parameter/field name you're looking for in the URL.
  const showSearch = location.pathname === '/allproducts' ||
   allCategory?.some((category) =>  location.pathname === `/${category.toLowerCase()}`);
  useEffect(()=>{
    const fetchAllCategories = async () => {
      await dispatch(getAllCategories())
    }
    fetchAllCategories();
    
  },[dispatch]);


  
  
  return (
    <div className='navContainer'>
     <div className="navTop">
    <div className='navLogo' style={{width : "100%"}}>
    <NavLink to={'/'}>
      <img src={mylogo} alt="logo_img" /> 
      <span className="brandName">sheBeauty</span>
    </NavLink>
    <div className="navBottom">
      <Navicons/>
     </div>
    </div>
        {showSearch && <div className="searchBox">
        <svg className="searchIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
       <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
       </svg>

        <input type="text" placeholder="Search for products, brands and more" value={search}
         onChange={(e)=>{
          const value = e.target.value;

          setSearchParams((prev)=>{
            const params = new URLSearchParams(prev)
             if(value){
              params.set('search', value);
             }else{
              params.delete('search');//dont let ?search= sitting there when empty
             }
             return params;
            });

         }} />
      </div>
      }
    <div className="navbars">
       
        {allCategory?.map((category ,i)=>{
           return (
            <NavLink key={category}  to={`/${category.toLowerCase()}`}>
              {category.toUpperCase()}
            </NavLink>
           )
        })}
        {
        (currentUser && currentUser.role === "admin") ? 
          <NavLink to={'/admin'} style={{color :"green"}}>ADMIN</NavLink>
          : null
          }
        

      
      </div>
</div>
     
    </div>
  )
}
