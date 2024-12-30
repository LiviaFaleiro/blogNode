const sequelize = require('sequelize');
const connection = require('../db/db');

const Category = connection.define('categories', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    }, slug: { //ENDERECO CATEGORIA
        type: sequelize.STRING,
        allowNull: false
    }
});
model.exports = Category;