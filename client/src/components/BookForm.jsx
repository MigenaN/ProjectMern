import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
        title: "",
        description: "",
        state: "favourite",
        uploader: userId
      })

  const addBook = () => {
    axios.post('http://localhost:8000/api/books',form,{ withCredentials: true })
      .then((res) => {
        console.log(res.data);  
      })
      .catch((err) => {
        console.error('Error adding book:', err.response.data);  
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          console.error(err);
        }
      });
      
      
    
  };

  return (
    
    <div className='form'>
        
        <form onSubmit={addBook}>
        {errors && errors.title ? <p>{errors.title} </p> : ""}
          <label>Title: </label>
          <input type="text" name="title" id="title" onChange={(e)=> setForm({...form,title:e.target.value})}/>
          <br />
          {errors.description && <p>{errors.description.message}</p>}
          <label>Description: </label>
          <textarea name="description" id="description" cols="13" rows="5" onChange={(e)=> setForm({...form,description:e.target.value})}/>
          <br />
          <input type="submit" value="Add"/>
        </form>
    </div>
  );
};

export default BookForm;
