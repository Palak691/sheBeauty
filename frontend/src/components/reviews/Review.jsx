import React from 'react'
import womenImg  from '../../assets/images/women.avif'
import './Review.css'

export const Review = () => {
  return (
    <div className='reviewContainer'>
        <div className='stories'>
        <p>Real Stories. Real Confidencet.</p>
        <span>Every review reflects a genuine experience, a favorite product, and a confidence boost.</span>
        </div>
        <div className='reviews'>
        <div className='reviewImg'>
          <img src={womenImg} alt="womenImg" />
        </div>
       <div>
        <div className="reviewRight">

    <h2>Because every shade</h2>

    <div className="reviewCard">
        ⭐⭐⭐⭐⭐
        <p>Highly recommend for everyday use</p>
    </div>

    <h2>tells a story,</h2>

    <div className="reviewCard">
        ⭐⭐⭐⭐⭐
        <p>One of the best beauty products I've tried this year!</p>
    </div>

    <h2>and every woman</h2>

    <div className="reviewCard">
        ⭐⭐⭐⭐⭐
        <p>"Great quality and beautiful packaging.</p>
    </div>

    <h2>paints her own.</h2>

</div>
       </div>
       <div>

       </div>
       </div>
    </div>
  )
}
