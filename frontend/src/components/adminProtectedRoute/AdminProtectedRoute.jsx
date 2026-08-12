import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

export const AdminProtectedRoute = ({children}) => {
    const {currentUser} = useSelector((state)=>state.auth);
    const location = useLocation();
    if(currentUser?.role !== "admin"){
      return (
        <Navigate to={'/'} state={{from : location}} replace />
      )
    }
    return children

}


