const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    uid: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: '', // profile image URL or placeholder
    },
    address: {
      type: String,
      default: '',
    },
    reviews: {
      type: [
        {
          college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
          rating: { type: Number, min: 0, max: 5 },
          comment: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [], // initially empty
    },
    admissions: {
      type: [
        {
          college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
          candidateName: String,
          subject: String,
          candidatePhone: String,
          address: String,
          dob: Date,
          submittedAt: { type: Date, default: Date.now },
        },
      ],
      default: [], // initially empty
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
