const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const universitiesRoutes = require('./routes/universities');
const userRoute = require('./routes/user');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/', universitiesRoutes);
app.use('/users', userRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
