import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    items: [
        { 
            product : {
             type : mongoose.Schema.Types.ObjectId,
             ref : "Product" , 
             required : true 
           },
            name : {
                type :  String,
                required : true
            },

            price :{
                type : Number,
                required : true

            } ,
            quantity :{
                type : Number,
                required : true
            } ,
            image : {
                type : String,
                required : true
            },
            slug :{
                type : String,
                required : true

            }
        }],
        shippingAddress : {
            fullName : {
                type : String,
                required : true
            } ,
            address :{
                type : String,
                required : true
            } ,
            city :{
                type : String,
                required : true
            },
            mobile_no : {
                type : String,
                required : true
        },
        
    },
        paymentMethod : {
             type : String,
             enum:  ["COD", "Razorpay", "Stripe", "Paytm", "GooglePay", "PhonePe"],
             default : 'COD'
        },

        paymentResult : {
            id  : String,
            status : String,
            
        },

        itemPrice : {
            type : Number,
            default : 0
        },

        shippingPrice :{
            type : Number,
            default : 0
        },

        totalPrice :{
            type : Number,
            default : 0

        },
        isPaid :  {
            type : Boolean,
            default : false
        },
        paidAt : Date,
         
        status : {
            type : String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending"  
        },
        gift : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Gift"
        }
        

},{timestamps : true})

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({status : 1});
orderSchema.index({status : 1, createdAt : -1});
orderSchema.index({createAt : -1});

const Order = mongoose.model("Order" , orderSchema);
export default Order;