const Store = require('../models/store')
const mongoose = require('mongoose')

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
  const id = req.params._id;
  Store.findById(id)
    .exec()
    .then(doc => {
      // console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json({error: err})
    });
}

exports.addStore = (req, res) => {
  const store = new Store({
    name: req.body.name,
    logo: req.body.logo,
    description: req.body.description,
    location: req.body.location,
    storeType: req.body.storeType,
    contact: req.body.contact,

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

exports.deleteManyStores = (req, res, next) => {
  // console.log(req.body)
  const ids = req.body.ids;
  // console.log(ids)
  Store.deleteMany({_id: {$in: ids}})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

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

  // separating the updates
  const edits = {};
  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)) {
      if(key !== 'ids'){
        edits[key] = req.body[key];
      }
    }
  }

  Store.updateMany({_id: {$in :ids}}, { $set: edits })
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


