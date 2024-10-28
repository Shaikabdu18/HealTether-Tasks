const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authController = require("../controllers/authController")

const router = express.Router();

// Register
router.post('/register',authController.register )

// Login
router.post('/login', authController.login)

module.exports = router;
