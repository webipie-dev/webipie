const Product = require('../models/product');
const Store = require('../models/store');
const ApiError = require("../errors/api-error");


exports.getProducts = async (req, res, next) => {
  // I THINK PRODUCTS NEED TO BE INDEXED BY STORE ID
  // We need to check if the store id connected is the same store is provided in the requireAuth
  const query = filterProducts(req);
  const products = await Product.find(query)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });
  res.status(200).send(products);

};


// exports.getManyProductById = async (req, res) =>{
//   //get products ids
//   const { ids } = req.query;
//
//   const products = await Product.find({_id: {$in: ids}})
//     .catch((err) => {
//       res.status(400).json({errors: err.message});
//     });
//
//   res.status(200).send(products);
//
// }

exports.getOneProduct = async (req, res, next) => {
  //get product id
  const { id } = req.params;

  const product = await Product.findById(id)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });
  res.status(200).send(product);

};

exports.addProduct = async (req, res, next) => {
  const url = req.protocol + '://' +req.get('host');
  let images = [];
  //check if there are any images uploaded
  if (req.files)
  {
    req.files.map(fileimg => {
      images.push(url + '/backend/images/' + fileimg.filename)
    });
  }
  else {
    console.log('no files uploaded')
  }

  let { name, description, price, quantity, popular, openReview, storeId } = req.body
  const store = await Store.findById(storeId)

  if (!store) {
    next(ApiError.NotFound('Store Not Found'));
    return;
  }

  // convert the values from strings to booleans
  openReview = openReview === 'true';
  popular = popular === 'true';


  const product = new Product({
    name,
    description,
    imgs: images,
    price,
    quantity,
    popular,
    openReview,
    store
  });

  await product.save();
  res.status(201).send(product);

};

exports.editOneProduct = async (req, res, next) => {
  // separating the id
  const { id } = req.params;
  const product = await Product.findById(id)
  if (!product) {
    next(ApiError.NotFound('Product Not Found'));
    return;
  }

  // separating the updates
  const edits = {};
  for(let key in req.body) {
      if(key !== 'id'){
        edits[key] = req.body[key];
      }
  }

  // adding the images
  const url = req.protocol + '://' +req.get('host');
  let images = [];
  if(req.files){
    if (req.files.length === 0){
      console.log('No images uploaded')
    }
    req.files.map(fileimg => {
      images.push(url + '/backend/images/' + fileimg.filename)
    });
  } else {
    console.log("no files uploaded")
  }

  let bulkQueries = [];
    await bulkQueries.push({
      updateOne: {
        "filter": { _id: id},
        "update":{ $set: edits }
      }
    })
   await bulkQueries.push({
      updateOne: {
        "filter": { _id: id},
        "update": { $addToSet: {imgs: {$each: images} } }
      }
    })

  const productEdited = await Product.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (productEdited){
    if (productEdited.nModified === 0) {
      next(ApiError.NotFound('No Products modified'));
      return;
    }
  }

  res.status(200).send(productEdited);
};


exports.addReview = async (req,res,next) => {
  const {id} = req.params;

  const { name, email, review, rating, date } = req.body;

  const reviewBody = new Object({
    name,
    email,
    review,
    rating,
    date
  })

  const productUpdate = await Product.update({_id: id}, { $push: { reviews: reviewBody } })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (productUpdate){
    if (productUpdate.nModified === 0) {
      next(ApiError.NotFound('No Products modified'));
      return;
    }
  }

  res.status(200).send(review);
};

exports.deleteImage = async (req, res, next) => {
  const { id } = req.params;
  const { url } = req.body

  const product = await Product.findById(id)
  if (!product) {
    next(ApiError.NotFound('Product Not Found'));
    return;
  }

  const productUpdate = await Product.update({_id: id}, {$pull: {imgs: url } })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (productUpdate){
    if (productUpdate.nModified === 0) {
      next(ApiError.NotFound('No Products modified'));
      return;
    }
  }

  res.status(200).send(productUpdate);

}


exports.deleteManyProducts = async (req, res, next) => {
  //get products ids
  const { ids } = req.body;

  const deletedProducts = await Product.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (deletedProducts) {
    if (deletedProducts.deletedCount === 0) {
      next(ApiError.NotFound('No Products found to delete'));
      return;
    }else if (deletedProducts.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Products to be deleted but ${deletedProducts.deletedCount} are found and deleted`));
      return;
    }
  }

  res.status(200).send(deletedProducts);
};

exports.deleteAllProducts = async (req, res, next) => {

  const deletedProducts = await Product.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(deletedProducts);
};



filterProducts = (req => {
  let query = {};
  for (let propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      if (['name', 'description', 'price', 'quantity','popular', 'openReview', 'store'].includes(propName)) {
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


