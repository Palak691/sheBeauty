import { clientServer } from '../../../../config/index.jsx'
import { createAsyncThunk } from "@reduxjs/toolkit";



export const signup = createAsyncThunk(
    'user/signup',
    async(user,thunkAPI)=>{
        try{

            const response = await clientServer.post('user/signup',{
                 name : user.name,
                 email : user.email,
                 password : user.password,
                 gender : user.gender
            });
            console.log(response.data);
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data || {message : err.message})
        }
    }
)


export const login = createAsyncThunk(
    'user/login',
    async(user,thunkAPI)=>{
        try{
        const response = await clientServer.post('user/login',{
            email : user.email,
            password : user.password
        });
        if(response.data.token){
            localStorage.setItem('token', response.data.token);
            return response.data
        }else{
            return thunkAPI.rejectWithValue({message : "Token not provided!"})
        }

    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || {message : err.message})
    }
})


export const getUserProfile = createAsyncThunk(
    '/user/getAboutUser',
   async (token, thunkAPI)=>{
    try{
      const response =  await clientServer.get('/user/get_User_And_Profile/',{
      headers : {
        Authorization : `Bearer ${token}`
      }
      });
      return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || {message : err.message});
    }
}
)

export const updateUserProfileData = createAsyncThunk(
    'user/editUserProfile',
    async ({token , userData},thunkAPI)=>{//the 2nd arg is req.body
        try{
     const response = await clientServer.post('/user/update_UserProfileData',
       userData
     ,{
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

export const updateUserProfilePicture = createAsyncThunk(
    'user/updateUserProfile',
    async({token,profilePicture},thunkAPI)=>{
        const formData = new FormData();
        formData.append('profilePicture',profilePicture);

        try{
        const response = await clientServer.post('/user/upload_ProfilePicture',formData,{
            headers : {
                Authorization : `Bearer ${token}`
            }
            
        })
        return thunkAPI.fulfillWithValue(response.data)
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || {message : err.message})
    }
    }
)



//admin

export const getAllUsers = createAsyncThunk(
    '/user/getAllUsers',
   async (token, thunkAPI)=>{
    try{
      const response =  await clientServer.get('user/admin/getAllUsers',
     {
         headers : {
        Authorization : `Bearer ${token}`
      }
     }
    )
      return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || {message : err.message});
    }
}
)


// getUserById



export const getUserById = createAsyncThunk(
    '/user/getUserById',
   async ({token,id}, thunkAPI)=>{
    try{
      const response =  await clientServer.get(`user/admin/getUserById/${id}`,{
         headers : {
        Authorization : `Bearer ${token}`
      }
     });
      return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || {message : err.message});
    }
}
)


export const deleteUser = createAsyncThunk(
    '/user/deleteUser',//unique
   async ({token,id}, thunkAPI)=>{
    try{
      const response =  await clientServer.delete(`user/admin/deleteUser/${id}`,{
         headers : {
        Authorization : `Bearer ${token}`
      }
     })
      return thunkAPI.fulfillWithValue(response.data);
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data || {message : err.message});
    }
}
)