import React, { useEffect } from 'react'
import img from '../../assets/women/img8.avif'
import img2 from '../../assets/women/img3.avif'
import img3 from '../../assets/women/img6.avif'
import img4 from '../../assets/women/img7.avif'
import img5 from '../../assets/women/img5.avif'
import img6 from '../../assets/women/img4.avif'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getProductsBySlugs } from '../../config/redux/action/productAction'
import './Gallery.css'
import { NavLink } from 'react-router-dom'


const gallery = [
  {
    img : img,
    slug : 'mamaearth-highlighter-43828'
  },
  {
    img : img2,
    slug : 'mascara-black'
  },
  {
    img : img3,
    slug : 'mamaearth-highlighter-66351'
  },
  {
    img : img4,
    slug : 'radiant-hair-oil-83794'
  },
  {
    img :img5,
    slug : 'luxe-toner-25041'
  },
  {
    img : img6,
    slug : 'rhode-foundation-83137'
  }
]

export const Gallery = () => {
  const {galleryProducts = []} = useSelector((state)=>state.product);
   const dispatch = useDispatch();

  useEffect(() => {
    const slugs = gallery.map(item => item.slug);
    dispatch(getProductsBySlugs(slugs));
  }, [dispatch])
  

  
  return (
  <div className="imgGallery">
  
      {gallery.map((item) => {
        const prod = galleryProducts.find(
          (p) => p.slug?.trim() === item.slug.trim()
        );

        return (
           <NavLink key={item.slug} to={`/product/${item.slug}`} className="card">
          <div key={item.slug} className="card">
            <img src={item.img} alt={item.slug} className="womanImg"  />
            {prod?.images && (
              <img
                src={prod.images}
                alt={prod.name}
                className="productImg"
              />
            )}
          </div>
          </NavLink>
        );
      })}
    
     </div>
    
  )
}
