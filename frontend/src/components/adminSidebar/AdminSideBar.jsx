import React from 'react'
import './AdminSideBar.css'
import { NavLink } from 'react-router-dom'

export const AdminSideBar = () => {
  return (
    <div className='adminNavbar'>
      <NavLink to='/admin'>Dashboard</NavLink>
      <NavLink to='/admin/products'>Products</NavLink>
      <NavLink to='/admin/users'>Users</NavLink>
      <NavLink to='/admin/orders'>Orders</NavLink>
    </div>
  )
}
