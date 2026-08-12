import React, { useEffect } from 'react'
import './Orders.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomerOrders } from '../../../config/redux/action/orderAction';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../../components/backbutton/BackButton';
export const Orders = () => {
  const {token} = useSelector((state)=>state.auth);
  const {allOrders} = useSelector((state)=>state.order);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(()=>{
   dispatch(getAllCustomerOrders(token));
  },[dispatch])

  return (
     <div className="orders">
<BackButton/>
            <div className="ordersHeader">
                <h2>Orders</h2>
            </div>

            <div className="ordersHeading">
                <p>Customer</p>
                <p>Products</p>
                <p>Total</p>
                <p>Payment</p>
                <p>Paid</p>
                <p>Status</p>
                <p>Date</p>
                <p>Actions</p>
            </div>

            {allOrders?.map((order) => (

                <div className="orderRow" key={order._id}>

                    <div>
                        <h4>{order.userId?.name}</h4>
                        <p>{order.userId?.email}</p>
                    </div>

                    <p>{order.items.length}</p>

                    <p>₹{order.totalPrice}</p>

                    <p>{order.paymentMethod}</p>

                    <p>
  {order.isPaid ? (
    <div className="paymentStatus paid">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      Paid
    </div>
  ) : (
    <div className="paymentStatus unpaid">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      Unpaid
    </div>
  )}
</p>

                    <p>{order.status}</p>

                    <p>
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <button
                        onClick={() =>
                            nav(`/admin/orders/${order._id}/edit`)
                        }>
                        View
                    </button>

                </div>

            ))}

        </div>
  )
}
