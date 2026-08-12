import { createSlice } from "@reduxjs/toolkit"
import { addToWishlist, getWishlist, removeWishlist } from "../../action/wishlistAction";
const initialState = {
 wishlist : {
    items : []
 },
 message : '',
 isSuccess : false,
 isError : false,
 isLoading : false,

}


 const wishlistSlice = createSlice({
    name : 'wishlist',
    initialState,
    reducers : {
     reset : ()=> initialState,
     clearMessage : (state)=> {
        state.message = ''
     }
    },
    extraReducers : (builder)=> {
        builder 
    .addCase(addToWishlist.pending, (state,action)=>{
        state.isLoading = true;
        state.message =  "Fetching"
    })
    .addCase(addToWishlist.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.wishlist = action.payload.wishlist;
    })
    .addCase(addToWishlist.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message
        
    })

      .addCase(getWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
       state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })

       .addCase(removeWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(removeWishlist.fulfilled, (state, action) => {
       state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
       


    }

});


export const {clearMessage, reset} = wishlistSlice.actions
export default wishlistSlice.reducer 