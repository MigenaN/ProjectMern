import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';
import LogOut from "./LogOut";


const MyBookDetail = ({ userId }) => {
  const [book, setBook] = useState(null);
  const [uploaderName, setUploaderName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}`, { withCredentials: true })
      .then(res => {
        setBook(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        fetchUploaderName(res.data.uploader); 
      })
      .catch(err => {
        setError('Error fetching book details');
        console.error(err);
      });
  }, [id]);

  const fetchUploaderName = (uploaderId) => {
    axios.get(`http://localhost:8000/api/users/${uploaderId}`, { withCredentials: true })
      .then(res => {
        setUploaderName(res.data.firstName); 
      })
      .catch(err => {
        console.error('Error fetching uploader details:', err);
      });
  };

  const handleEdit = () => {
    axios.patch(`http://localhost:8000/api/books/${id}`, { title, description }, { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError('Error editing the book');
        console.error(err);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`http://localhost:8000/api/books/${id}`, { withCredentials: true })
        .then(() => {
          navigate('/');
        })
        .catch(err => {
          setError('Error deleting book');
          console.error(err);
        });
    }
  };

  const handleLikeBook = () => {
    axios.put(`http://localhost:8000/api/books/${id}/like`, {}, { withCredentials: true })
      .then(() => {
        
        axios.get(`http://localhost:8000/api/books/${id}`, { withCredentials: true })
          .then(res => {
            setBook(res.data);
          })
          .catch(err => {
            setError('Error fetching book details after liking');
            console.error(err);
          });
      })
      .catch(err => {
        setError('Error liking the book');
        console.error(err);
      });
  };

  return (
    <div>
      <div className='d-flex' >
        <h2>Welcome to Book Club</h2>
        <Link to='/'>Go Back to Dashboard</Link>
        <LogOut/>
      </div>
      <div className='cart1'>
        {error && <p>{error}</p>}
        {book && (
          <div>
            <h2>{book.title}</h2>
            <p>Description: {book.description}</p>
            <p>Uploader: {uploaderName}</p>
            <p>Date Added: {new Date(book.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(book.updatedAt).toLocaleString()}</p>
            <p>Likes: {book.likes}</p>
            <button onClick={handleLikeBook}>Like this book</button>
            {book.uploader === userId && (
              <form onSubmit={handleEdit}>
                <p>
                  <label>Title:</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </p>
                <p>
                  <label>Description:</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </p>
                <button type="submit">Edit</button>
                <Link to='/'><button onClick={handleDelete}>Delete</button></Link>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookDetail;




