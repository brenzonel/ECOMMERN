import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: 'Error token',
            error
        });
    }
};


export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1){
            res.status(401).send({
                succes: false,
                message: 'Error: Autorizacion Invalida',
                error
            });
        }else{
            next();
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: 'Error autorizacion invalida',
            error
        });
    }
};