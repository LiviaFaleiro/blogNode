const sequelize = require('sequelize');
const connection = require('../db/db');

const Article = connection.define('articles', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    }, slug: { //ENDERECO CATEGORIA
        type: sequelize.STRING,
        allowNull: false
    }
    ,body: {
        type: sequelize.TEXT,
        allowNull: false
        }
});
model.exports = Article;