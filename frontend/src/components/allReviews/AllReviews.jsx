import React, { useEffect, useState } from 'react'
import './AllReviews.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview, editReview, getAllReview, getReviewByProductId } from '../../config/redux/action/reviewAction'
import { FaStar } from 'react-icons/fa'

export const AllReviews = ({productId}) => {
  const {user, token} = useSelector((state)=>state.auth)
  const {reviews, isLoading} = useSelector((state)=>state.review);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(productId){
      dispatch(getReviewByProductId(productId))

    }
  },[dispatch,productId]);
  const [editingId, setEditingId] = useState(null);
const [editedComment, setEditedComment] = useState("");
const [editedRating, setEditedRating] = useState(0);

  if (isLoading) {
    return <h2>Loading reviews...</h2>;
}
if (!reviews.length) {
    return (
        <div className="customerReviews">
            <h2>No reviews yet.</h2>
        </div>
    );
}

const handleSaveReview = async (review) => {
  const result = await dispatch(
    editReview({
      reviewId: review._id,
      token,
      reviewData: {
        rating: editedRating,
        comment: editedComment,
        skinType: review.skinType,
      },
    })
  );

  if (editReview.fulfilled.match(result)) {
    setEditingId(null);
    dispatch(getReviewByProductId(productId));
  }
};

const handleDeleteReview = async (reviewId) => {
  const result = await dispatch(
    deleteReview({
      reviewId,
      token,
    })
  );

  if (deleteReview.fulfilled.match(result)) {
    dispatch(getReviewByProductId(productId));
  }
};

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
     <div className="customerReviews">
  <h2>Customer Reviews ({reviews.length})</h2>

  {reviews.map((review) => (
    <div key={review._id} className="reviewCard">
      <div className="userInfo">
        <div>
          <h4>{review.userId?.name}</h4>
          <span>{review.userId?.email}</span>

          <div className="ratingStars">
            <p>{review.rating} ⭐</p>
          </div>
        </div>
      </div>
         
{editingId === review._id ? (
  <>
    <p>Skin Type - {review.skinType}</p>

    <textarea
      value={editedComment}
      onChange={(e) => setEditedComment(e.target.value)}
    />

    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={editedRating >= star ? "activeStar" : ""}
          onClick={() => setEditedRating(star)}
        />
      ))}
    </div>

    <button onClick={() => handleSaveReview(review)}>
      Save
    </button>

    <button onClick={() => setEditingId(null)}>
      Cancel
    </button>
  </>
) : (
  <>
    <p>Skin Type - {review.skinType}</p>

    <p className="reviewComment">
      Comment - {review.comment}
    </p>
  </>
)}


      {review.userId?._id === user?._id && (
        <div className="reviewActions">
          <button
    onClick={() => {
      setEditingId(review._id);
      setEditedComment(review.comment);
      setEditedRating(review.rating);
    }}
  >
    Edit
  </button>
            <button onClick={()=>
              handleDeleteReview(review._id)
            }>Delete</button>
        </div>
    )}
    </div>
  ))}
</div>
    </div>
  )
}
