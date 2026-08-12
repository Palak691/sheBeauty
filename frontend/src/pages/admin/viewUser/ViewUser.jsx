import React, { useEffect } from 'react'
import './ViewUser.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../../config/redux/action/authAction';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../../components/backbutton/BackButton';

//skinConcern not coming
export const ViewUser = () => {
    const {adminUser, token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const {id} = useParams();
     useEffect(()=>{
       dispatch(getUserById({id,token}))
     },[id, dispatch])
      if (!adminUser) {
        return <h2>Loading...</h2>;
    }
  return (
     <div className="viewUser">
         <BackButton/>

            <div className="userProfile" >

                <img
                    src={adminUser.userId?.profilePicture}
                    alt={adminUser.userId?.name}
                />

                <div className="userBasicInfo">
                    <h2>{adminUser.userId?.name}</h2>
                    <p>{adminUser.userId?.email}</p>
                </div>

            </div>

            <div className="userDetails">

                <div className="detailCard">
                    <h4>Gender</h4>
                    <p>{adminUser.userId?.gender}</p>
                </div>

                <div className="detailCard">
                    <h4>Age Group</h4>
                    <p>{adminUser.ageGroup}</p>
                </div>

                <div className="detailCard">
                    <h4>Skin Type</h4>
                    <p>{adminUser.skinType}</p>
                </div>

                <div className="detailCard">
                    <h4>Skin Concerns</h4>
                    <p>
                        {adminUser.skinConcerns?.length > 0
                            ? adminUser.skinConcerns.join(", ")
                            : "None"}
                    </p>
                </div>

                <div className="detailCard">
                    <h4>Mobile Number</h4>
                    <p>{adminUser.mobile_no}</p>
                </div>

                <div className="detailCard">
                    <h4>Address</h4>
                    <p>{adminUser.address}</p>
                </div>

                <div className="detailCard">
                    <h4>Wishlist</h4>
                    <p>{adminUser.wishList?.length} Products</p>
                </div>

                <div className="detailCard">
                    <h4>Joined</h4>
                    <p>
                        {new Date(adminUser.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="detailCard">
                    <h4>Last Updated</h4>
                    <p>
                        {new Date(adminUser.updatedAt).toLocaleDateString()}
                    </p>
                </div>

            </div>

        </div>
  )
}
