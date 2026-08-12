import React, { useEffect } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../config/redux/action/cartAction';
import { CartItems } from '../../components/cartItems/CartItems';
import { QuantitySelector } from '../../components/quantitySelector/QuantitySelector';
import { OrderSummary } from '../../components/orderSummary/OrderSummary';

export const Cart = () => {
  const {cart, message, isLoading} = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
 const { token } = useSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(getCart(token));
  },[dispatch,token]);
  const subtotal =
  cart?.items?.reduce((total, item) => {
    const { price, discountPercentage } = item.product;

    const finalPrice = discountPercentage > 0  ? Math.round(price - (price * discountPercentage) / 100): price;

      return total + finalPrice * item.quantity;

  }, 0) || 0;
  
  const shipping = subtotal > 999 ? 0 : 49;
  const total = shipping + subtotal;

  if (isLoading) {
  return <h2 className="loading">Loading...</h2>;
   }

 if (!cart?.items?.length) {//check empty Cart
  return (
    <div className="emptyCart">
      <p>Your cart is empty  
        <span className='spanIcon'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
   </svg>
          </span>  </p>
      <p>Add some products to continue shopping.</p>
    </div>
  );
}
  return (
    <div className='cart'>
      <div className="cartLeft">
      {cart?.items?.map((item)=>
      <CartItems item={item} key={item.product._id}/>)}
      </div>
      <div className="cartRight">
      <OrderSummary subtotal={subtotal} shipping={shipping} total={total}/>
      </div>
    </div>
  )
}
