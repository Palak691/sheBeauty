import Profile from "../models/profileSchema.js";
import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import ExpressErr from "../utils/ExpressErr.js";

export const register = async (req,res)=>{

        const {name,email,password, gender} = req.body;
        if(!name || !email ||!password){
            throw new ExpressErr(400, 'All Fields Are Required');
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existsEmail = await User.findOne({email : normalizedEmail});
        if(existsEmail){
            throw new ExpressErr(400, 'Email Already Exists');
            
        }
        const hashedPassword = await bcrypt.hash(password,8);
        //salt rounds It controls how much computational work bcrypt performs.
        const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
            gender
        })
        const newProfile = await Profile.create({userId : newUser._id});
        return res.status(201).json({message:"New User Created" , user : newUser.name});
    

}

export const login = async  (req,res)=>{

     const {email, password} = req.body;
     console.log(req.body);
    if(!email || !password){
        throw new ExpressErr(400, 'Email and Password Are Required');
    }
    const existsUser = await User.findOne({email}).select("+password");
    if(!existsUser){
        throw new ExpressErr(400, 'User not found!');
    }
    
    const isMatched = await bcrypt.compare(password, existsUser.password);
    if(!isMatched){
        throw new ExpressErr(400, 'Invalid Credentials!');
    }
    let payload  = {userId : existsUser._id, email : existsUser.email}
    const token = jwt.sign(payload, process.env.KEY, {expiresIn:"7d"});
    return res.status(200).json({message : "Login Successfully!!" , token : token, user : {
         _id: existsUser._id,
        name: existsUser.name,
        email: existsUser.email,
        role: existsUser.role,
        profilePicture: existsUser.profilePicture
    } });

    
}


export const uploadProfilePicture = async (req,res) =>{

        req.user.profilePicture = req.file.path;
        await req.user.save();
        return res.status(200).json({message : "Profile Picture Saved!"});
   
}




export const getUserAndProfile =  async (req,res) =>{
        const userProfile = await Profile.findOne({userId : req.user._id})
        .populate('userId', 'name email profilePicture gender role');
    
        if(!userProfile){
            throw new ExpressErr(400, "User not found!");
        }
        return res.status(200).json(userProfile);
    
}


export const updateUserProfileData = async(req,res)=>{//check
    const {  name,email,gender,mobile_no,ageGroup ,skinType,skinConcerns,address,} = req.body;
             
        const userData = {
            ...(name !== undefined && {name}),
            ...(email !== undefined && {email}),
            ...(gender !== undefined && {gender}),

        }
        await User.findByIdAndUpdate(req.user._id, userData);

        const profileData = {
            ...(mobile_no !== undefined && {mobile_no}),
            ...(ageGroup !== undefined && {ageGroup}),
            ...(skinType !== undefined && {skinType}),
            ...(skinConcerns !== undefined && { skinConcerns }),
            ...(address !== undefined && {address}),


        }
        const profile_to_update = await Profile.findOne({userId : req.user._id});
        if(!profile_to_update){
            throw new ExpressErr(400, "Profile not found!");
        
        }
        await Profile.findByIdAndUpdate(profile_to_update._id, profileData);
        return res.status(200).json({message:"Profile updated!"});

}





//admin

export const getAllUsers =  async(req,res)=>{  

   const allProfile = await Profile.find({})
   .populate('userId','name username profilePicture gender email role');
   
    const customers = allProfile.filter(profile => profile.userId.role !== "admin")
    return res.status(200).json(customers);
       
}


export const getUserById =  async(req,res)=>{
  const {id} = req.params
  const allProfile = await Profile.findById(id)
 .populate('userId','name username profilePicture gender email');

  if(!allProfile){
    throw new ExpressErr(400, "User not found!");
  }
  return res.status(200).json(allProfile);
    
}


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    await Profile.findByIdAndDelete(id);
    return res.status(200).json({
    message: "Profile and linked user deleted successfully"
    });
};
