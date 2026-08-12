import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { login } from '../../config/redux/action/authAction';
import mylogo from '../../assets/images/logo2.jpeg'
import { clearMessage } from '../../config/redux/reducer/productReducer';




export const Login = () => {
  const {isError, isLoading, user} = useSelector((state)=>state.auth);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
      email : '',
      password : ''
  });
 
   function handleInputChange(e){
    const {name, value} = e.target;
     setUserDetails((prev)=>({
        ...prev , [name] :  value
     }))

  }
   
 async function handleLogin(e){
    e.preventDefault();
    setMessage('');
    const result = await dispatch(login(userDetails));
    if(login.fulfilled.match(result)){
        setMessage('login Successfully');
        setUserDetails({
            email : '',
            password : ''
        });

        nav('/');
    }else{
        setMessage(result.payload || "Login failed");
    }
      
  }
  return (
     <div className = 'cardContainer'>
                <div className='registerCard'>
                  <div className='navLogo'>
                  <img src={mylogo} alt="logo_img" /> <span className='span'>sheBeauty</span>
                  </div>
                    <div style={{marginTop : '12px'}}>
                        <h4>LOGIN </h4>
                        <div>
                        {user ? "" :
                        <p className='para'>Don't have an Account? 
                            <span onClick={()=>nav('/signup')} style={{color:"#e75480" , cursor : "pointer"}}>  Signup here</span>
                        </p>
                        }
                    </div>
                            <form onSubmit={handleLogin}>
                    <div className ='inputRow'>
                      
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
                        <button type='submit' className='loginBtn' disabled={isLoading}>
                            {isLoading ? "Loggin in..": "Login"}
                        </button>
                    </div>
                    </div>
                    </form>
                    
                </div>
            </div>  
            </div>
    )
}


