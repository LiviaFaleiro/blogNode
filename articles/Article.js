const sequelize = require('sequelize');
const connection = require('../db/db');
const Category = require('../categories/category');

const Article = connection.define('articles', {
    title: {
        type: sequelize.STRING,
        allowNull: false
    }, slug: { //ENDERECO CATEGORIA
        type: sequelize.STRING,
        allowNull: false
    }
    ,body: {
        type: sequelize.TEXT,  //conteudo
        allowNull: false
        }
});
Article.belongsTo(Category); //um artigo pertence a uma categoria
Category.hasMany(Article); //uma categoria tem muitos artigos           


module.exports = Article;