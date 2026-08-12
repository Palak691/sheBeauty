import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    
       userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        // required : true,
        index : true
       },
       productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
       },
        rating: { type: Number, required: true, min: 1, max: 5 },
       comment: { type: String, required: true , trim : true, maxlength : 1000},
       skinType: { 
        type: String , 
        enum: ["oily","dry","combination","normal","sensitive"]
  },  

    
},{timestamps : true})


reviewSchema.index({ productId: 1, createdAt: -1, _id: -1 });



const Review = mongoose.model("Review" , reviewSchema);
export default Review;