import { createSlice } from "@reduxjs/toolkit"
import { getdashboardData } from "../../action/dashboardAction";

const initialState = {
    dashboard  : [],
    isError : false,
    isSuccess : false,
      isLoading : false,
       message : ''
}

const dashboardSlice = createSlice({
    name : 'dashboard',
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
        .addCase(getdashboardData.pending , (state,action)=>{
                 state.isLoading = true;
                 state.isError = false;
               })
        .addCase(getdashboardData.fulfilled, (state,action)=>{
              state.isLoading = false;
             state.isSuccess = true;
             state.isError = false;
             state.dashboard = action.payload.dashboard;
            })
            .addCase(getdashboardData.rejected, (state,action)=>{
              state.isLoading = true;
              state.isError = false;
            })
        
       
    }
});



export const {clearMessage, reset} = dashboardSlice.actions;
export default dashboardSlice.reducer ;


