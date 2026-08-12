import React, { useEffect } from 'react'
import './Wishlist.css'
import { useDispatch, useSelector } from 'react-redux'
import { getWishlist, removeWishlist } from '../../config/redux/action/wishlistAction';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import img from '../../assets/extras/img3.avif'
import { BackButton } from '../../components/backbutton/BackButton';

export const Wishlist = () => {
  const {token} = useSelector((state)=>state.auth);
  const { wishlist, isLoading } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getWishlist(token))
  }, [token, dispatch])
  if (isLoading) {
    return <h2 className='loading'>Loading....</h2>
  }
  if (!wishlist || wishlist.items.length === 0) {
    return (
      <div className='emptyWishlist'>
        <p>Your Wishlist is empty <span className='spanIcon'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.003 6.003 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </span>
  </p>
        <p>Add products you love to see them here.</p>
      </div>
    )
  }
  return (
    <section className="wishlistPage">

  <div className="wishlistLayout">

    <div className="wishlistWomen">
      <img src={img} alt="Wishlist Banner" />
    </div>

    <div className="wishlistContent">
     
      <BackButton/>
      <h1>My Wishlist</h1>
      <span className="wishlistCount">
        {wishlist.items.length} Items
      </span>

      <div className="wishlist">
        {wishlist.items.map((item) => {
          const product = item.product;
         if (!product) return null;//Sometimes a product might have been deleted but still exists in the wishlist.
         const { name, slug, images, ratingAvg, price, discountPercentage,} = product;
         const discount = discountPercentage || 0;
         const finalPrice = Math.round(price - (price * discount) / 100);
          return (
            <div className="wishlistCard" key={product._id}>
              <img
                 loading='lazy'
                src={images}
                alt={name}
                onClick={() => nav(`/product/${slug}`)}
              />

              <div className="wishlistInfo">
                <h3>{name}</h3>

                <div className="wishlistRating">
                
                  ⭐ {ratingAvg || 0}
                </div>

                <div className="wishlistPrice">
                  <span className="price">&#8377;{finalPrice.toLocaleString("en-IN")}</span>

                  {discountPercentage > 0 && (
                    <>
                      <span className="oldPrice">
                        &#8377;{price.toLocaleString('en-IN')}
                      </span>

                      <span className="discount">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                <button
                  className="removeBtn" type='button'
                  onClick={() =>
                    dispatch(
                      removeWishlist({
                        productId: product._id,
                        token, 
                        }))}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>
  )
}
