import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async({token , order}, thunkAPI)=>{
        try{
        const response = await clientServer.post('/order/createOrder' ,
           order
         ,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
    )
    return thunkAPI.fulfillWithValue(response.data)
}catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)







export const getOrderById = createAsyncThunk(
    'order/getOrderById',
    async({token , id}, thunkAPI)=>{
        try{
        const response = await clientServer.get(`/order/${id}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
            
        });
    return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
        
    
)


export const getMyOrders = createAsyncThunk(//1
    'order/getOrder',
    async(token, thunkAPI)=>{
        try{
        const response = await clientServer.get('/order/getMyOrders',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    return thunkAPI.fulfillWithValue(response.data)


    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)
export const getMyOrderHistory = createAsyncThunk(//1
    'order/getOrderHistory',
    async(token, thunkAPI)=>{
        try{
        const response = await clientServer.get('/order/getOrderHistory',{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    return thunkAPI.fulfillWithValue(response.data)


    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)
//admin
// getCustomerOrders


export const generateInvoice = createAsyncThunk(//1
    'order/generateInvoice',
    async({token,orderId}, thunkAPI)=>{
      try{
        const response = await clientServer.get(`/order/${orderId}/invoice`,{
            headers : {
                Authorization : `Bearer ${token}`
             },
             responseType : 'blob'
             }
           )
      return thunkAPI.fulfillWithValue(response.data);

    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)

export const getAllCustomerOrders = createAsyncThunk(//1
    'order/getCustomerOrders',
    async(token, thunkAPI)=>{
        try{
        const response = await clientServer.get('/order/admin/getCustomerOrders',{
            headers : {
                Authorization : `Bearer ${token}`
             } }
        )
    return thunkAPI.fulfillWithValue(response.data);


    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)
// getCustomerOrderById/


export const getCustomerOrderById = createAsyncThunk(//1
    'order/getCustomerOrderById',
    async({token,id}, thunkAPI)=>{
        try{
        const response = await clientServer.get(`/order/admin/getCustomerOrderById/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        )
       return thunkAPI.fulfillWithValue(response.data);

    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)

// updateCustomerOrderStatus
// {status} check this
export const updateCustomerOrderStatus = createAsyncThunk(//1
    'order/updateCustomerOrderStatus',
    async({token,id,status}, thunkAPI)=>{
        try{
        const response = await clientServer.post(`/order/admin/updateCustomerOrderStatus/${id}`,{status},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        )
       return thunkAPI.fulfillWithValue(response.data);

    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)