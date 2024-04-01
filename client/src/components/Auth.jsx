
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ loguser, setLogUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ password: '', confirmPassword: '', email: '', firstName: '', lastName: '' });

  const Register = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
      .then(res => {
        console.log(res);
        setLogUser({ id: res.data.user._id, email: res.data.user.email });
        localStorage.setItem('userId', res.data.user._id);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const Login = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', loginUser, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setLogUser({ id: res.data.user._id, email: res.data.user.email });
        localStorage.setItem('userId', res.data.user._id);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const [loginUser, setLoginUser] = useState({ email: '', password: '' });

  return (
    <div className="container">
      <h1 className="text-center mb-5">Welcome to Book Club</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Register</h2>
              <form onSubmit={Register}>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Log In</h2>
              <form onSubmit={Login}>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Password" onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

