import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../config/redux/action/authAction';
import { BASE_URL, clientServer } from '../../config';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const {token, userProfile, isLoading} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name : '',
    mobile_no : '',
    email : '',
    gender : '',
    ageGroup : '',
    skinType : '',
    skinConcerns : [],
    address: '',
  });
     useEffect(()=>{
         async function fetchData(){
             await dispatch(getUserProfile(token));  
          }
          fetchData();
        },[dispatch])
        useEffect(()=>{
          if(userProfile){
            setUserDetails({
              name : userProfile?.userId?.name || '',
              mobile_no : userProfile?.mobile_no || '',
              email : userProfile?.userId?.email|| '',
              gender : userProfile?.userId?.gender || '',
              ageGroup : userProfile?.ageGroup ||  '',
              skinType :userProfile?.skinType || '',
              skinConcerns : userProfile?.skinConcerns || [],
              address: userProfile?.address || '',
              profilePicture : userProfile?.userId?.profilePicture
            });
          }
        },[userProfile]);


const profilePicture = userProfile?.userId?.profilePicture;
const imageUrl =  profilePicture === "default.jpg"
    ? `${BASE_URL}/uploads/default.jpg`
    : profilePicture

  return (
     <div className='profileDetails'>
      <div className="right">
        <form >
  <div className="profileImg">
      <img src={imageUrl} alt="profile"/>
      </div>
      <div className="profileData">
        <div className="field">
    <span>Name</span>
   <input type="text"  placeholder='palak sirari' name='name' value={userDetails.name} readOnly  />
    </div> 
   <div className="field">
    <span>MOBILE NUMBER </span>
   <input type="tel"  placeholder='+91 90XX...' name='mobile_no' value={userDetails.mobile_no} readOnly/>
  
   </div> 
         <div className="field">
    <span>EMAIL </span>
   <input type="text"  placeholder='abc@gmail.com' name='email' value={userDetails.email} readOnly  />
  
   </div> 
  <div className="field">
    <span>GENDER </span>
     <select name="gender" value={userDetails.gender} disabled >
    <option value="" disabled>---SELECT---</option>
    <option value="female">Female</option>
    <option value="male">Male</option>
   </select>
   </div> 
     <div className="field">
    <span>AGE </span>
   <select name="ageGroup" value={userDetails.ageGroup}  disabled>
    <option value="" disabled>---SELECT AGE---</option>
    <option value="under18">under18</option>
    <option value="18-24">18-24</option>
    <option value="25-34">25-34</option>
    <option value="35-44">35-44</option>
    <option value="45+">45+</option>
   </select>
   
   </div> 
   <div className="field">
    <span>SKIN TYPE </span>
    <select name="skinType" value={userDetails.skinType} disabled>
      <option value="" disabled>---SELECT---</option>
      <option value="oily">Oily</option>
      <option value="dry">Dry</option>
      <option value="combination">Combination</option>
      <option value="normal">Normal</option>
      <option value="sensitive">Sensitive</option>
      </select>    
   </div> 
   <div className="field">
    <span>SKIN CONCERN </span>
    <select multiple name="skinConcerns" value={userDetails.skinConcerns} disabled>
    <option value="acne">Acne</option>
    <option value="pigmentation">Pigmentation</option>
    <option value="dark_spot">Dark Spot</option>
    <option value="wrinkles">Wrinkles</option>
    <option value="dryness">Dryness</option>
    <option value="oiliness">Oiliness</option>
    <option value="large_pores">Large pores</option>
    <option value="redness">Redness</option>
    <option value="sensitivity">Sensitivity</option>
    </select>    
   </div> 
     <div className="field">
    <span>ADDRESS</span>
   <input type="text"  placeholder='ADD ADDRESS' name='address' value={userDetails.address} readOnly  />
   </div> 
      </div>
     </form>
      </div>
      <div className="left">
        <h2>Account</h2>
        <p>name</p>
        <h2>Overview</h2>
        <div className='orders'>
          <p>ORDERS</p>
          <p>Orders and RETURNS</p>
        </div>
        <div className='credits'>
          <p>CREDITS</p>
          <p>Coupons</p>
          <p>sheBeauty Credit</p>
          <p>sheCash</p>
        </div>
        <div className='account'>
          <p>ACCOUNT</p>
          <b>Profile</b>
          <p>Saved Card</p>
           <p>UPI/wallet</p>
            <p>Delete Account</p>
        </div>
        <div className='legal'>
          <p>LEGAL</p>
          <p>Terms and Conditions</p>
          <p>Privacy Center</p>
        </div>
      </div>
    </div>
  
  )
}
