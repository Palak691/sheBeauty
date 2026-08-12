import React from 'react'
import womenImg from '../../assets/images/women3.avif'
import './ExploreAll.css'
import { useNavigate } from 'react-router-dom'
//avif
export const ExploreAll = () => {
    const navigate = useNavigate();
  return (
        <div className='exploreContainer'>

      <div className='womenImage'>
        <div className='imageRing' >
          <img src={womenImg} alt="womenImage" onClick={()=>navigate('/allproducts')}/>
        </div>
      </div>
      <div className='exploreBtn' onClick={()=>navigate('/allproducts')} >
        <button>Explore All Products</button>
      </div>

    </div>
  )
}
