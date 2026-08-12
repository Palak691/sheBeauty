import React, { useEffect, useMemo, useState } from 'react'
import './Checkout.css'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedGift, getCart } from '../../config/redux/action/cartAction';
import { createOrder } from '../../config/redux/action/orderAction';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/extras/img4.jpg'
import { BackButton } from '../../components/backbutton/BackButton';
export const Checkout = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { cart, profile, isLoading, isError} = useSelector((state) => state.cart);
  const selectedGift = cart?.gift;
  const [message, setMessage] = useState('');
  

useEffect(() => {
  if (!token) {
  nav("/login");
  return;
  }
  dispatch(getCart(token));

}, [dispatch, token]);
  
// &#8377;
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0 ;

    return cart?.items.reduce((total, item) => {
      const {discountPercentage, price} = item.product
      const finalprice = discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;
      return total + finalprice * item.quantity;

    }, 0);
  }, [cart?.items]);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;


  const handlePlaceOrder = async () => {
    setMessage('');
    const result = await dispatch(
      createOrder({
        token,
        order : {
          paymentMethod,
        }
      })
    );
     if (createOrder.fulfilled.match(result)) {
      setMessage("Order Placed Successfully");
      nav("/OrderSuccess");
  }else{
    setMessage(result?.payload || "Order Failed")
  }
  };

  return (
    <section className='checkoutPage'>
      <BackButton />
      <h1>Checkout</h1>
      <div className="checkoutContainer">
        <div className="checkoutLeft">
          <div className="checkoutCard">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Shipping Address</h2>
              <button onClick={() => {
                nav('/edit_profile')
              }} className='editProfileBtn'>Edit  Profile</button>
            </div>

            <div className="addressInfo">
              <p>Name : {cart.userId?.name}</p>
              <p>Email : {cart?.userId?.email}</p>
              <p>Phone : {profile?.mobile_no}</p>
              <p>Address : {profile?.address || "Not added"}</p>
              <p>City : {cart?.userId?.city || "Not added"}</p>
              <p>State : {cart?.userId?.state || "Not added"}</p>
              <p>Pincode : {cart?.userId?.pincode || "Not added"}</p>
            </div>
          </div>
          <div className="chooseFreeGift">
            <div className="img">
              <img src={img} alt="Free Gift" />
            </div>
            {selectedGift  ?  <div className='selectedGift'>
              <h3>Your Free gift</h3>
              <div className="giftInfo">
                <img src={selectedGift?.image}  loading='lazy' alt={selectedGift?.name} />
                <p>{selectedGift?.name}</p>
                </div>
            </div> :
            <div className="giftContent">
              <h3>Choose Your Free Gift </h3>
              <p>
                Eligible orders can select one complimentary beauty gift before placing the order.
              </p>
              <button className="chooseGiftBtn" onClick={() => nav('/freeGift')}>
                Choose Gift
              </button>
            </div>
            }
          </div>
          <div className="checkoutCard">
            <h2>Payment Method</h2>
            <label htmlFor="COD">
              <input type="radio" checked={paymentMethod === "COD"} id='COD' onChange={() => setPaymentMethod("COD")} />
              Cash On Delivery
            </label>
            <label htmlFor="upi" >
              <input type="radio" disabled  id = "upi"/>
              UPI
            </label>
            <label htmlFor="card">
              <input type="radio" disabled id='card'  />
              Card
            </label>
          </div>

        </div>
        <div className="checkoutRight">
          <div className="checkoutCard">
            <h2>Order Summary</h2>

            {cart?.items?.map((item) => {
           const product = item.product;
           const {_id, name, images, price, discountPercentage,slug} = product;

        const finalPrice = discountPercentage > 0 ? Math.round(price - (price * discountPercentage) / 100) 
                       : price;

              return (
                <div
                  className="summaryItem" key={_id} >
                  <img src={images} alt={name}/>

                  <div>
                    <h4>{name}</h4>
                    <p>
                      &#8377; {finalPrice.toLocaleString('en-IN')} × {item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}

            <hr />

            <div className="priceRow">
              <span>Subtotal</span>
              <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="priceRow">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString('en-IN')}`}</span>

            </div>

            <div className="priceRow total">
              <span>Total</span>
              <span>&#8377;{total.toLocaleString('en-IN')}</span>
            </div>
                 {message && (
                      <p className={isError ? "errorMessage" : "successMessage"}>
                        {message}
                         </p>)} 
            <button
              className="placeOrderBtn"
              onClick={handlePlaceOrder}
              disabled = {isLoading}>
            {isLoading ? "Placing Order..." : "Place Order"}
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
