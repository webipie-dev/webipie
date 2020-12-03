const Client = require('../models/client')

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

//getManyClients
exports.getManyClientById = (req, res) =>{
  //get clients ids
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

//getOneClient
exports.getOneClient = (req, res) => {
  //get client id
  const id = req.params._id;
  Client.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({error: err})
    });
}

//addOneClient
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


//deleteManyClients
exports.deleteManyClients = (req, res, next) => {
  //get clients ids
  const ids = req.body;
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


//deleteAllClients
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

//editManyClients
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


