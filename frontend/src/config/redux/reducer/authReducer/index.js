import { createSlice } from "@reduxjs/toolkit"
import { deleteUser, getAllUsers, getUserById, getUserProfile, login, signup, updateUserProfileData, updateUserProfilePicture } from "../../action/authAction"
import { getMyOrderHistory } from "../../action/orderAction"

const initialState = {
    user : null,
    currentUser : null,
    token : localStorage.getItem('token'), 
    isError : false,
    isSuccess : false,
    isLoading : false,
    isLoggedIn : false,
    message : '',
    profileFetced : false,
    userProfile : {},
    showMessage : '',
    allUsers : [],
    adminUser : null,//ask
}



const authSlice = createSlice({
    name : 'auth',
    initialState, 
    reducers : {
      
    reset :  ()=> initialState ,
    
    handleLoginUser :(state)=>{
        state.message = 'Hello'
    },

    clearMessage : (state)=>{
        state.message = ''
    } 
  },
    extraReducers : (builder)=>{
        builder
    .addCase(signup.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = action.payload.user;
        state.message = "Registered Sucessfully";
    })
    .addCase(signup.pending,(state,action)=>{
        state.isLoading = true;
        state.message = "Registering...";
    })
    .addCase(signup.rejected,(state,action)=>{
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload?.message;
    })
    .addCase(login.pending,(state,action)=>{
        state.isLoading = true;
        state.message = "Loggin...";
    })
    .addCase(login.fulfilled,(state,action)=>{
        console.log(action.payload.user)
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload.user?.name;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token',action.payload.token)
        state.message = "Loggin Successfully.";

    })
    .addCase(login.rejected, (state,action)=>{
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload?.message;
    })
    .addCase(getUserProfile.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Fetching Data...";
    })
    .addCase(getUserProfile.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = "Data fetched";
        state.userProfile = action.payload;
    })
    .addCase(getUserProfile.rejected, (state,action)=>{
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload?.message;
    })
    .addCase(updateUserProfileData.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Updating Data...";
    })
    .addCase(updateUserProfileData.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = "Profile Updated";
        state.showMessage = "Profile Updated!"
        state.userProfile = action.payload;
    })
    .addCase(updateUserProfileData.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload?.message;
    })
    .addCase(updateUserProfilePicture.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Updating Data...";
    })
    .addCase(updateUserProfilePicture.fulfilled,(state,action)=>{
      state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = "Profile Updated";
        state.showMessage = "Profile Picture Updated!"
        state.userProfile = action.payload;
    })
    .addCase(updateUserProfilePicture.rejected,(state,action)=>{
          state.isLoading = false;
         state.isError = true;
         state.message = action.payload?.message;
    })
    .addCase(getAllUsers.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Fetching Users...";
    })
    .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = "Fetched Users";
        state.allUsers = action.payload;
    })
    .addCase(getAllUsers.rejected,(state,action)=>{
          state.isLoading = false;
         state.isError = true;
         state.message = action.payload?.message;
    })
    .addCase(getUserById.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Fetching User...";
    })
    .addCase(getUserById.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = "Fetched User";
        state.adminUser = action.payload;
    })
    .addCase(getUserById.rejected,(state,action)=>{
        state.isLoading = false;
         state.isError = true;
         state.message = action.payload?.message;
    })
    .addCase(deleteUser.pending,(state,action)=>{
         state.isLoading = true;
         state.message = "Deleting User...";
    })
    .addCase(deleteUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = " User Deleted";
        state.adminUser = action.payload;
    })
    .addCase(deleteUser.rejected,(state,action)=>{
          state.isLoading = false;
         state.isError = true;
         state.message = action.payload?.message;
    })
    
    }

})

export  const {reset, clearMessage} = authSlice.actions

export default authSlice.reducer;