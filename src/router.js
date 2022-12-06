const express = require('express');
const router = express.Router();
const service = require('./service');

router.post('/postProduct', (req, res) => {
    service.postProduct(req.body, (result) => {
       res.send(result)
    });
});

router.get('/getAllProduct', (req, res) => {
  service.getAllProduct(req, (result) => {
     res.send(result)
  });
});

router.post('/searchAndFilterProduct', (req, res) => {
  service.searchAndFilterProduct(req, (result) => {
     res.send(result)
  });
});

 
module.exports = router;