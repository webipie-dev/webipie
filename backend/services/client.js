
const Client = require('../models/client')
const Store = require('../models/store')
const Order = require('../models/order')
const { validationResult } = require('express-validator')

// FilterClients
exports.getClients = async (req, res) => {

  // I THINK CLIENTS NEED TO BE INDEXED BY STORE ID
  // We need to check if the store id connected is the same store is provided in the requireAuth

  // get the store_id from the request
  const storeID = req.user.storeID;

  // add the store_id to the query 
  req.query.store = storeID;

  const clients = await Client.find(req.query)
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(200).send(clients);

}

//getManyClients
// exports.getManyClientById = (req, res) =>{
//   //get clients ids
//   const clientId = req.query.ids;
//   Client
//     .find({_id: {$in: clientId}})
//     .exec()
//     .then(client => {
//       if(client) {
//         res.status(200).json({
//           message: 'clients fetched successfully',
//           count: client.length,
//           client: client
//         });
//       } else {
//         res.status(404).json({error: 'not found'});
//       }
//     })
//     .catch(err => {
//       res.status(500).json({error: err});
//     });
// }

//getOneClient
exports.getOneClient = async (req, res) => {

  // We need to check if the store id connected is the same store is provided in the params

  //get client id
  const { id } = req.params;

  const client = await Client.findById(id).populate('order')
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(200).send(client);

}

//addOneClient
exports.addClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, phoneNumber, email, gender, fullAddress, storeId} = req.body

  const store = await Store.findById(storeId)

  if (!store) {
    throw new Error('Store Not Found')
  }


  const client = new Client({
    firstname,
    lastname,
    phoneNumber,
    email,
    gender,
    fullAddress,
    store: storeId
  });

  const savedClient = await client.save()
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(201).send(savedClient);

}


//deleteManyClients
exports.deleteManyClients = async (req, res, next) => {
  //get clients ids
  const { ids } = req.body;

  const deletedClients = await Client.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  if (deletedClients) {
    if (deletedClients.deletedCount === 0) {
      throw new Error('No Clients found to delete')
    }else if (deletedClients.deletedCount < ids.length) {
      throw new Error(`${ids.length} Client to be deleted but ${deletedClients.deletedCount} are found and deleted`)

    }
  }

  res.status(200).send(deletedClients);

};


//deleteAllClients
exports.deleteAllClients = async (req, res, next) => {

  const deletedClients = await Client.deleteMany({})
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  res.status(200).send(deletedClients);
};

//editManyClients
exports.editClient = async (req, res, next) => {
  // separating the ids
  const { id } = req.params;

  // separating the updates
  const edits = {};
  for(var key in req.body) {
    if(req.body.hasOwnProperty(key)) {
      if(key !== 'id'){
        edits[key] = req.body[key];
      }
    }
  }


  const clients = await Client.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({error: err.message});
    });

  if (clients) {
    if (clients.nModified === 0) {
      res.send(clients)
      throw new Error('No Clients modified')

    }
  }


  res.status(200).send(clients);

};


