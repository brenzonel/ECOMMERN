import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { allProductsController, createProductController, getOneProductController, productPhotoController } from '../controllers/productController.js';
import formidable from 'express-formidable';

//route object
const router = express.Router();

//route
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//GET all products
router.get('/allproducts', allProductsController);

//GET one product
router.get('/get-product/:slug', getOneProductController);

//GET photo product
router.get('/product-photo/:pid', productPhotoController);

export default router;