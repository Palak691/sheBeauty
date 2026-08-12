import React from 'react'
import './ProductCard.css'
import { NavLink } from 'react-router-dom'
export const ProductCard = ({product}) => {


  return (
    <NavLink to={`/product/${product.slug}`} className='productLink'>
    <div className='productCard'>
        <div className='imgCard'>
            <img src={product.images} alt="product_img" />
        </div>
        <p>{product.name}</p>
        <p> &#8377;{product.price}</p>
        
    </div>
</NavLink>
  )
}
