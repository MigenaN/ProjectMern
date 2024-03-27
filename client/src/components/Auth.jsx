import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Auth = ({loguser,setLogUser}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ password: '', confirmPassword: '', email: '', firstName: '', lastName: ''});
    const [loginUser, setLoginUser] = useState({ email: '', password: ''});
    const Register = (e) => {

        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
        .then(res => {
            console.log(res)
            
            setLogUser({id:res.data.user._id,email:res.data.user.email});
            localStorage.setItem('userId', res.data.user._id);
            window.location.href = '/';
            

        })
        .catch(err => console.log(err));
    };
    const LogIn = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', loginUser, { withCredentials: true })
        .then(res => {
            console.log(res.data)
            setLogUser({id:res.data.user._id,email:res.data.user.email});
            localStorage.setItem('userId', res.data.user._id);
            window.location.href = '/';
            
        })
        .catch(err => console.log(err));
    }
  
    return (
        <div>
            <h1>Welcome to Book Club</h1>
    <div className='d-flex2'>
        <div className='cart'>
            <h1>Register</h1>
            <form onSubmit={Register}>
                <input type="text" placeholder="FirstName" onChange={(e)=>setUser({...user,firstName:e.target.value})}required /><br />
                <input type="text" placeholder="LastName" onChange={(e)=>setUser({...user,lastName:e.target.value})} required/><br />
                <input type="email" placeholder="Email" onChange={(e)=>setUser({...user,email:e.target.value})} required/><br />
                <input type="password" placeholder="Password" onChange={(e)=>setUser({...user,password:e.target.value})}required /><br />
                <input type="password" placeholder="Confirm Password" onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}required /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        <div className='cart'>
            <h1>Log In</h1>
            <form onSubmit={LogIn}>
                <input type="email" placeholder="Email" onChange={(e)=>setLoginUser({...loginUser,email:e.target.value})}required /><br />
                <input type="password" placeholder="Password" onChange={(e)=>setLoginUser({...loginUser,password:e.target.value})} required/><br />
                <button type="submit">Log In</button>
            </form>
        </div>
    </div>
    </div>
  );
}
export default Auth;