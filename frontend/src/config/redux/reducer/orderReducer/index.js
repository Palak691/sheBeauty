import { createSelector, createSlice } from "@reduxjs/toolkit"
import { createOrder, getAllCustomerOrders, getCustomerOrderById, getMyOrderHistory, getMyOrders, getOrderById, updateCustomerOrderStatus } from "../../action/orderAction"

const initialState = {
     orders : [],
     order : null,
     isLoading : false,
     isSuccess : false,
     isError : false,
     message : '',
     allOrders : [],
     customerOrder : null,
     status : '',
    orderHistory : []

}



const orderSlice = createSlice({
    name :  'order',
    initialState,
    reducers : {
     reset : ()=> initialState,
     clearMessage : (state)=>{
        state.message = ''
     } 
    },
    extraReducers : (builder)=>{
     builder
     .addCase(createOrder.pending, (state,action)=>{
        state.isLoading = true;
        state.message = 'Loading.....'
         
     })
     .addCase(createOrder.fulfilled, (state,action)=>{
        state.isError = false,
        state.isSuccess = true;
        state.isLoading = false;
        state.order = action.payload.newOrder;
        state.message = "Order Created";
     })
     .addCase(createOrder.rejected , (state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message
     })
     .addCase(getMyOrders.pending,(state, action)=>{
        state.isLoading = true;
        state.message = 'Fetching Your Order...'
     })
     .addCase(getMyOrders.fulfilled, (state,action)=>{
        state.isError = false,
        state.isSuccess = true;
        state.isLoading = false;
        state.orders = action.payload.myOrders;
        state.message = "Orders Fetched Sucessfully";
     })
     .addCase(getMyOrders.rejected,(state,action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message
     })
     .addCase(getOrderById.pending, (state,action)=>{
        state.isLoading = true;
        state.message = 'Fetching Your Order...'
     })
      .addCase(getOrderById.fulfilled, (state,action)=>{
        state.isError = false,
        state.isSuccess = true;
        state.isLoading = false;
        state.order = action.payload.myOrder;
        state.message = "Order Fetched Successfully";
      })
      .addCase(getOrderById.rejected,(state, action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(getAllCustomerOrders.pending,(state,action)=>{
        state.isLoading = true;
        state.message = 'Fetching ALL Order...'
     })
     .addCase(getAllCustomerOrders.fulfilled, (state,action)=>{
        state.isError = false,
        state.isSuccess = true;
        state.isLoading = false;
        state.allOrders = action.payload.customerOrders;
        state.message = "Order Fetched Successfully";
      })
      .addCase(getAllCustomerOrders.rejected,(state, action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(getCustomerOrderById.pending,(state,action)=>{
        state.isLoading = true;
        state.message = 'Fetching customer Order...'
     })
     .addCase(getCustomerOrderById.fulfilled, (state,action)=>{
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.customerOrder = action.payload.customerOrder;
        state.message = "Customer Order Fetched Successfully";
      })
      .addCase(getCustomerOrderById.rejected,(state, action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateCustomerOrderStatus.pending,(state,action)=>{
        state.isLoading = true;
        state.message = 'Fetching customer Order status...';
     })
     .addCase(updateCustomerOrderStatus.fulfilled, (state,action)=>{
      console.log(action.payload)
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.status = action.payload.customerOrder.status;
        state.message = "status fetched";
      })
      .addCase(updateCustomerOrderStatus.rejected,(state, action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(getMyOrderHistory.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Order History...";
    })
    .addCase(getMyOrderHistory.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = " Order History";
        state.orderHistory = action.payload.myOrder;
    })
    .addCase(getMyOrderHistory.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload?.message;
    })
     }
    
    })


export const {clearMessage, reset} = orderSlice.actions;
export default orderSlice.reducer