import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { allProductsController, createProductController, deleteProductController, getOneProductController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

//route object
const router = express.Router();

//route
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

//route
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

//GET all products
router.get('/allproducts', allProductsController);

//GET one product
router.get('/get-product/:slug', getOneProductController);

//GET photo product
router.get('/product-photo/:pid', productPhotoController);

//DELETE product
router.delete('/product/:pid', deleteProductController);

export default router;