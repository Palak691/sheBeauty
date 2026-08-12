import React from 'react'
import './OrderSummary.css'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/extras/img.avif'
import { useSelector } from 'react-redux'

export const OrderSummary = ({subtotal,shipping,total}) => {
   const nav = useNavigate();
   const {cart} = useSelector((state)=>state.cart);

  return (
   <>
   {cart?.items?.length &&  
    <div className='cartSummary'>
      <div className='cartWomen'>
      <img src={img} alt="women_img" />
      </div>
     <h2>Cart Summary</h2>
     <div>
        <span>Subtotal</span>
        <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
     </div>
     <div>
        <span>Shipping</span>
        <span>&#8377;{shipping === 0 ? "Free" : ` ${shipping.toLocaleString('en-IN')}`}</span>
     </div>
     <hr />
     <div>
        <strong>Total</strong>
        <strong>&#8377;{total.toLocaleString('en-IN')}</strong>
     </div>
     <button onClick={()=>nav('/checkout')}>Proceed To Checkout</button>
    </div>
    
   }
  </>
  )
}
