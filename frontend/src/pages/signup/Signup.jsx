import React, { useEffect, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { signup } from '../../config/redux/action/authAction';
import mylogo from '../../assets/images/logo2.jpeg'


export const Signup = () => {
  const {isLoading, isError} = useSelector((state)=>state.auth); 
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    name : '',
    email : '',
    password : ''
  });
 function handleInputChange(e){
    const {name, value} = e.target;
     setUserDetails((prev)=>({
        ...prev , [name] :  value
     }));

  }
   

  async function handleSignup(e){
  e.preventDefault()
  setMessage('')
    const result = await dispatch(signup(userDetails));
    if(signup.fulfilled.match(result)){
       setMessage("Registered SuccessFully")
        setUserDetails({
            name : '',
            email : '',
            password : ''
        })
        // nav('/login');
        setTimeout(() => {
  nav('/login');
}, 1000);
    }else{
        setMessage(result?.payload || "Signup failed")
    } 

  }
  return (
     <div className = 'cardContainer'>
                <div className='registerCard'>
                     <div className='navLogo'>
                    <img src={mylogo} alt="" /><span className='span'>sheBeauty</span>
                    </div>
                    <div>
                         <div>
                        <p className='para'>Already have an Account? 
                            <span onClick={()=>nav('/login')} style={{color:"#e75480", cursor:"pointer"}}> Login here.</span>
                        </p>
                    </div>
                        <form onSubmit={handleSignup}>
                         
                    <div className ='inputRow'>
                        <div className='input'>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input type="text" id='name' className='inputField' name="name" value={userDetails.name}
                                onChange={handleInputChange} placeholder='name' required />

                        </div>
                    </div>
                    <div className='input'>
                        <label htmlFor="email"> Email</label>
                        <br />
                        <input type="email" id='email' className='inputField' name="email" value={userDetails.email}
                            onChange={handleInputChange} placeholder='abc@gmail.com' required />
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" id='password' name="password" value={userDetails.password}
                            className='inputField' onChange={handleInputChange} placeholder='***********' required />
                    </div>   
                       {message && (
                      <p className={isError ? "errorMessage" : "successMessage"}>
                        {message}
                         </p>
                        )}                      
                    <div>
                        <button className='loginBtn' type='submit' disabled={isLoading} >
                            {isLoading ? 'Signing up...' : "Signup"}
                        </button>

                    </div>
                    </form>
                    </div>
                   
                </div>
            </div>  
    
  )
}
