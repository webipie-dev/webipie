const {validationResult} = require("express-validator");
const Client = require('../models/client')
const Store = require('../models/store')
const RequestValidationError = require("../errors/request-validation-error");
const ApiError = require("../errors/api-error");

// FilterClients
exports.getClients = async (req, res, next) => {
  // I THINK CLIENTS NEED TO BE INDEXED BY STORE ID
  // We need to check if the store id connected is the same store is provided in the requireAuth

  // add the store_id to the query
  req.query.store = req.user.storeID;

  const clients = await Client.find(req.query)
  //   .cache({
  //   key: req.query.store
  // })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(clients);

}


//getOneClient
exports.getOneClient = async (req, res, next) => {

  // We need to check if the store id connected is the same store is provided in the params

  //get client id
  const { id } = req.params;

  const client = await Client.findById(id)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (!client) {
    next(ApiError.NotFound('Client Not Found'));
    return;
  }

  res.status(200).send(client);

}

//addOneClient
exports.addClient = async (req, res, next) => {

  const { firstname, lastname, phoneNumber, email, gender, fullAddress, storeId} = req.body

  const store = await Store.findById(storeId)

  if (!store) {
    next(ApiError.NotFound('Store Not Found'));
    return;
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
      res.status(400).json({errors: err.message});
    });

  res.status(201).send(savedClient);

}


//deleteManyClients
exports.deleteManyClients = async (req, res, next) => {
  //get clients ids
  const { ids } = req.body;

  const deletedClients = await Client.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (deletedClients) {
    if (deletedClients.deletedCount === 0) {
      next(ApiError.NotFound('No Clients found to delete'));
      return;
    }else if (deletedClients.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Client to be deleted but ${deletedClients.deletedCount} are found and deleted`));
      return;
    }
  }
  res.status(200).send(deletedClients);

};


//deleteAllClients
exports.deleteAllClients = async (req, res, next) => {

  const deletedClients = await Client.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(deletedClients);
};

//editManyClients
exports.editClient = async (req, res, next) => {
  // separating the ids
  const { id } = req.params;

  // separating the updates
  const edits = {};
  for(const key in req.body) {
    if(req.body.hasOwnProperty(key)) {
      if(key !== 'id'){
        edits[key] = req.body[key];
      }
    }
  }

  const clients = await Client.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (clients) {
    if (clients.nModified === 0) {
      next(ApiError.NotFound('No Clients modified'));
      return;

    }
  }

  res.status(200).send(clients);

};


