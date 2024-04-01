import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BookForm = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "" 
  });

  const addBook = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/books', { ...form, uploader: userId }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate('/');
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
    <div className='container'>
      <Link to="/">
        <span>Back to Dashboard</span>
      </Link>
      <div className="container">
        <h3>Add a new Book</h3>
        <form onSubmit={addBook}>
          {/* Input field for image URL */}
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL:</label>
            <input type="text" className="form-control" id="imageUrl" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          </div>
          {/* Rest of the form remains the same */}
          {errors && errors.title ? <p>{errors.title}</p> : ""}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" className="form-control" id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          {errors && errors.description ? <p>{errors.description.message}</p> : ""}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea className="form-control" id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} cols="13" rows="5"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
