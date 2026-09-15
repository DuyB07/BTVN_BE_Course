import express from 'express';
import * as productController from '../controllers/product.controller.js'

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProductToDB);
export default router;