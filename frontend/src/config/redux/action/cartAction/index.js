import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async({cart,token}, thunkAPI)=>{
    try{
        const response = await clientServer.post('/cart/addToCart',cart,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
});


export const getCart = createAsyncThunk(
    'cart/getCart',
    async( token, thunkAPI)=>{
 try{
        const response = await clientServer.get(`/cart/getCart`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }

});

export const updateCart = createAsyncThunk(
 'cart/updateCart',
 async ({productId, quantity,token} , thunkAPI)=>{
    try{
    const response = await clientServer.put('/cart/updateCart', {productId, quantity},{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
        return thunkAPI.fulfillWithValue(response.data);
  }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
 });



export const removeCart = createAsyncThunk(
   'cart/removeCart',
   async({productId ,token} , thunkAPI )=>{
 try{
    const response = await clientServer.delete(`/cart/${productId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
     })
        return thunkAPI.fulfillWithValue(response.data);
     }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
   })


export const addSelectedGift = createAsyncThunk(
   'cart/addGift',
   async({giftId ,token} , thunkAPI )=>{
 try{
    const response = await clientServer.post(`/cart/giftId`,{giftId},{
        headers : {
            Authorization : `Bearer ${token}`
        }
     })
        return thunkAPI.fulfillWithValue(response.data);
     }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
   })


//admin


