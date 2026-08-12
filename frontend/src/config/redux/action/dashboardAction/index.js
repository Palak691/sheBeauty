import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";

export const getdashboardData = createAsyncThunk(
    'user/dashboardData',
    async(token,thunkAPI)=>{
        try{
            const response = await clientServer.get('admin/dashboard',{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            
            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data || {message : err.message})
        }
    }
)
