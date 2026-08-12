import React, { useEffect, useState } from 'react'
import './Home.css'
import img1 from '../assets/images/heroImg.jpg'
import img2 from '../assets/images/img2.avif'
import img3 from '../assets/images/img3.jpg'
import img4 from '../assets/images/img4.avif'
import img5 from '../assets/images/img5.avif'
import img6 from '../assets/images/img6.avif'
import { Bestseller } from '../components/bestProducts/BestSeller'
import { ExploreAll } from '../components/exploreAll/ExploreAll'
import { Review } from '../components/reviews/Review'
import { Gallery } from '../components/gallery/Gallery'
import { getAllProducts } from '../config/redux/action/productAction'
import { useDispatch } from 'react-redux'

const slider = [img1, img2, img3, img4, img5, img6];

export const Home = () => {
  const [current, setCurrent] = useState(0);;
  useEffect(()=>{
    const id = setInterval(()=>{
      setCurrent((prev)=> (prev+1) % slider.length);
    },3000);
    return ()=> clearInterval(id);
  },[])
  


  return (
    <div>
      <div className='homeContainer'>
        <div className='heroImage'>
          <div className='sliderImage'>
          <img src={slider[current]} alt={`Slider ${current + 1}`} />
          </div>
        </div>
      </div>
      <Bestseller/>
         <ExploreAll/>
         <Gallery/>
         <Review/>

    </div>
  )
}
