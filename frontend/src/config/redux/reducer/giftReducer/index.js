import { createSlice } from "@reduxjs/toolkit"
import { getAllGifts } from "../../action/giftAction"

const initialState = {
    allGifts : [],
    isSuccess : false,
    isError : false,
    isLoading: false,
    message : ""
}

const giftSlice = createSlice({
    name : 'gifts',
    initialState,
    reducers : {
        reset : ()=>{
            initialState
        },
        clearMessage : (state)=>{
         state.message = ''
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllGifts.pending,(state,action)=>{
         state.message = "Loading";
         state.isLoading = true;
        })
        .addCase(getAllGifts.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isLoading = false;
            state.allGifts = action.payload.gifts;
            state.message = "Gifts loaded Successfully";
        })
        .addCase(getAllGifts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload.message,
            state.isError = true;
        })
       
    }
});



export const {clearMessage, reset} = giftSlice.actions;
export default giftSlice.reducer ;


