import { createSlice } from "@reduxjs/toolkit"
import { addProduct, deleteProduct, getAllBestSellers, getAllCategories, getAllProducts, getBestseller, getProductById, getProductBySlug, getProductsBySlugs, updateProduct } from "../../action/productAction"


const initialState = {
    products : [],
    product : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    isLoggedIn : false,
    nextCursor : null,
    hasMore : false,
    message : '',
    allCategory : [],
    galleryProducts : [],
    isBestseller : [],
    allBestsellers : []

    
}

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
        reset : ()=> initialState,
        clearMessage : (state)=> {
            state.message = ''
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllProducts.pending,(state,action)=>{
            state.isLoading = true;
            state.message = 'Fetching All Products...'
        })
        .addCase(getAllProducts.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(action.meta.arg.cursor === null){
                
                state.products = action.payload?.products;
            }else{
                state.products.push(...action.payload?.products);
            }
            state.hasMore = action.payload?.hasMore;
            state.nextCursor = action.payload?.nextCursor;
            state.message = "Products Fetched Successfully";

        })
        .addCase(getAllProducts.rejected ,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload?.message || "Something Went Wrong";
        })
        .addCase(getAllCategories.pending,(state,action)=>{
            state.isLoading = true;
            state.message = "Loading";
        })
        .addCase(getAllCategories.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false,
            state.allCategory = action.payload?.category;
            state.message = action.payload?.message;
        })
        .addCase(getAllCategories.rejected, (state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload?.message || "Something went wrong";
        })
        .addCase(getProductBySlug.pending,(state,action)=>{
            state.isLoading = true;
            state.message = "Loading..";

        })
        .addCase(getProductBySlug.fulfilled,(state,action)=>{
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.product = action.payload?.product;
            state.message = action.payload?.message;
        })
         .addCase(getProductBySlug.rejected, (state,action)=>{
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = action.payload?.message || "Something went wrong";
        })
        .addCase(getProductsBySlugs.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Loading gallery products...";
         })
      .addCase(getProductsBySlugs.fulfilled,(state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.galleryProducts = action.payload?.products;
        state.message = "Gallery Products Fetched Successfully";
      })
    .addCase(getProductsBySlugs.rejected, (state,action)=>{
       state.isError = true;
       state.isSuccess = false;
       state.isLoading = false;
      state.message = action.payload?.message || "Something went wrong";
     })
     .addCase(getBestseller.pending, (state,action)=>{
        state.isLoading = true;
        state.message = "Loading gallery products...";
     })
     .addCase(getBestseller.fulfilled, (state,action)=>{
         state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isBestseller = action.payload?.isBestseller;
        state.message = "Bestseller products fetched"
     })
     .addCase(getBestseller.rejected, (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload?.message || "Something went wrong";
     })
      .addCase(getAllBestSellers.pending, (state,action)=>{
        state.isLoading = true;
        state.message = "Loading gallery products...";
     })
     .addCase(getAllBestSellers.fulfilled, (state,action)=>{
         state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.allBestsellers = action.payload?.allBestseller;
        state.message = "Bestseller products fetched"
     })
     .addCase(getAllBestSellers.rejected, (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload?.message || "Something went wrong";
     })
     .addCase(getProductById.pending,(state,action)=>{
        state.isLoading = true;
        state.message = "Loading ...";
     })
     .addCase(getProductById.fulfilled,(state,action)=>{
         state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload?.product;
        state.message = " Product Details fetched."
     })
     .addCase(getProductById.rejected, (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload?.message || "Something went wrong";
     })
     .addCase(updateProduct.pending,(state,action)=>{
          state.isLoading = true;
        state.message = "Updating...";
     })
     .addCase(updateProduct.fulfilled,(state,action)=>{
         state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Updated Product Details"
     })
     .addCase(updateProduct.rejected, (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload?.message || "Something went wrong";
     })
     .addCase(deleteProduct.pending,(state,action)=>{
        state.isLoading = true;
        state.message = "Deleting...";
     })
     .addCase(deleteProduct.fulfilled,(state,action)=>{
         state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Product Deleted"
     })
     .addCase(deleteProduct.rejected, (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload?.message || "Something went wrong";
     })
     .addCase(addProduct.pending,(state,action)=>{
         state.isLoading = true;
        state.message = "Adding...";
     })
     .addCase(addProduct.fulfilled,(state,action)=>{
         state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "New Product Created"
     })
     .addCase(addProduct.rejected, (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload?.message || "Something went wrong";
     })
     

}
})

export  const {reset , clearMessage} = productSlice.actions;
export default productSlice.reducer;





