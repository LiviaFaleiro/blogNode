const express = require('express');
const app = express();
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const connection = require('./db/db');

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.render('index');
});

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

    app.listen(8000, () => {
        console.log('servidor rodando');
    }).on('error', (err) => {
        console.log('Server error:', err);
    });