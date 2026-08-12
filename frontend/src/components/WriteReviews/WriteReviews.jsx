import React, { useState } from 'react'
import './WriteReviews.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { addReview, getReviewByProductId } from '../../config/redux/action/reviewAction';

export const WriteReviews = () => {
  const {slug} = useParams();
  const { token , isLoading} = useSelector((state) => state.auth);
  const {allReview, message} = useSelector((state)=>state.review);
  const dispatch = useDispatch();
  const [writeReview, setWriteReview] = useState({
    comment: '',
    rating : 0,
    skinType : ''
  });

  const onChangeHandler =  (e)=>{
     const {name, value} = e.target;
     setWriteReview((prev)=>{
      return { ...prev , [name] : value}
     })
  }

  const onSubmitHandler = async (e)=>{
   e.preventDefault();
   if(!token) return;
   const result = await dispatch(addReview({...writeReview, slug,token}));
   if(addReview.fulfilled.match(result)){

     setWriteReview({
      comment : '',
      rating: 0,
      skinType : ''
     })
     dispatch(getReviewByProductId({id : result.payload.productId}))
   }
  }
  return (
    <form onSubmit={onSubmitHandler}>
              <div className='writeReviewContainer'>
              <div className='writeReview'>
                <p> WRITE A REVIEW </p>
               <div className="rating">
             {[1,2,3,4,5].map((star) => (
             <FaStar key={star} onClick={() => setWriteReview((prev) => ({...prev, rating: star,}))}
              className={writeReview.rating >= star ? "activeStar" : ""}/>
          ))}
        </div>
                <div className="comment">
                  <textarea rows="5" name='comment' value={writeReview.comment} required  onChange={onChangeHandler} placeholder="Share your experience..."></textarea>
                </div>
                <div className='skinType'>
                  <select name="skinType" required value={writeReview.skinType} onChange={onChangeHandler}>
                    <option value="">--Select Skin Type --</option>
                    <option value="normal">Normal</option>
                    <option value="dry">Dry</option>
                    <option value="oily">Oily</option>
                    <option value="combination">Combination</option>
                    <option value="sensitive">Sensitive</option>
                    {/* <option value="acne-prone">Acne Prone</option> */}
                  </select>
                </div>
        <button type='submit' className='submitReview' >
                   Submit
        </button>
              </div>
            </div>
              </form>
  )
}
