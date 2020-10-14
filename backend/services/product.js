const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllProducts = (req, res, next) => {
  const query = filterProducts(req);
  // console.log(query);
  Product
    .find(query)
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'success',
        count: docs.length,
        products: docs.map(doc => {
          return doc
        })
      })
    })
    .catch(err =>{
      console.log(err);
      // handle error function
    })
};

exports.getOneProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product
    .findById(productId)
    .exec()
    .then(product => {
      console.log(product);
      if(product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({error: 'not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
};

exports.addProduct = (req, res, next) => {
  const url = req.protocol + '://' +req.get('host');
  var images = [];
  req.files.map(fileimg => {
    images.push(url + '/images/' + fileimg.filename)
  });

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    imgs: images,
    price: req.body.price,
    quantity: req.body.quantity
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'this is a new product',
        newProduct: result
      });
    }).catch(err => {
     console.log('an error happens');
  });
};

exports.editProducts = (req, res, next) => {
  // separating the ids
  const ids = req.body.ids;

  // separating the updates
  const edits = {};
  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)) {
      if(key !== 'ids'){
        edits[key] = req.body[key];
      }
    }
  }

  // adding the images
  const url = req.protocol + '://' +req.get('host');
  var images = [];
  req.files.map(fileimg => {
    images.push(url + '/images/' + fileimg.filename)
  });
  edits['imgs'] = images;

  Product.updateMany({_id: {$in :ids}}, { $set: edits })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        edits: edits,
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

exports.deleteManyProducts = (req, res, next) => {
  const ids = req.body.ids;
  Product.deleteMany({_id: {$in: ids}})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.deleteAllProducts = (req, res, next) => {
  Product.deleteMany({})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

filterProducts = (req => {
  var query = {};
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      if (['name', 'description', 'price', 'quantity'].includes(propName)) {
        query[propName] = req.query[propName];
      } else {
        if (propName === 'minPrice') {
          if(query['price'] === undefined) {
            query['price'] = {}
          }
          query.price['$gt'] = req.query[propName];
        }
        else if (propName === 'maxPrice') {
          if(query['price'] === undefined) {
            query['price'] = {}
          }
          query.price['$lt'] = req.query[propName];
        }
        else if (propName === 'minQuantity') {
          if(query['quantity'] === undefined) {
            query['quantity'] = {}
          }
          query['quantity']['$gt'] = req.query[propName]
        }
        else if (propName === 'maxQuantity') {
          if(query['quantity'] === undefined) {
            query['quantity'] = {}
          }
          query['quantity']['$lt'] = req.query[propName]
        }
      }
    }
  }
  return query;
});


