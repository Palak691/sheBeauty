import React, { useEffect } from 'react'
import './ReviewSection.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReview } from '../../config/redux/action/reviewAction'
import { FaStar } from 'react-icons/fa'

export const ReviewSection = () => {
  const {allReview, isLoading} = useSelector((state)=>state.review);
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getAllReview());
  },[dispatch]);
  if (isLoading) {
    return <h2>Loading reviews...</h2>;
}
if (!allReview.length) {
    return (
        <div className="customerReviews">
            <h2>No reviews yet.</h2>
        </div>
    );
}
  return (
    <div className='reviewContainer'>
     <div className='reviewSummary'>
<h2>Sample AI Reviews</h2>

<h3>⭐ 4.7 out of 5</h3>

<p>
  Based on 15 verified reviews. Customers love the lightweight formula,
  quick absorption, and visible improvements in skin texture and brightness.
  Most users noticed healthier-looking skin within a few weeks of regular use.
</p>{/* AI SUMMARY */}
     </div>
    <AllReviews/>
     <div className='customerReviews'>
       <h2>Customer Reviews ({allReview.length})</h2>
  {allReview.map((review)=>{
    return(
   
   <div key={review._id} className="reviewCard">
  <div className="userInfo">
    <div>
      <h4>{review.userId?.name}</h4>
      <span>{review.userId?.email}</span>
    <div className="ratingStars">
      <p>{review.rating}⭐</p>
     
    </div>
    </div>

  </div>

  <p className="reviewComment">
    {review.comment}
  </p>
</div>
   
    )
  })}
     </div>
    </div>
  )
}
