const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tile is required"]
  },
  description: {
    type: String,
    minlength: 5,
    required: [true, "Description must be 5 characters long"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
    
  },
  imageUrl: {
    type: String,
    required: true
  },
  
  uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  }, { timestamps: true });
    


module.exports = mongoose.model('Book', bookSchema);
