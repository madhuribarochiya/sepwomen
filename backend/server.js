const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// // Routes
// app.use('/api/auth', require('./routes/authRoutes')); // For login/signup
// app.use('/api/forum', require('./routes/forumRoutes')); // Forum routes
// app.use('/api/loan', require('./routes/loanRoutes')); // Loan analytics routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
