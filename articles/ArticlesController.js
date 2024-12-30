const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
    res.send('artigos rota');
});
router.get('/admin/articles/new', (req, res) => {
    res.send('criar artigo');
});

module.exports = router;