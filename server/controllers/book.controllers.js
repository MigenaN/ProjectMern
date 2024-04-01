const Book = require('../models/book.models');
const User = require('../models/user.models');
const mongoose = require('mongoose');

module.exports.createBook = (request, response) => {
  // console.log(request.body);
  User.findOne({ _id: request.body.uploader })
    .then(user => {
      Book.create(request.body)
      .then(book => {
        user.books.push(book);
        user.save({ validateBeforeSave: false });
        book.uploader = user;
        book.save({ validateBeforeSave: false });
        // console.log(book, user);
        
      })
      .then(res => response.json(res))
      .catch(err=>response.status(400).json(err))
    })
    // .then(res => response.json(res))
    // .catch(err=>response.status(400).json(err))
  
};

module.exports.getBooks = (request, response) => {
  Book.find()
    .populate('uploader')
    .then(books => response.json(books))
    .catch(err => response.status(400).json(err));
};
module.exports.getBookById = (req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(400).json({ message: 'Book not found' });
        }
        res.json(book);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: 'Server Error' });
      });
  };

module.exports.updateBook = (request, response) => {
  Book.findOne({ _id: request.params.id })
    .then(book => {
      book.title = request.body.title;
      book.description = request.body.description;
      book.save({ validateBeforeSave: false });
      // response.json(book);
    })
    .then(res => response.json(res))
    .catch(err => response.status(400).json(err));
};

// module.exports.likeBook = (request, response) => {
//   Book.findOneAndUpdate(
    
//       {_id: request.params.id},
//       {$inc: {likes: 1}}
//   )
//   .then(() => response.json({msg: "Book liked successfully"}))
//   .catch(err => response.status(400).json(err));
// };
module.exports.likeBook = (request, response) => {
  
  Book.findById(request.params.id)
    .then(book => {
      if (!book) {
        return response.status(404).json({ error: 'Book not found' });
      }
      book.likes += 1;
      return book.save();
    })
    .then(() => response.json({ msg: "Book liked successfully" }))
    .catch(err => response.status(400).json(err));
};

module.exports.deleteBook = (request, response) => {
  Book.findOneAndDelete({ _id: request.params.id })
    .then(book => {
      response.json({ message: 'Book deleted', book: book });
    })
    .catch(err => response.status(400).json(err));
};
