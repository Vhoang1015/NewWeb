const db = require('../config/db');

const getAllProducts = () => {
    return db.query('SELECT * FROM products')
};
const getProductByID = (productId) => {
    return db.query('SELECT * FROM products WHERE id = ?', [productId]);
};

const deleteProducts = (productId) => {
    return db.query('DELETE FROM products WHERE id = ?', [productId]);
};

module.exports = {
    getAllProducts,
    getProductByID,
    deleteProducts
};
// Note: The above code assumes that the 'products' table exists in your database with appropriate columns.