import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css'; 

// Component for displaying the image URL
const ImageUrlComponent = ({ url }) => {
  return (
    <td>
      <img src={url} alt="Book Cover" className="book-cover" style={{ width: '100px', height: '100px' }} />
    </td>
  );
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [uploaderNames, setUploaderNames] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/books', { withCredentials: true })
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch(err => console.log(err));
  }, []); // Removed setBooks from dependency array since it's a state setter

  useEffect(() => {
    const uploaderIds = books.map(book => book.uploader);
    const uniqueUploaderIds = [...new Set(uploaderIds)];

    uniqueUploaderIds.forEach(uploaderId => {
      axios.get(`http://localhost:8000/api/users/${uploaderId}`, { withCredentials: true })
        .then(res => {
          setUploaderNames(prevState => ({
            ...prevState,
            [uploaderId]: res.data.firstName
          }));
        })
        .catch(err => {
          console.error('Error fetching uploader details:', err);
        });
    });
  }, [books]); // Fetch uploader names when books state changes

  return (
    <div className="container">
      <h2 className='allbooks'>All Books</h2>
      <div className="book-list-container">
        <table className="book-list-table">
          <thead>
            <tr>
              <th>Book Cover</th>
              <th>Title</th>
              <th>Description</th>
              <th>Likes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <ImageUrlComponent url={book.imageUrl} />
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.likes}</td>
                <td className="action-cell">
                  <Link to={`/books/${book._id}`} className="btn-light-dark">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
