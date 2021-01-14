const _ = require('lodash');

const Store = require('../models/store')
const Product = require('../models/store')
const Template = require('../models/template')

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
      res.status(200).json(_.pick(doc,['_id','name','logo','description','storeType','location','creationDate']));
    })
    .catch(err => {
      res.status(500).json({error: err})
    });
}

exports.addStore = async (req, res) => {
  //check if a logo is uploaded
  let logo;
  if (req.file) {
    logo = req.protocol + "://" + req.get("host") + "/images/logos/" + req.file.filename
  } else {
    logo = ''
  }

  let getTemplate = Template.findOne({_id: req.body.template})

  const store = new Store({
    name: req.body.name,
    logo: logo,
    description: req.body.description,
    location: req.body.location,
    storeType: req.body.storeType,
    contact: req.body.contact,
    products: req.body.products,
    template: getTemplate

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
  const ids = req.body.ids;
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
  // getting the id
  const ids = req.body.ids;
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
    if (key !== 'ids') {
      edits[key] = req.body[key];
    }
  }
  Store.updateOne({_id: ids}, {$set: edits})
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



