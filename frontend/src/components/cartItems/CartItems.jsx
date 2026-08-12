import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { QuantitySelector } from '../quantitySelector/QuantitySelector'
import './CartItems.css'

export const CartItems = ({item}) => {
const { price, discountPercentage } = item.product;

const finalPrice = discountPercentage > 0 ? Math.round(price - (price * discountPercentage) / 100) : price;
  return (
    <div>
     <div className="cartItems" >
       <img src={item.product.images} alt={item.product.name} />
     <div className="cardInfo">
        {item.product.name}
       <p>&#8377;{finalPrice.toLocaleString('en-IN')}</p>
       <QuantitySelector item={item} />
     </div>
     </div>
    </div>
  )
}
