import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../..";


export const getAllProducts = createAsyncThunk(
'product/getAllProducts', 
async ({limit,minPrice,maxPrice,search,cursor,category} = {},thunkAPI)=>{//default empt obj
    try{

        const response = await clientServer.get('/product/products',{
            params : {
           limit ,
           minPrice ,
           maxPrice ,
           search ,
           cursor,
           category
            }
    
        });
       return response.data;
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
}
)
// Use POST when:
// The filter object is very large or deeply nested.
// You don't want the query parameters visible in the URL.
// You're sending complex search criteria that don't fit naturally in a query string.

export const getAllCategories = createAsyncThunk(
    'product/getAllCategories',
    async(_,thunkAPI)=>{
        try{
            const response = await clientServer.get('/product/category')
            return thunkAPI.fulfillWithValue(response.data);

        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }

)

export const getProductBySlug = createAsyncThunk(
    'product/getProductBySlug',
    async(slug , thunkAPI)=>{
        try{
        const response = await clientServer.get(`/product/${slug}`);
        console.log(response.data);
        return thunkAPI.fulfillWithValue(response.data);
        
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
}
)



//gallery
export const getBestseller = createAsyncThunk(
    'product/getBestSellers',
    async(_, thunkAPI)=>{
        try{
        const response = await clientServer.get('/product/isBestseller');
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
}
)

export const getAllBestSellers = createAsyncThunk(
    'product/getAllBestSellers',
    async(_, thunkAPI)=>{
        try{
        const response = await clientServer.get('/product/getAllBestSellers');
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});}
}
)

export const getProductsBySlugs = createAsyncThunk(
    'product/getProductsBySlugs',
    async(slugs , thunkAPI)=>{
        try{
        const response = await clientServer.get('/product/by-slugs', {
            params : { slugs : slugs.join(',') }
        });
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
}
)



//admin
export const getProductById = createAsyncThunk(
    'product/getProductById',
    async({token,id}, thunkAPI)=>{
        try{
        const response = await clientServer.get(`/product/productById/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)

//patch
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async({token,id ,payload}, thunkAPI)=>{
        try{
        const response = await clientServer.patch(`/product/updateProduct/${id}`,payload,{
            headers : {
                Authorization : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)


export const addProduct = createAsyncThunk(
    'product/createProduct',
    async({token,payload}, thunkAPI)=>{
          try{
        const response = await clientServer.post(`/product/createProduct`, payload,{
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        });
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)


export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async({token,id}, thunkAPI)=>{
        try{
        const response = await clientServer.delete(`/product/deleteProduct/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data || {message : err.message});
    }
    }
)