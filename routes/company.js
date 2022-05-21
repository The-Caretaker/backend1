const express = require('express')
const CompanyController = require('../controllers/Company')
const router = express.Router();
router.get('/', CompanyController.findAll);
router.get('/:id', CompanyController.findOne);
router.post('/', CompanyController.create);
router.patch('/:id', CompanyController.update);
router.delete('/:id', CompanyController.destroy);
module.exports = router