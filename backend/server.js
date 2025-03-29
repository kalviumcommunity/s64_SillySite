const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/mysqlDb'); 
const mongoRoutes = require('./routers/UserRoutes');
const mysqlRoutes = require('./routers/UserSQLRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// MySQL Connection
sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .catch(err => console.error('❌ MySQL connection failed:', err));

sequelize.sync({ alter: true }) 
  .then(() => console.log('✅ MySQL tables synced'))
  .catch(err => console.error('❌ MySQL sync failed:', err));

// Routes
app.use('/api/mongo', mongoRoutes); 
app.use('/api/mysql', mysqlRoutes); 

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
