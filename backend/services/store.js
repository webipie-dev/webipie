const Store = require('../models/store')
const Product = require('../models/store')

// getAndFilter
exports.getStores = (req, res) => {
  Store.find(req.query)
    .then((documents) => {
      res.status(200).json({
        message: 'Stores sent successfully',
        stores: documents
      })
    }).catch(err => {
    res.status(500).json({error: err})
  });
}


exports.getOneStore = (req, res) => {
  //get store id
  const id = req.params._id;
  Store.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({error: err})
    });
}

exports.addStore = (req, res) => {
  //check if a logo is uploaded
  let logo;
  if (req.file) {
    logo = req.protocol + "://" + req.get("host") + "/images/logos" + req.file.filename
  } else {
    logo = ''
  }

  const store = new Store({
    name: req.body.name,
    logo: logo,
    description: req.body.description,
    location: req.body.location,
    storeType: req.body.storeType,
    contact: req.body.contact,
    products: req.body.products

  });
  store
    .save()
    .then(doc => {
      res.status(201).json({
        message: 'added with success',
        store: doc
      });
    }).catch(err => {
    res.status(500).json({error: err});
  });
}

exports.deleteOneStore = (req, res, next) => {
  // console.log(req.body)
  const ids = req.body.ids;
  // console.log(ids)
  Store.find({_id: {$in: ids}})
    .then((store) => {
      Store.deleteOne({_id: {$in: ids}})
        .exec()
        .then(result => {
          let bulkQueries = [];
          store.products.map(product => {
            bulkQueries.push({
              deleteOne: {
                "filter": {_id: product},
              }
            })
          });
          Product
            .bulkWrite(bulkQueries, {ordered: false})
          res.status(200).json({
            message: 'deleted with success',
            store: store
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({error: err});
        });
    });
}

exports.deleteAllStores = (req, res, next) => {
  Store.deleteMany({})
    .exec()
    .then(result => {

      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.editStore = (req, res, next) => {
  // separating the ids
  const ids = req.body.ids;
  console.log(ids)

  if (req.file) {
    logo = req.protocol + "://" + req.get("host") + "/images/logos" + req.file.filename
  } else {
    logo = ''
  }

  // separating the updates
  const edits = {};
  edits['logo'] = logo
  for (var key in req.body) {
    if (key !== 'ids') {
      edits[key] = req.body[key];

    }
  }

  Store.updateMany({_id: {$in: ids}}, {$set: edits})
    .exec()
    .then(result => {
      res.status(200).json({
        edits: edits,
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
};



