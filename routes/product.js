const express = require('express')
const ProductController = require('../controllers/Product')
const router = express.Router();
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.post('/', ProductController.create);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);
module.exports = router