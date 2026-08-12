import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    mobile_no : {
        type : String
    },
    address : {
        type : String
    },
    ageGroup : {
        type : String,
        enum :  ["under18" ,"18-24", "25-34","35-44" ,"45+"],
        default : null
    },
    skinType :{
        type : String,
        enum :  ["oily", "dry", "combination", "normal" ,"sensitive", "acne-prone"],
        default : null
    },
    skinConcerns: [{
    type: String,
    enum: [ "acne", "pigmentation", "dark_spots", "wrinkles", "dryness",
        "oiliness",  "large_pores",  "redness",  "sensitivity" , "acne_scars", "others" ] 
    }],

    wishList : {
     type : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }],
    default  : []
}
    
    
},{timestamps : true})

profileSchema.post('findOneAndDelete', async function(profile){//check
    if(profile){
        await mongoose.model('User').findByIdAndDelete(profile.userId)
    }
})



const Profile = mongoose.model("Profile" , profileSchema);
export default Profile;