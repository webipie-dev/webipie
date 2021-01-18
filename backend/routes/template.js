const express = require('express');
const router = express.Router();
const TemplateService = require('../services/template')
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");

// getTemplates
router.get('', TemplateService.getTemplates)

// getTemplatebyId
router.get('/:id', [
  validation.id
], validateRequest, TemplateService.getOneTemplate)

// addTemplate
router.post('', TemplateService.addTemplate)


// deleteManyTemplates
router.delete('', validation.ids, TemplateService.deleteManyTemplates)

//deleteAllTemplates
router.delete('/delete', TemplateService.deleteAllTemplates)

//update Templates
router.patch('/:id', [
  validation.id
], validateRequest, TemplateService.editTemplate)

module.exports = router;
