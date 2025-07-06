const db = require('../config/db');

const getUserByEmail = (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email]);
}

const createUser = (userData) => {
    const { email, password, name, role } = userData;
    return db.query('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)', [email, password, name, role]);
}

module.exports = {
    getUserByEmail,
    createUser
};