import React from 'react'
import './Account.css'
import { useSelector } from 'react-redux'

export const Account = () => {
  const {user} = useSelector((state)=>state.auth);
  return (
    <div>
        <div className="left">
        <p className='para'>Account</p>
        <p>{user}</p>
        <p className='para'>Overview</p>
        <div className='orders'>
          <p>ORDERS</p>
          <p>Orders and RETURNS</p>
        </div>
        <div className='credits'>
          <p>CREDITS</p>
          <p>Coupons</p>
          <p>sheBeauty Credit</p>
          <p>sheCash</p>
        </div>
        <div className='account'>
          <p>ACCOUNT</p>
          <b>Profile</b>
          <p>Saved Card</p>
           <p>UPI/wallet</p>
            <p>Delete Account</p>
        </div>
        <div className='legal'>
          <p>LEGAL</p>
          <p>Terms and Conditions</p>
          <p>Privacy Center</p>
        </div>
      </div>
    </div>
  )
}
