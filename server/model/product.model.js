const db = require('../config/db');

const getAllProducts = () => {
    return db.query('SELECT * FROM products')
};

const deleteProducts = (productId) => {
    return db.query('DELETE FROM products WHERE id = ?', [productId]);
};

module.exports = {
    getAllProducts,
    deleteProducts
};