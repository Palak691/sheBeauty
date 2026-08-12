import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllBestSellers } from '../../config/redux/action/productAction';
import { ProductCard } from '../../components/productCard/ProductCard';
import bestseller from '../../assets/extras/bestseller.jpg'
import img from '../../assets/extras/hat2.avif'
import img2 from '../../assets/bestseller/img2.jpg'
import img4 from '../../assets/extras/hat4.webp'
import img3 from '../../assets/bestseller/img3.avif'
import img5 from '../../assets/bestseller/img.jpg'
import './Bestsellers.css'

export const Bestsellers = () => {
    const {allBestsellers} = useSelector((state)=>state.product);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBestSellers());
    },[dispatch])
  return (
    <>
    <div className="bestsellers">
           <div className="giftHero">
        
            <div className="giftBanner">
                <img src={img} alt="Free Gifts" />
            </div>
             <div className="giftBanner">
                <img src={img2} alt="Free Gifts" />
            </div>
             <div className="giftBanner">
                <img src={img4} alt="Free Gifts" />
            </div>
             <div className="giftBanner">
                <img src={img3} alt="Free Gifts" />
            </div>
            <div className="giftBanner">
                <img src={img5} alt="Free Gifts" />
            </div>
        
        </div>
        <div className="bestsellerImg">
            </div>
        <p className='bestSeller'>
        Our Best Sellers💖
        </p>
    </div>
    <div  className="bestsellersContainer">
      {allBestsellers.length > 0 ? (
        <div className="bestsellersGrid">
          {allBestsellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="noProducts">
          No best sellers available.
        </div>
      )}
    </div>
    </>
  )
}
