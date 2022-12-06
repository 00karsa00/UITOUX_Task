const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const router = require('./src/router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/product', router);

app.listen(8081, () => {
    console.log('Server Start on Port 8081');
})

