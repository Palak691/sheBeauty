import React from 'react'
import { Footer } from '../../components/layout/footer/Footer'
import { Outlet } from 'react-router-dom'
import { Nav } from '../../components/layout/navbar/Nav'
import ScrollToTop from '../../components/layout/scrollToTop/ScrollToTop'
import './DashboardLayout.css'

export const DashboardLayout = () => {
  
  return (
    <div>
        <ScrollToTop/>
        <p className="shippingBanner">
          
        FREE SHIPPING ON ORDERS ABOVE ₹999&nbsp;
        <span><svg
  xmlns="http://www.w3.org/2000/svg" className='cartIcon' viewBox="0 0 24 24"
  fill="none" stroke="currentColor"strokeWidth="1.8"strokeLinecap="round"
 strokeLinejoin="round"> <path d="M2 6h4" /> <path d="M1 10h6" /> <path d="M3 14h3" /> <path d="M7 5h2l2 9h8l2-6h-9" />
  <circle cx="12" cy="19" r="1.4" /><circle cx="19" cy="19" r="1.4" />
</svg>
  </span>
        </p>
          <Nav/>
          <Outlet/>
          <Footer/>
    </div>
  )
}
