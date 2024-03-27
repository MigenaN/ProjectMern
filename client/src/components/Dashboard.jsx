import React from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import LogOut from "./LogOut";
import './style.css'

const Dashboard = () => {
  
  return (
    <div className='container'>
      <div className='d-flex' >
      <h2>Welcome</h2>
      <LogOut/>
      </div>
      <div className='d-flex1'>
      <BookForm />
      <BookList/>
      </div>
    </div>
  );
};

export default Dashboard;