const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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


router.patch('/update', TemplateService.editTemplate)

module.exports = router;
