const Client = require('../models/client')
const mongoose = require('mongoose')

// getAndFilter
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

exports.getManyClientById = (req, res) =>{
  const clientId = req.query.ids;
  Client
    .find({_id: {$in: clientId}})
    .exec()
    .then(client => {
      if(client) {
        res.status(200).json({
          message: 'clients fetched successfully',
          count: client.length,
          client: client
        });
      } else {
        res.status(404).json({error: 'not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
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
    gender: req.body.gender,
    fullAddress: req.body.fullAddress
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

exports.deleteManyClients = (req, res, next) => {
  // console.log(req.body)
  const ids = req.body;
  // console.log(ids)
  Client.deleteMany({_id: {$in: ids}})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.deleteAllClients = (req, res, next) => {
  Client.deleteMany({})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.editClient = (req, res, next) => {
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

  Client.updateMany({_id: {$in :ids}}, { $set: edits })
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


