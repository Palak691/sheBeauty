import React, { useState } from 'react'
import './OrderHistory.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMyOrderHistory, getMyOrders } from '../../config/redux/action/orderAction'
import { Account } from '../../components/common/Account'
import img from '../../assets/extras/img5.jpg'
import { useNavigate } from 'react-router-dom'

export const OrderHistory = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const {orderHistory, isLoading} = useSelector((state)=> state.order);
    const nav = useNavigate();
    const [showAccount, setShowAccount] = useState(true);

useEffect(() => {
  if (!token) return;

  dispatch(getMyOrderHistory(token));
}, [dispatch, token]);
    if(isLoading){
        return <h2>Loading..</h2>
    }
    if (!orderHistory?.length) {
  return (
    <div className="emptyOrders">
     <h2>No Delivered Orders Yet!</h2>
<p>Your delivered orders will appear here.</p>
    </div>
  );
}
  return (
    <div className='order_Section' >

<svg xmlns="http://www.w3.org/2000/svg" className='menuBar' fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
{showAccount && 
        <div className='accountMenu'>
         <Account/>
        </div>}             
 <div className="rightSide">
    <div className="right">
        <div>
            <h2>Delivered Orders History</h2>
            <span>from anytime</span>
        </div>
    <div className="topSection">
        <div className="search">
            <input type="text" placeholder="Search in orders" />
        </div>
        <div className="features">
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg> 
            Filters
        </div>
    </div>

    <div className="allOrder">
        {orderHistory?.map((order)=>(
            order.items.map((item)=>{
                return (
        
              <div className="orderCard" key={item.product}>
            <div className="status">
                {order.status}
            </div>
            <div className="orderContent">
                <div className="orderImage">
                    <img src={item.image} alt="myOrder_img"/>
                </div>
                <div className="orderInfo">
                    <h3>{item.name}</h3>
                    <div>
                    <p>Qty : {item.quantity}</p>
                    <p className="price">&#8377;{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                    <p className="orderDate">
                               Ordered on{" "}
                       {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                    <p className="orderId">
                      Order ID: {order._id}
                     </p>
                     </div>

                    {order.gift && (
            <div className="giftSection">

              <h4>🎁 Free Gift</h4>

              <div className="giftCard">
                <img
                  src={order.gift.image}
                  alt={order.gift.name}
                />

                <p>{order.gift.name}</p>
              </div>

            </div>
          )}


                </div>
            </div>
                     <div className="slugBtn">
                    <button onClick={()=>{
                       nav(`/product/${item.slug}`)
                    }}>Rate & Review</button>
                    </div>
        </div>
        
           )
            })
        ))}
       
    </div>
</div>
<div className="womenImg">
    <img src={img} alt='women_img' />
</div>
</div>           
    </div>
  )
}




