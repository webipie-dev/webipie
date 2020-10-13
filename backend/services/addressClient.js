const Client = require('../models/client')
const Address = require('../models/addressClient')
const mongoose = require('mongoose')

exports.getAddresses = (req, res) => {
  const postQuery = Address.find(req.query);
  postQuery
    .then((documents) => {
      res.status(200).json({
        message: 'addresses sent successfully',
        Addresses: documents
      });
    }).catch(err =>{
      res.status(500).json({error: err});
  });
}

exports.getOneAddress = (req, res) => {
  const id = req.params._id;
  Address.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({error: err})
    });
}

exports.addAddress = (req, res) => {
  const address = new Address({
    houseNumber: req.body.houseNumber,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    client: mongoose.Types.ObjectId(req.body.client)
  });

  address
    .save()
    .then(doc =>{
      Client
        .update({_id: doc.client}, {$set: {fullAddress: doc._id}})
        .exec()
        .then(result => {
          res.status(201).json({
            message: 'added with success',
            address: doc,
            client: result
          });
        }).catch(err => {
          res.status(500).json({error: err})
      })
    }).catch(err => {
      res.status(500).json({error: err});
  });
}

exports.deleteAddress = (req, res) => {
  var array = req.params._id;
  Address.deleteMany({
    _id: {
      $in: array
    }
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Addresses deleted'
    });
  }).catch(err => {
    res.status(500).json({error: err});
  });
}
