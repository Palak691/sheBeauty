import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     name : {
        type : String,
        required : true
     },
     slug : {
      type: String, 
      required: true, 
      unique: true ,

     },
     description : {
        type : String,
        required : true
     },
     price : {
        type : Number,
        required : true,
        index : true
     },
     discountPercentage : {
        type : Number
     },
     category : {
        type : String,
        enum : ["skincare", "haircare" , "makeup" , "tools"],
        required : true,
        index : true
     },
     subCategory : {
        type : String
     },
     skinType : [{ 
        type: String, 
        enum: ["oily", "dry", "combination", "sensitive", "normal", "all"] 
  }],
     ingredients: [
      { type: String, index: true }
    ], 
     images: {
      type : String,
      trim : true,
      required : true
     },
  stock: { type: Number, required: true, default: 0 },
  ratingAvg: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },

   
},{timestamps : true})

//cursor paginaiton
productSchema.index({createdAt : -1 , _id : -1});
productSchema.index({category : 1 , price : 1});
productSchema.index({skinType : 1});
productSchema.index({stock : 1})

const Product = mongoose.model("Product" ,productSchema);
export default Product;