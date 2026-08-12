import React from 'react'
import './AdminDashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserProfile, login } from '../../../config/redux/action/authAction';
import { AdminLayout } from '../../../layouts/AdminLayout/AdminLayout';
import { getdashboardData } from '../../../config/redux/action/dashboardAction';
import { reset } from '../../../config/redux/reducer/authReducer';

export const AdminDashboard = () => {
const {currentUser, token} = useSelector((state)=>state.auth);
const {dashboard} = useSelector((state)=>state.dashboard);
const nav = useNavigate();
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getdashboardData(token));
},[dispatch, token]);


  return (
      <div className="dashboard">
        <div className='btns'>
      <button className='adminLogout' onClick={async ()=>{
        localStorage.removeItem('token'),
        await dispatch(reset());
        nav('/')
      }}>Logout</button>
      <button className ="homePageBtn" onClick={()=>nav('/')}>Home</button>
        </div>
    <h1>Dashboard</h1>

    <div className="dashboardCards">

        <div className="dashboardCard">
            <h4>Total Products</h4>
            <h2>{dashboard.totalProducts}</h2>
        </div>

        <div className="dashboardCard">
            <h4>Total Users</h4>
            <h2>{dashboard.totalUsers}</h2>
        </div>

        <div className="dashboardCard">
            <h4>Total Orders</h4>
            <h2>{dashboard.totalOrders}</h2>
        </div>

        <div className="dashboardCard">
            <h4>Revenue</h4>
            <h2>₹{dashboard.totalRevenue}</h2>
        </div>

    </div>

    <div className="dashboardCards">

        <div className="dashboardCard">
            <h4>Pending Orders</h4>
            <h2>{dashboard.pendingOrders}</h2>
        </div>

        <div className="dashboardCard">
            <h4>Delivered Orders</h4>
            <h2>{dashboard.deliveredOrders}</h2>
        </div>

        <div className="dashboardCard">
            <h4>Low Stock Products</h4>
            <h2>{dashboard.lowStockProducts}</h2>
        </div>

    </div>

</div>
  )
}
