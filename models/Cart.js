const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course', // Reference to the Course collection
          required: true,
        },
        courseName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        thumbnail: {
          type: String, // URL to the course thumbnail
          required: true,
        },
        ratingAndReviews: {
          type: Array, // Store reviews here, or use a reference to the reviews
          default: [],
        },
        category: {
          type: String, // Category of the course
          required: true,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  });
  
module.exports = mongoose.model('Cart', cartSchema);
  