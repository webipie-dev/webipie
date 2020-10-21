const Template = require('../models/template')
const mongoose = require('mongoose')

// getAndFilter
exports.getTemplates = (req, res) => {
  Template.find(req.query)
    .then((documents) => {
      res.status(200).json({
        message: 'Templates sent successfully',
        templates: documents
      })
    }).catch(err => {
    res.status(500).json({error: err})
  });
}


exports.getOneTemplate = (req, res) => {
  const id = req.params._id;
  Template.findById(id)
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

exports.addTemplate = (req, res) => {
  const template = new Template({
    name: req.body.name,
    colorChart: req.body.colorChart,
    font: req.body.font,



  });
  template
    .save()
    .then(doc => {
      res.status(201).json({
        message: 'added with success',
        template: doc
      });
    }).catch(err => {
    res.status(500).json({error: err});
  });
}

exports.deleteManyTemplates = (req, res, next) => {
  // console.log(req.body)
  const ids = req.body.ids;
  // console.log(ids)
  Template.deleteMany({_id: {$in: ids}})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.deleteAllTemplates = (req, res, next) => {
  Template.deleteMany({})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
};

exports.editTemplate = (req, res, next) => {
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

  Template.updateMany({_id: {$in :ids}}, { $set: edits })
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


