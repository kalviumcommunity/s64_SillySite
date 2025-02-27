// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routers/routes'); 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('Yaay!!MongoDB connected'))
.catch(err => console.error('Oops !! MongoDB connection failed:', err));

// Routes
app.use('/api', router); // Prefixing routes with '/api'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
