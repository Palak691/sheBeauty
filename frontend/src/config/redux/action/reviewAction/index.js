import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

 export const addReview = createAsyncThunk(
    'review/addReview',
    async(review,thunkAPI)=>{
        try{
        const response = await clientServer.post('/review/new',{
           review : review.review,
           skinType : review.skinType,
           rating : review.rating,
           slug : review.slug
        },{
            headers : {
                Authorization : `Bearer ${review.token}`
            }
        });
        return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
 )

 export const getAllReview = createAsyncThunk(
    'review/getAllReview',
    async (review , thunkAPI) => {
        try{
        const response = await clientServer.get('/review/all');
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
 )

export const getReviewByProductId = createAsyncThunk(
    'review/getReviewByProductId',
    async(id, thunkAPI)=>{
        try{
      const response = await clientServer.get(`/review/${id}`);
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)


export const deleteReview = createAsyncThunk(
    'review/deleteReview',
    async({reviewId, token}, thunkAPI)=>{
        try{
      const response = await clientServer.delete(`/review/${reviewId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
      });
          return thunkAPI.fulfillWithValue({
                ...response.data,
                reviewId,
            });
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)


export const editReview = createAsyncThunk(
    'review/editReview',
    async({reviewId, reviewData, token}, thunkAPI)=>{
        try{
            const response = await clientServer.put(`/review/${reviewId}`,reviewData,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
        return thunkAPI.fulfillWithValue(response.data);

        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)