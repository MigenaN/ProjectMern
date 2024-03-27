const BookController = require('../controllers/book.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/books', authenticate, BookController.getBooks);
    app.get('/api/books/:id', authenticate, BookController.getBookById);
    app.post('/api/books', authenticate, BookController.createBook);
    app.put('/api/books/:id/like', authenticate, BookController.likeBook);
    app.patch('/api/books/:id', authenticate, BookController.updateBook);
    app.delete('/api/books/:id', authenticate, BookController.deleteBook);
}
