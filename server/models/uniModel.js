// external imports
const mongoose = require('mongoose');

const { Schema } = mongoose;

const uniSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    admissionStart: Date,
    admissionEnd: Date,
    events: [
      {
        title: String,
        date: Date,
        description: String,
      },
    ],
    researchPapers: [
      {
        title: String,
        link: String,
      },
    ],
    sports: [String],
    gallery: [String],
    rating: { type: Number, default: 0 }, // average rating
    numRatings: { type: Number, default: 0 },
    description: String,

    // New reviews array
    reviews: {
      type: [
        {
          user: String,
          comment: { type: String, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const University = mongoose.model('University', uniSchema);
module.exports = University;
