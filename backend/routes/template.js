const express = require('express');
const router = express.Router();
const TemplateService = require('../services/template')

// getTemplates
router.get('', TemplateService.getTemplates)

// getTemplatebyId
router.get('/:_id', TemplateService.getOneTemplate)

// addTemplate
router.post('', TemplateService.addTemplate)


// deleteManyTemplates
router.delete('', TemplateService.deleteManyTemplates)

//deleteAllTemplates
router.delete('/delete', TemplateService.deleteAllTemplates)

//update Templates
router.patch('/update', TemplateService.editTemplate)

module.exports = router;
