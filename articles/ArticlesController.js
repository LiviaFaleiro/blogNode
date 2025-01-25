const express = require('express');
const router = express.Router();
const Category = require('../categories/category');
const Article = require('./Article');
const slugify = require('slugify');


router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles});
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    });
});
router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.categoria;

    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: category
    }).then(() =>{
        res.redirect("/admin/articles");
    })
    
});
router.post('/articles/delete',(req,res)=>{
    var id = req.body.id;
    if(id!=undefined){
        if(!isNaN(id)){
            Article.destroy({
                where:{
                    id:id
                }
                }).then(() =>{
                res.redirect('/admin/articles');
                })
        }
        else{ //isnt a number
            res.redirect('/admin/articles');
        }
    }
    else{ //null
        res.redirect('/admin/articles');
    }
})
router.get("/admin/articles/edit/:id", (req, res) => {
    const id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {
                    article: article,
                    categories: categories
                });
            });
        }
    });
});
router.post('/articles/update',(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title: title, body: body, categoryId: category, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/articles');
    }).catch(err =>{
        res.redirect('/');
    })
})

module.exports = router;