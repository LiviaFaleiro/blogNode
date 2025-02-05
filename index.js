const express = require('express');
const app = express();
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const connection = require('./db/db');
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const Article = require('./articles/Article');
const Category = require('./categories/category');

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles =>{
        Category.findAll().then(categories=>{
            res.render('index', {articles: articles, categories: categories});
        })
    })
});

app.get('/:slug', (req, res)=>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    
    }).then(article =>{
        if(article!=undefined){
            Category.findAll().then(categories=>{
                res.render('article', {article: article, categories: categories});
            })        }
        else{
            res.redirect('/');
        }
    }).catch(err=> {
        res.redirect('/');
    })
})
app.get("/category/:slug",(req, res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        }, include : [{model: Article}]
    }).then(category =>{
        if(category!=undefined){
            Category.findAll().then(categories=>{
                res.render('index', {articles: category.articles, categories: categories});
            })
        }
        else{
            res.redirect('/');
        }
    }).catch(err=>{
        res.redirect('/');
    })
})

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection.authenticate()
    .then(() => {
        console.log('conexão feita com sucesso');
    }).catch((error) => {
        console.log(error);
        console.log('erro ao conectar');
    });

app.use('/', categoriesController);
app.use('/', articlesController);

    app.listen(8000, () => {
        console.log('servidor rodando');
    }).on('error', (err) => {
        console.log('Server error:', err);
    });