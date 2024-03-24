import express from "express";
import { registerController, loginController, testController, forgotPasswordController} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

//route object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', loginController);

//Olvido de contrase;a || POST
router.post('/forgot-password', forgotPasswordController);

//test token
router.get('/test', requireSignIn, isAdmin, testController);

//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
});

export default router;