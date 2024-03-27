import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css'


const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/books',{ withCredentials: true })
      .then(res => {
        console.log(res.data)
        setBooks(res.data);
      })
      .catch(err => console.log(err))
        console.log("useEffect")
    }, [setBooks]);
    
 

  return (
    <div className='form'>
      <h2 className='allbooks'>All Books</h2>
      <ul>
        {books.map((book, index) => (
          <div className="item" key={index}>
            <Link to={`/books/${book._id}`}>{book.title} </Link>
              |
            <Link to={`/books/${book._id}`}>{book.description}</Link>
           
        </div>
        ))}
      </ul>
    </div>
  );
};

export default BookList;






