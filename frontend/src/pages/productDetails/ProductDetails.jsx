import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProductBySlug } from '../../config/redux/action/productAction';
import { getCart , addToCart, updateCart } from '../../config/redux/action/cartAction';
import img from '../../assets/new/img.jpg'
import './ProductDetails.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToWishlist, getWishlist, removeWishlist } from '../../config/redux/action/wishlistAction';
import { BackButton } from '../../components/backbutton/BackButton';
import { getMyOrders } from '../../config/redux/action/orderAction';
import {AllReviews} from '../../components/allReviews/AllReviews'
import { WriteReviews } from '../../components/WriteReviews/WriteReviews';

export const ProductDetails = () => {
  const nav = useNavigate();
  const {slug} = useParams();
  const {product, isLoading} = useSelector((state)=>state.product);
  const {cart, message} = useSelector((state)=>state.cart);
  const {wishlist} = useSelector((state)=>state.wishlist);
  const {orders} = useSelector((state)=>state.order);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

    useEffect(() => {
      if (token) {
        dispatch(getMyOrders(token));
      }
    }, [dispatch, token]);
  
  useEffect(()=>{
    dispatch(getProductBySlug(slug))
  },[dispatch,slug])

   const location = useLocation();
   useEffect(() => {
  if (location.hash) {
    const element = document.querySelector(location.hash);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
}, [location]);

  useEffect(()=>{
    if (!token) return; //dont dispatch if token doesnt exists
    dispatch(getCart(token));
    dispatch(getWishlist(token));//thunk
  },[dispatch, token]);
  
  
  if (isLoading) {

  return (
  <div className='productPage'>
    <h2>Loading... </h2>
  </div>
  )
 }
if (!isLoading && !product) {
  return <h2>Product not found.</h2>;
}

async function handleAddToCart(){
  if (!token) {
    nav("/login");
    return;
  }
  const result =  await dispatch(addToCart({
    cart : {
      productId : product._id,
      quantity : 1
    },
    token,
  }))
  
  }
  const cartItem = cart?.items?.find(
    (item)=> item.product?._id  === product._id
  );
  
  const isWishListed = wishlist?.items?.some((item)=> item.product === product._id);
  async function handleWishlist() {
     if (!token) {
    nav("/login");
    return;
  }
    if(isWishListed){
      await dispatch(removeWishlist({
        productId : product._id,
        token
      }))
    }else{
      await dispatch(addToWishlist({
        productId : product._id,
        token
      }))
    }
  }

  const {_id,name,images,category,ratingAvg,numReviews,price,
  discountPercentage,description,skinType,ingredients,stock } = product;

  const finalPrice =  discountPercentage > 0 ?
   Math.round(price - (price * discountPercentage) / 100): price;


  
const canReview = orders?.some(order =>
  order?.status === "delivered" &&
  order?.items?.some(item => item.product === product._id)
);

 async function handleBuyNow() {
  if (!token) {
    nav("/login");
    return;
  }

  const result = await dispatch(
    addToCart({
      cart: {
        productId: product._id,
        quantity: 1
      },
      token
    })
  );

  if (addToCart.fulfilled.match(result)) {
    nav("/checkout");
  }
}

  return (
    <>
   <section className="productPage">
       <BackButton/>
      <div className="productContainer">

        <div className="productImages">
          <img src={images}  loading="lazy" alt={name} />
        </div>

        <div className="productInfo">

          <span className="category">
            {category}
          </span>

          <h1>{name}</h1>
   <button className={`wishlistBtn ${isWishListed ? "active" : ""}`} onClick={handleWishlist} >
            {isWishListed ? <FaHeart /> : <FaRegHeart />}
           <span>{isWishListed ? 'Wishlisted' : 'Add To Wishlist'}</span>
          </button>
      
        <div className="ratings" style={{display : "flex", justifyContent : 'start', alignItems : "center"}}>
        <svg width="30" height="30"  viewBox="0 0 24 24"  fill="#FFC107"  xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57l-5.9 3.11 1.13-6.58-4.78-4.66 6.6-.96L12 2.5z"/>
</svg> {ratingAvg} ({numReviews} Reviews)
          </div>
 
          <div className="priceBox">
            <h2>&#8377;{finalPrice.toLocaleString('en-IN')}</h2>

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

          <p className="description">
            {description}
          </p>

          <div className="details">

            <p>
              <strong>Skin Type :</strong>{" "}
              {skinType?.join(", ")}
            </p>

            <p>
              <strong>Ingredients :</strong>{" "}
              {ingredients?.join(", ")}
            </p>

            <p>
              <strong>Availability :</strong>{" "}
              {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

          </div>

                 <div className="buttons">
            
               {cartItem ? <div className='quantitySelector'>
                <button onClick={()=>{
                  if(cartItem.quantity > 1){
                  dispatch(
                    updateCart({
                      productId : _id,
                      quantity : cartItem.quantity - 1,
                      token
                    })
                  )
                }
                }}>
                  -
                </button>
                <span>{cartItem.quantity}</span>
                 <button onClick={()=>{
                  dispatch(
                    updateCart({
                      productId : _id,
                      quantity : cartItem.quantity + 1,
                      token
                    })
                  )
                 }}>
                  +
                 </button>
               </div> : 

            <button className="cartBtn" onClick={handleAddToCart} disabled={isLoading}>
              Add To Cart
            </button>
            }
            <button className="buyBtn" onClick={handleBuyNow} disabled={isLoading}>
              Buy Now
            </button>

          </div>

        </div>

      </div>
      
 
    <AllReviews productId = {_id}/>
    {canReview && 
         <div id='review'>
      <WriteReviews/>
      </div>
}


    </section>
    </>
  )
}
