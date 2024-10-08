const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');
require('dotenv').config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URL);

const database = mongoose.connection;

database.on("error",(err)=>{
  console.log("Connection Error",err.message);
})

database.on("connected",()=>{
  console.log("Successfully DB Connected");
  
})

app.listen(4000,()=>{
  console.log("Server Starts at Port 4000");
  
})