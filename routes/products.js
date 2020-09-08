var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

var Product = require("../models/Product");
var Product = require("../models/Model");

// Get all products
router.get('/', (req, res) => { 
  console.log(Model.tableJavi);
  Model.all(new Product());
  // Product.all().then((result) => {
  //   res.json(result);
  // }).catch((error) => {
  //   res.send(error);
  // }); 
}); 

// Add a product
router.post('/create', (req, res) => {
  var product = Product.newProductWithQuery(req.body);
  Product.create(product).then((result) => {
    product.id = result.insertId;
    delete product['table'];
    res.status(201).json(product);
  }).catch((error) => {
    res.status(500).json(error);
  }); 
});

// Query generator in the body
router.get('/get', function(req, res) {
  var filter;
  if(Object.keys(req.query).length !== 0){
    filter = req.query;
  } else {
    filter = req.body;
  }
  
  Product.get(filter).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Query by barcode in the parameters
router.get('/barcode/:barcode', function(req, res) {
  Product.get(req.params).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Query by id in the parameters
router.get('/:id', function(req, res, next) {
  Product.get(req.params).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Update a product, depending in ID
router.put('/:id', function(req, res, next) {
  res.send('Updating one product');
});

// Deleting a product, depending in ID
router.delete('/:id', function(req, res, next) {
  res.send('Deelting one product');
});

module.exports = router;