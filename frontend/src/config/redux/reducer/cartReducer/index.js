import { createSlice } from "@reduxjs/toolkit"
import { addSelectedGift, addToCart, getCart, removeCart, updateCart } from "../../action/cartAction"

const initialState = {
 cart : null,
 profile : null,
 message : '',
 isSuccess : false,
 isError : false,
 isLoading : false,

}


 const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
     reset : ()=> initialState,
     clearMessage : (state)=> state.message = ''
    },
    extraReducers : (builder)=> {
        builder 
    .addCase(addToCart.pending, (state,action)=>{
        state.isLoading = true;
        state.message =  "Fetching"
    })
    .addCase(addToCart.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.cart = action.payload.cart;
    })
    .addCase(addToCart.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message
        
    })

      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(getCart.fulfilled, (state, action) => {
       state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.cart = action.payload.cart;
        state.profile = action.payload.profile;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })

       .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(updateCart.fulfilled, (state, action) => {
       state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.cart = action.payload.cart;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
       .addCase(removeCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(removeCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.cart = action.payload.cart;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
       .addCase(addSelectedGift.pending , (state,action)=>{
         state.isLoading = true;
         state.isError = false;
       })
       .addCase(addSelectedGift.fulfilled, (state,action)=>{
         state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.selectedGift = action.payload.cart;
       })
       .addCase(addSelectedGift.rejected, (state,action)=>{
         state.isLoading = true;
         state.isError = false;
       })

    }

});


export const {clearMessage, reset} = cartSlice.actions
export default cartSlice.reducer 