import { createSlice } from "@reduxjs/toolkit";
import { addReview, deleteReview, editReview, getAllReview, getReviewByProductId } from "../../action/reviewAction";


const initialState = {
    allReview : [],
    reviews : [],
    isError : false,
    isSuccess :  false,
    message : '',
    isLoading : false,

}



const reviewSlice = createSlice({
    name : 'review',
    initialState,
    reducers : {
        reset : ()=> initialState,
        clearMessage : (state)=>{
            state.message = ''
        }
    },
    extraReducers : (builder)=>{
    builder
    .addCase(getAllReview.pending , (state,action)=>{
      state.isLoading = true;
      state.message = "Fetching Reviews..";
    })
    .addCase(getAllReview.fulfilled,(state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.allReview = action.payload.allReviews;
        state.message = action.payload.message
    })
    .addCase(getAllReview.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false,
        state.message = action.payload.message;

    })
    .addCase(addReview.pending,(state,action)=>{
       state.isLoading = true;
      state.message = "Uploading Reviews..";
    })
    .addCase(addReview.fulfilled,(state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message;
    })
    .addCase(addReview.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false,
        state.message = action.payload.message;

    })
    .addCase(getReviewByProductId.pending,(state,action)=>{
       state.isLoading = true;
       state.message = "Fetching Reviews..";
    })
    .addCase(getReviewByProductId.fulfilled,(state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.reviews = action.payload.review;
        state.message = "Reviews Fetched";
    })
    .addCase(getReviewByProductId.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false,
        state.message = action.payload.message;

    })
     .addCase(deleteReview.pending,(state,action)=>{
       state.isLoading = true;
       state.message = "deleting Reviews..";
    })
    .addCase(deleteReview.fulfilled,(state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        // state.reviews = action.payload.review;
         state.reviews = state.reviews.filter(
        review => review._id !== action.payload.reviewId
    );
        state.message = "Reviews Deleted";
    })
    .addCase(deleteReview.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false,
        state.message = action.payload.message;

    })
    .addCase(editReview.pending,(state,action)=>{
       state.isLoading = true;
       state.message = "editing Reviews..";
    })
    .addCase(editReview.fulfilled,(state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        const index = state.reviews.findIndex(
        review => review._id === action.payload.review._id
        );

      if (index !== -1) {
        state.reviews[index] = action.payload.review;
       }
        state.message = "Reviews Edited";
    })
    .addCase(editReview.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false,
        state.message = action.payload.message;

    })

    }
})


export  const {reset, clearMessage} = reviewSlice.actions
export default reviewSlice.reducer;
