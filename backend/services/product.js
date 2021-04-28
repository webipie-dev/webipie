const Product = require('../models/product');
const Store = require('../models/store');
const ApiError = require("../errors/api-error");


const getProducts = async (req, res, next) => {
  if(!req.query.store){
    return next(ApiError.BadRequest('you have to pass the storeID'));
  }

  const query = filterProducts(req);
  const products = await Product.find(query)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(products);
};

// const getSearch = async (req, res, next) => {
//   const store = req.query.store;
//   const searchTerm = req.params.searchTerm;

//   if(!store){
//     return next(ApiError.BadRequest('you have to pass the storeID'));
//   }

//   const products = await Product.find({
//     store, 
//     $or:[
//       {name: { "$regex": searchTerm.toLowerCase(), "$options": "i" }}, 
//       {description: { "$regex": searchTerm.toLowerCase(), "$options": "i" }}
//     ]
//   })
//     .catch((err) => {
//       res.status(400).json({errors: [{ message: err.message }]});
//     });

//   res.status(200).send(products);
// };


const getOneProduct = async (req, res, next) => {
  //get product id
  const { id } = req.params;

  const product = await Product.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });
  res.status(200).send(product);

};

const getManyProductById = async (req, res, next) => {
  let { ids } = req.query
  ids = JSON.parse(ids)
  for(var property in ids[0]) {
    // console.log(property + "=" + ids[0][property]);
  }

  // const products = await Product.find({_id: {$in: ids}})
  //   .catch((err) => {
  //     res.status(400).json({errors: [{ message: err.message }]});
  //   });
  //
  // if(products.length !== ids.length){
  //   next(ApiError.NotFound('Products Not Found'));
  //   return;
  // }
  //
  // res.status(200).send(products);
}


const addProduct = async (req, res, next) => {
  let { name, description, price, quantity, imgs, status, popular, openReview, storeId } = req.body

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
    imgs,
    price,
    quantity,
    status,
    popular,
    openReview,
    store
  });

  await product.save();
  res.status(201).send(product);

};

const editOneProduct = async (req, res, next) => {

  // separating the id
  const { id } = req.params;
  const product = await Product.findById(id)
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (!product) {
    next(ApiError.NotFound('Product Not Found'));
    return;
  }

  const { imgs , deletedImages } = req.body;


  //separating the updates
  const edits = {};
  for(let key in req.body) {
      if(key !== 'imgs' && key !== 'deletedImages'){
        edits[key] = req.body[key];
      }
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
        "update": { $addToSet: {imgs: {$each: imgs} } }
      }
    })
  await bulkQueries.push({
    updateOne: {
      "filter": { _id: id},
      "update": { $pull : {imgs: {$in: deletedImages}}}
    }
  })

  const productEdited = await Product.bulkWrite(bulkQueries, {ordered: false})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  // set status to out of stock
  await Product.updateMany({quantity: {$lte: 0}}, {status: 'out of stock'})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  res.status(200).send(productEdited);
};


const addReview = async (req,res,next) => {
  const {id} = req.params;

  const { name, email, review, rating} = req.body;

  const reviewBody = {
    name,
    email,
    review,
    rating,
    date: Date.now()
  };

  const productUpdate = await Product.updateOne({_id: id}, { $push: { reviews: reviewBody } })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (productUpdate){
    if (productUpdate.nModified === 0) {
      next(ApiError.NotFound('No Products modified'));
      return;
    }
  }

   // send notification
   const io = req.app.get('socketio');
   io.emit('new review', productUpdate);

  res.status(200).send(review);

};

const deleteImage = async (req, res, next) => {
  const { id } = req.params;
  const { url } = req.body

  const product = await Product.findById(id)
  if (!product) {
    next(ApiError.NotFound('Product Not Found'));
    return;
  }

  const productUpdate = await Product.update({_id: id}, {$pull: {imgs: url } })
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
    });

  if (productUpdate){
    if (productUpdate.nModified === 0) {
      next(ApiError.NotFound('No Products modified'));
      return;
    }
  }

  res.status(200).send(productUpdate);

}


const deleteManyProducts = async (req, res, next) => {
  //get products ids
  const { ids } = req.body;

  const deletedProducts = await Product.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
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

const deleteAllProducts = async (req, res, next) => {

  const deletedProducts = await Product.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: [{ message: err.message }]});
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



module.exports = {
  getProducts,
  getOneProduct,
  getManyProductById,
  addProduct,
  addReview,
  editOneProduct,
  deleteAllProducts,
  deleteImage,
  deleteManyProducts
};
