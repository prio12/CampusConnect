const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
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
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      default: null, // user may choose later
    },
    address: {
      type: String,
      default: '',
    },
    myColleges: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'College',
      default: [], // initially empty
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
          candidateEmail: String,
          candidatePhone: String,
          address: String,
          dob: Date,
          image: String,
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
