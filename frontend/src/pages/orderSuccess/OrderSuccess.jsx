import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OrderSuccess.css'

export const OrderSuccess = () => {
    const nav = useNavigate()
  return (
     <section className="orderSuccess">
      <div className="successCard">

        <div className="successIcon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="successMessage">
          Thank you for shopping with <strong>sheBeauty</strong>.
          Your order has been received and is being processed.
        </p>

        <div className="orderInfo">
          <div>
            <span>Status</span>
            <strong>Confirmed</strong>
          </div>

          <div>
            <span>Estimated Delivery</span>
            <strong>3–5 Business Days</strong>
          </div>
        </div>

        <div className="successButtons">
          <button
            className="primaryBtn"
            onClick={() => nav("/myOrders")}
          >
            View Orders
          </button>

          <button
            className="secondaryBtn"
            onClick={() => nav("/allproducts")}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </section>
  )
}
