const Template = require('../models/template')


exports.getTemplates = async (req, res) => {

  const templates = await Template.find(req.query)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(templates);
}


exports.getOneTemplate = async (req, res) => {
  //get template id
  const { id } = req.params;

  const template = await Template.findById(id)
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(template);
}

exports.addTemplate = async (req, res) => {
  const { name, header, colorChart, font} = req.body

  const template = new Template({
    name,
    colorChart,
    font,
    header
  });

  await template.save();
  res.status(201).send(template);


}

exports.deleteManyTemplates = async (req, res, next) => {
  //get stores ids
  const { ids } = req.body;

  const deletedTemplates = await Template.deleteMany({_id: {$in: ids}})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (deletedTemplates) {
    if (deletedTemplates.deletedCount === 0) {
      throw new Error('No Templates found to delete')
    }else if (deletedTemplates.deletedCount < ids.length) {
      throw new Error(`${ids.length} Templates to be deleted but ${deletedTemplates.deletedCount} are found and deleted`)

    }
  }

  res.status(200).send(deletedTemplates);
};

exports.deleteAllTemplates = async (req, res, next) => {
  const deletedTemplates = await Template.deleteMany({})
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  res.status(200).send(deletedTemplates);
};

exports.editTemplate = async (req, res, next) => {
  // separating the id
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

  const templateEdited = await Template.updateOne({_id: id}, { $set: edits })
    .catch((err) => {
      res.status(400).json({errors: err.message});
    });

  if (templateEdited){
    if (templateEdited.nModified === 0) {
      throw new Error('No Orders modified')

    }
  }

  res.status(200).send(templateEdited);
};


