import React, { useMemo } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGifts } from '../../config/redux/action/giftAction';
import './FreeGifts.css'
import { BackButton } from '../../components/backbutton/BackButton';
import { useNavigate } from 'react-router-dom';
import { addSelectedGift, getCart } from '../../config/redux/action/cartAction';

export const FreeGifts = () => {
  const {allGifts} = useSelector((state)=> state.gifts);//store ka naam!
  const nav = useNavigate();
  const {cart,selectedGift, isLoading} = useSelector((state)=>state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(getCart(token))
       dispatch(getAllGifts())
    },[dispatch, token]);

    async function handleGiftSubmit(giftId) {
      await dispatch(addSelectedGift({
        giftId,
        token,
      }))
      await nav('/checkout');
    }

  const subtotal = useMemo(() => {
        if (!cart?.items) return 0;
        return cart?.items.reduce((total, item) => {

      const {discountPercentage,price} = item.product
      const finalprice = discountPercentage > 0   ? Math.round(price -
        (price * discountPercentage) / 100) : price;
         return total + finalprice * item.quantity;

        }, 0);
      }, [cart?.items])
  return (
     <div className="freeGifts">
     <BackButton/>
     <div className="giftHero">
</div>
      <div className="giftHeading">
        <h2>
            CHOOSE YOUR FREE GIFT
    <svg  style={{width : "40px" , height : "70px"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>
        </h2>
    </div>
      <div className="giftContainer">
        {allGifts?.map((gift) => {
          const eligible = subtotal >= gift.minOrderValue;
          return (

            <div className="giftCard" key={gift._id}>
              <div className="giftImage">
                <img src={gift.image} alt={gift.name} />
              </div>
              <div className="giftContent">
                <h3>{gift.name}</h3>
                <p>{gift.description}</p>
                <span className="giftCondition">
                  Free on orders above &#8377;{gift.minOrderValue}
                </span>
                <button className= {eligible ? 'giftBtn activeGiftBtn' : "giftBtn disabledGiftBtn"} disabled={isLoading ||!eligible} 
                  onClick={()=>handleGiftSubmit(gift._id)}>
                  {isLoading ? "Selecting..." : eligible ? 
                "Select Gift" :`Shop ₹${(gift.minOrderValue - subtotal).toLocaleString('en-IN') } amount more `}
                  </button>
              </div>
            </div>
          );
  })}
      </div>
    </div>
  )
}
