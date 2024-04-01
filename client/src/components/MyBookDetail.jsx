import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import LogOut from "./LogOut";

const MyBookDetail = ({ userId }) => {
  const [book, setBook] = useState(null);
  const [uploaderName, setUploaderName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}`, { withCredentials: true })
      .then(res => {
        setBook(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImageUrl(res.data.imageUrl);
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
    <div className="container mt-4">
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h2><strong>Welcome to Book Club</strong></h2>
        <div>
          <Link to='/' className="btn btn-secondary me-2">Go Back to Dashboard</Link>
          <LogOut/>
        </div>
      </div>
      <Card>
        <Card.Body>
          {error && <p>{error}</p>}
          {book && (
            <div className="d-flex">
              {imageUrl && <img src={imageUrl} alt="Book cover" className="img-fluid me-3" style={{ maxWidth: '300px' }} />} 
              <div style={{ textAlign: 'left' }}>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Description: {book.description}</Card.Text>
                <Card.Text>Uploader: {uploaderName}</Card.Text>
                <Card.Text>Date Added: {new Date(book.createdAt).toLocaleString()}</Card.Text>
                <Card.Text>Last Updated: {new Date(book.updatedAt).toLocaleString()}</Card.Text>
                <Card.Text>Likes: {book.likes}</Card.Text>
                <Button onClick={handleLikeBook} variant="primary">Like this book</Button>
                

              </div>
            </div>
          )}
          {book && book.uploader === userId && (
            <Form onSubmit={handleEdit} className="mt-3">
              <Form.Group controlId="editTitle">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="editDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </Form.Group>
              <Button type="submit" variant="primary" className="me-2">Edit</Button>
              <Link to='/'><Button onClick={handleDelete} variant="danger">Delete</Button></Link>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyBookDetail;
