import express from 'express';
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { singleCategoryController, categoryController, createCategoryController, updateCategoryController, deleteCategoryController } from './../controllers/categoryController.js';

//route object
const router = express.Router();

//router
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get all category
router.get('/allcategory', categoryController);

//single category
router.get('/single-category/:slug', singleCategoryController);

//DELETE category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;