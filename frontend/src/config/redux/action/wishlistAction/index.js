import { createAsyncThunk } from "@reduxjs/toolkit"
import { clientServer } from "../../.."

export const addToWishlist = createAsyncThunk(
'wishlist/add',
async({productId, token}, thunkAPI)=>{
try{
    const response = await clientServer.post('/wishlist/addToWishlist',{productId},{
        headers : {
            Authorization : `Bearer ${token}`
        }
        
    })
    return thunkAPI.fulfillWithValue(response.data);
}catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    })

    

export const getWishlist = createAsyncThunk(
'wishlist/get',
async( token, thunkAPI)=>{
try{
    const response = await clientServer.get('/wishlist/getWishList',{
        headers : {
            Authorization : `Bearer ${token}`
        }
        
    })
    return thunkAPI.fulfillWithValue(response.data);
}catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
})


export const removeWishlist = createAsyncThunk(
'wishlist/remove',
async({productId, token}, thunkAPI)=>{
try{
    const response = await clientServer.delete(`/wishlist/${productId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
        
    })
    return thunkAPI.fulfillWithValue(response.data);
}catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    })