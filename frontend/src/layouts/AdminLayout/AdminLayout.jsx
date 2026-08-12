import React from 'react'
import './AdminLayout.css'
import { Outlet } from 'react-router-dom'
import { AdminSideBar } from '../../components/adminSidebar/AdminSideBar'

export const AdminLayout = () => {
  return (
    <div className='adminLayout'>
        <AdminSideBar/>
        <div className="adminContent">
            <Outlet/>
        </div>
    </div>
  )
}
