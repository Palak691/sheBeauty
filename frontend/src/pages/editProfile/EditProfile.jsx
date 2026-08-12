import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import {getUserProfile,updateUserProfileData,updateUserProfilePicture
} from '../../config/redux/action/authAction';
import { clearMessage } from '../../config/redux/reducer/reviewReducer';
import { toast } from 'react-toastify';
import { BackButton } from '../../components/backbutton/BackButton';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

export const EditProfile = () => {
  const { token, userProfile} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    mobile_no: '',
    email: '',
    gender: '',
    ageGroup: '',
    skinType: '',
    skinConcerns: [],
    address: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);

  const toastStyle = {
    background: '#ffe4ec',
    color: '#c2185b',
    border: '1px solid #f8bbd0',
    borderRadius: '12px',
    fontWeight: '600',
  };

  const handleInputChange = (e) => {
    const { name, value, multiple, selectedOptions } = e.target;

    if (multiple) {
      const values = [...selectedOptions].map(
        (option) => option.value
      );
      setUserDetails((prev) => ({
        ...prev,
        [name]: values,
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        getUserProfile(token)
      );
    };

    fetchData();
  }, [dispatch,token]);

  useEffect(() => {
    if (userProfile) {
      setUserDetails({
        name: userProfile?.userId?.name || '',
        mobile_no: userProfile?.mobile_no || '',
        email:userProfile?.userId?.email || '',
        gender: userProfile?.userId?.gender || '',
        ageGroup: userProfile?.ageGroup || '',
        skinType: userProfile?.skinType || '',
        skinConcerns: userProfile?.skinConcerns || [],
        address: userProfile?.address || '',
      });
    }
  }, [userProfile]);

  // Update profile picture
  const editProfilePicture = async (file) => {
       setIsUploadingPicture(true);
    try {
      await dispatch(
        updateUserProfilePicture({ token,
         profilePicture: file,
        }));
      await dispatch(
        getUserProfile(token));
      toast.success('Profile picture updated', { style: toastStyle })
    } catch (err) {
      console.log(err);
      toast.error('Could not update profile. Please try again.', { style: toastStyle });
      setIsSaving(false)
    }
  };

  // Update profile data
  const handleEditBtn = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateUserProfileData({
          token,
          userData: userDetails,
        })
      );

      await dispatch(
        getUserProfile(token)
      );

      nav('/profile');
    } catch (err) {
      console.log(err);
    }
  };

 
  const profilePicture = userProfile?.userId?.profilePicture;
 
 const imageUrl =  profilePicture === "default.jpg"
     ? `${BASE_URL}/uploads/default.jpg`
     : profilePicture

  return (
    <div className="profileDetails">

      <div className="right">

        <BackButton />

        <h2 style={{ textAlign: 'center' }}>
          EDIT YOUR PROFILE
        </h2>

        <form onSubmit={handleEditBtn}>

          {/* Profile Picture */}
           <div className="profileImg">
            <img src={imageUrl} alt="profile"/>
            <label htmlFor="profileImg" className="editOverLay">
            <span>{isUploadingPicture ? "Uploading.." : "Edit Profile"}</span>
           </label>

          <input
            type="file" id="profileImg" hidden disabled= {isUploadingPicture} accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                editProfilePicture(e.target.files[0]);
              }}}/>
          </div>

      

          {/* Profile Data */}
          <div className="profileData">

            <div className="field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Palak Sirari"
                value={userDetails.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <span>MOBILE NUMBER</span>
              <input
                type="tel"
                name="mobile_no"
                placeholder="+91 90XX..."
                value={userDetails.mobile_no}
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <span>EMAIL</span>
              <input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <span>GENDER</span>

              <select
                name="gender"
                value={userDetails.gender}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  ---SELECT---
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div className="field">
              <span>AGE</span>

              <select
                name="ageGroup"
                value={userDetails.ageGroup}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  ---SELECT AGE---
                </option>
                <option value="under18">Under 18</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45+">45+</option>
              </select>
            </div>

            <div className="field">
              <span>SKIN TYPE</span>

              <select
                name="skinType"
                value={userDetails.skinType}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  ---SELECT---
                </option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">
                  Combination
                </option>
                <option value="normal">Normal</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>

            <div className="field">
              <span>SKIN CONCERN</span>

              <select multiple name="skinConcerns" value={userDetails.skinConcerns} onChange={handleInputChange}>
                <option value="acne">Acne</option>
                <option value="pigmentation">
                  Pigmentation
                </option>
                <option value="dark_spot">
                  Dark Spot
                </option>
                <option value="wrinkles">Wrinkles</option>
                <option value="dryness">Dryness</option>
                <option value="oiliness">Oiliness</option>
                <option value="large_pores">
                  Large Pores
                </option>
                <option value="redness">Redness</option>
                <option value="sensitivity">
                  Sensitivity
                </option>
              </select>
            </div>

            <div className="field">
              <span>ADDRESS</span>

              <input
                type="text"
                name="address"
                placeholder="ADD ADDRESS"
                value={userDetails.address}
                onChange={handleInputChange}
              />
            </div>

          </div>

          <button type="submit" disabled={isSaving}>
            {isSaving ? "SAVING" : "EDIT"}
          </button>

        </form>
      </div>

      {/* Left Account Menu */}
      <div className="left">

        <h2>Account</h2>
        <p>{userDetails.name}</p>

        <h2>Overview</h2>

        <div className="orders">
          <p>ORDERS</p>
          <p>Orders and RETURNS</p>
        </div>

        <div className="credits">
          <p>CREDITS</p>
          <p>Coupons</p>
          <p>sheBeauty Credit</p>
          <p>sheCash</p>
        </div>

        <div className="account">
          <p>ACCOUNT</p>
          <b>Profile</b>
          <p>Saved Card</p>
          <p>UPI/wallet</p>
          <p>Delete Account</p>
        </div>

        <div className="legal">
          <p>LEGAL</p>
          <p>Terms and Conditions</p>
          <p>Privacy Center</p>
        </div>

      </div>

    </div>
  );
};

