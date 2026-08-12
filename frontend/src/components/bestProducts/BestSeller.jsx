import React, { useState } from 'react'
import './BestSeller.css'
import img1 from '../../assets/products/oil.avif'
import img2 from '../../assets/products/lipstick.avif'
import img3 from '../../assets/products/brushes.avif'
import img4 from '../../assets/products/serum.avif'
import img5 from '../../assets/products/tint.webp'
import { ProductCard } from '../productCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBestseller } from '../../config/redux/action/productAction'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


export const Bestseller = () => {
  const {isBestseller} = useSelector((state)=>state.product);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(()=>{
    dispatch(getBestseller())
  },[dispatch]);

  return (
    <div className='productsContainer'>
        <p className='bestseller'>
            BestSellers
        </p>
        <button className='shopNow' onClick={()=>{
          nav('/allbestsellers')
        }}>SHOP NOW</button>

         <div className="products desktopProducts"  >
            {isBestseller.map((bestseller)=>
            <ProductCard key={bestseller._id} product={bestseller}/> )}
        </div>

      <Swiper className='mobileSwiper' modules={[Navigation]} navigation spaceBetween={20} slidesPerView={2} breakpoints={{
      
    0: { slidesPerView: 1.1 },
    480: { slidesPerView: 1.5 },
    768: { slidesPerView: 2.5 },
  }}>
        <div className="products">
            {isBestseller.map((bestseller)=>
            <SwiperSlide key={bestseller._id}>
            <ProductCard key={bestseller._id} product={bestseller}/>
            </SwiperSlide>
                )}
        </div>
        </Swiper>
    </div>
  )
}
