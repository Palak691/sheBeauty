import React, { useEffect } from 'react'
import './Users.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../../../config/redux/action/authAction';
export const Users = () => {
  const {allUsers, token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(()=>{
    dispatch(getAllUsers(token))
  },[dispatch]);

  async function handleDeleteUser(id){
   const res = await dispatch(deleteUser({id,token}));
    if(deleteUser.fulfilled.match(res)){
     await dispatch(getAllUsers(token))
    }
  }
  return (
     <div className="users">
     
            <div className="usersHeading">
                <p>Profile</p>
                <p>Name</p>
                <p>Email</p>
                <p>Gender</p>
                <p>Age Group</p>
                <p>Skin Type</p>
                <p>Mobile</p>
                <p>Joined</p>
                <p>Actions</p>
            </div>

            {allUsers?.map((user) => (

                <div className="userRow" key={user._id}>

                    <img
                        src={user.userId.profilePicture}
                        alt={user.userId.name}
                    />

                    <p>{user.userId.name}</p>

                    <p>{user.userId.email}</p>

                    <p>{user.userId.gender}</p>

                    <p>{user.ageGroup}</p>

                    <p>{user.skinType}</p>

                    <p>{user.mobile_no}</p>

                    <p>
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                    <div className="actions">

                        <button
                            onClick={() => nav(`/admin/users/${user._id}`)}
                        >
                            View
                        </button>

                        <button onClick={()=>handleDeleteUser(user._id)}>
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>
  )
}
