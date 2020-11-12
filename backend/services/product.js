const Product = require('../models/product');
const Store = require('../models/store');
const mongoose = require('mongoose');

exports.getProducts = (req, res, next) => {
  const query = filterProducts(req);
  // console.log(query);
  Product
    .find(query)
    .exec()
    .then(docs => {
      res.status(200).json({
        message: 'success',
        count: docs.length,
        products: docs
      })
    })
    .catch(err =>{
      console.log(err);
      // handle error function
    })
};

exports.getManyProductById = (req, res) =>{
  console.log(req.query)
  const productId = req.query.ids;
  Product
    .find({_id: {$in: productId}})
    .exec()
    .then(product => {
      if(product) {
        res.status(200).json({
          message: 'products fetched successfully',
          count: product.length,
          product: product
        });
      } else {
        res.status(404).json({error: 'not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}

exports.getOneProduct = (req, res, next) => {
  const productId = req.params.id;
  Product
    .findById(productId)
    .exec()
    .then(product => {
      if(product) {
        res.status(200).json({
          message: 'product fetched successfully',
          product: product
        });
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
  console.log(req.body)
  var images = [];
  if (req.files)
  {
    console.log(req.files)
    req.files.map(fileimg => {
      images.push(url + '/backend/images/' + fileimg.filename)
    });
  }
  else {
    console.log('no files uploaded')
  }


  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    imgs: images,
    price: req.body.price,
    quantity: req.body.quantity,
    store: req.body.store
  });

  product
    .save()
    .then(result => {
      Store
        .updateOne({ _id : result.store}, {$push: {products: result._id}})
        .exec()
      res.status(201).json({
        message: 'this is a new product',
        newProduct: result
      });
    }).catch(err => {
     console.log(err);
  });
};

exports.editOneProduct = (req, res, next) => {
  // separating the ids
  const ids = req.body.ids;
  console.log(req.body)

  // separating the updates
  const edits = {};
  for(var key in req.body) {
      if(key !== 'ids'){
        edits[key] = req.body[key];
      }
  }

  // adding the images
  const url = req.protocol + '://' +req.get('host');
  var images = [];
  if(req.files.length > 0){
    req.files.map(fileimg => {
      images.push(url + '/backend/images/' + fileimg.filename)
    });
    // edits['imgs'] = images;
  } else {
    console.log("no files uploaded")
  }

  let bulkQueries = [];
    bulkQueries.push({
      updateOne: {
        "filter": { _id: ids},
        "update":{ $set: edits }
      }
    })
    bulkQueries.push({
      updateOne: {
        "filter": { _id: ids},
        "update": { $addToSet: {imgs: {$each: images} } }
      }
    })
  Product
    .bulkWrite(bulkQueries, {ordered: false})
    .then(result => {
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
  const ids = req.body;
  Product.find({_id: {$in: ids}})
    .then((products) => {
      Product.deleteMany({_id: {$in: ids}})
        .exec()
        .then(result => {
          let bulkQueries = [];
          products.map(product => {
            bulkQueries.push({
              updateOne: {
                "filter": { _id: product.store},
                "update":{$pull: {products: product._id}}
              }
            })
          });
          Store
            .bulkWrite(bulkQueries, {ordered: false})

          res.status(200).json({
            result: result,
            productsDeleted: products
          });
        })
    })
    .catch(err => {
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


