const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail, createUser } = require('../model/auth.model');
const { get } = require('../route/auth.route');


const register = async (req, res) => {
    const { email, password, name, role = 'user' } = req.body;
    try{
        // Check if user already exists
        const [existedUser] = await getUserByEmail(email);
        if (existedUser.length > 0) {
            return res.status(400).json({ message: 'User already exists'});
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user into the database
        const [result] = await createUser({ email, password: hashedPassword, name, role });

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertId,
            token: jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' })
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const [user] = await getUserByEmail(email);
        if (user.length === 0) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'User logged in successfully',
            userId: user[0].id,
            token: token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    register,
    login
};