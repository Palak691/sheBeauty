import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const getAllGifts = createAsyncThunk(
    'gift/getAllGifts',
    async(_, thunkAPI)=>{
        try{
        const response = await clientServer.get('gift/getAllGifts')
        return thunkAPI.fulfillWithValue(response.data)
}catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    
})