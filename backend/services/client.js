const Client = require('../models/client')
const mongoose = require('mongoose')

exports.getClients = (req, res) => {
  Client.find(req.query)
    .then((documents) => {
      res.status(200).json({
        message: 'clients sent successfully',
        clients: documents
      })
    }).catch(err => {
    res.status(500).json({error: err})
  });
}

exports.getOneClient = (req, res) => {
  const id = req.params._id;
  Client.findById(id)
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

exports.addClient = (req, res) => {
  const client = new Client({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    gender: req.body.gender
  });
  client
    .save()
    .then(doc => {
      res.status(201).json({
        message: 'added with success',
        client: doc
      });
    }).catch(err => {
    res.status(500).json({error: err});
  });
}

exports.deleteClient = (req, res) => {
  var array = req.params._id;
  // console.log(array);
  Client.deleteMany({
    _id: {
      $in: array
    }
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'clients deleted'
    });
  }).catch(err => {
    res.status(500).json({error: err});
  });
}

