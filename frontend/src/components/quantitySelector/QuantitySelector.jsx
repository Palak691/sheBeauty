import React, { useEffect } from 'react'
import './QuantitySelector.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, updateCart } from '../../config/redux/action/cartAction';

export const QuantitySelector = ({item}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {cart, message, isLoading} = useSelector((state)=>state.cart);

  return (
    <div className='quantitySelector'>
        <button onClick={()=>{
        dispatch(updateCart({
            productId : item.product._id,
            quantity : item.quantity - 1,
            token
        }))
        }}>-</button>
        <span>{item.quantity}</span>
        <button onClick={()=>{
            dispatch(updateCart({
            productId : item.product._id,
            quantity : item.quantity + 1,
            token
        }))
        }}>+</button>
        <button className='removeBtn' onClick={()=>{
            dispatch(removeCart({
                productId : item.product._id,
                token
            }))
        }}>
          Remove
        </button>
    </div>
  )
}
