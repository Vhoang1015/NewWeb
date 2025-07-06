const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth.controller');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth.middleware');



// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected routes
router.use(verifyToken);
router.get('/admin', isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin' });
});
router.get('/user', isUser, (req, res) => {
    res.json({ message: 'Welcome User' });
});

module.exports = router;