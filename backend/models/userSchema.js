import mongoose from "mongoose";
import Profile from "./profileSchema.js";
import Cart from "./cartSchema.js";
import Wishlist from "./wishlistSchema.js";
import Review from "./reviewSchema.js";
import Order from "./orderSchema.js";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :  true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    gender : {
        type : String,
        enum : ["male", "female"],
        default : null
    },
    password : {
       type : String,
       required:  true,
       select : false
    },
    profilePicture : {
        type : String,
        default : "default.jpg"
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
     
},{timestamps : true})


//cascade delete on user

userSchema.post('findOneAndDelete', async function(deletedUser){
    if(!deletedUser) return;
//docs is the user document that was deleted
    const userId = deletedUser._id;
    await Promise.all([
        Profile.deleteMany({ userId }),
        Cart.deleteMany({ userId }),
        Wishlist.deleteMany({ userId }),
        Review.deleteMany({ userId }),
        Order.deleteMany({ userId }), // if you want
    ]);
})


// await User.findByIdAndDelete(userId);
// automatically removes all the related documents.

const User = mongoose.model("User" , userSchema);
export default User;