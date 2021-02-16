
const Store = require('../models/store')
const Order = require('../models/order')
const Product = require('../models/store')
const Template = require('../models/template')
const ApiError = require("../errors/api-error");

// getAndFilter
exports.getStores = async (req, res) => {
  // MUST BE AUTHENTICATED AS THE ADMIN

  const stores = await Store.find(req.query)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(stores);

}

exports.getOneStore = async (req, res) => {
  // We need to check if user is authenticated

  //get store id
  const { id } = req.params;
  const store = await Store.findById(id)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(store);
}

exports.getStoreByNameAndLocation = async (req,res) => {
  const { name,location } = req.params;
  const store = await Store.findOne({name, "contact.location": location})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(store);
}

exports.getStoreByUrl = async (req,res) => {
  const { url } = req.params;
  const store = await Store.findOne({url})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });
  res.status(200).send(store);
}

exports.addStore = async (req, res, next) => {
  //check if a logo is uploaded
  let logo;
  if (req.file) {
    logo = req.protocol + "://" + req.get("host") + "/images/logos/" + req.file.filename
  } else {
    logo = ''
  }

  //get the store id from the request
  const _id = req.user.storeID;

  const userStore = Store.findById(_id)
  if (userStore) {
    next(ApiError.BadRequest('This Store is already in use, you need to sign up !!'));
    return;
  }

  const { name, description, location, contact, storeType, templateId} = req.body

  let getTemplate = await Template.findById(templateId)

  if (!getTemplate) {
    next(ApiError.NotFound('Template not Found'));
    return;
  }

  getTemplate._id= templateId

  const store = new Store({
    _id,
    name,
    logo,
    description,
    location,
    storeType,
    contact,
    template: getTemplate,

  });


  await store.save()
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(201).send(store);

}

exports.deleteManyStores = async (req, res, next) => {
  const { ids } = req.body;

  const deletedStores = await Store.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (deletedStores) {
    if (deletedStores.deletedCount === 0) {
      next(ApiError.NotFound('No Stores found to delete'));
      return;
    }
    else if (deletedStores.deletedCount < ids.length) {
      next(ApiError.NotFound(`${ids.length} Stores to be deleted but ${deletedStores.deletedCount} are found and deleted`));
      return;
    }
  }

  Product.deleteMany({store: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  Order.deleteMany({store: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  Client.deleteMany({store: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });


  res.status(200).send(deletedStores);

}

exports.deleteAllStores = async (req, res, next) => {
  const deletedStores = await Store.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(deletedStores);
};

exports.editStore = async (req, res, next) => {
  // getting the id
  const { id } = req.params;
  const edits = {};
  let logoPath;
  let headerPath;
  let file;
  if( req.files ){
    if (req.files.length !== 0) {
      file = req.files[0];
      if(file.fieldname === 'logoImg') {
        logoPath = req.protocol + "://" + req.get("host") + "/backend/images/logoImgs/" + file.filename
        edits['logo'] = logoPath
      } else if(file.fieldname === 'headerImg') {
        headerPath = req.protocol + "://" + req.get("host") + "/backend/images/headerImgs/" + file.filename
        edits['template.header.img'] = headerPath
      }
    }
  }

  // separating the updates
  for (const key in req.body) {
    if (key !== 'id') {
      edits[key] = req.body[key];
    }
  }

  const store = await Store.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (store){
    if (store.nModified === 0) {
      next(ApiError.NotFound('No stores modified'));
      return;
    }
  }

  const storeEdited = await Store.findById(id)

  res.status(200).send(storeEdited)

};

exports.changeTemplate = async (req, res, next) => {
  const { id } = req.params
  let templateId = req.body.templateId;
  let template = await Template.findById(templateId)
  if (!template) {
    next(ApiError.NotFound('Template not Found'));
    return;
  }
  console.log('i got here')
  const store = await Store.updateOne({_id: id}, { $set: {
    template: template
    } })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (store){
    if (store.nModified === 0) {
      next(ApiError.NotFound('No stores modified'));
      return;
    }
  }
  const storeEdited = await Store.findById(id)
  res.status(200).send(storeEdited)
};


