import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        //val
        if (!name) {
            return res.send({message: 'Nombre es requerido'});
        }
        if (!email) {
            return res.send({message: 'Email es requerido'});
        }
        if (!password) {
            return res.send({message: 'Contrasenia es requerido'});
        }
        if (!phone) {
            return res.send({message: 'Telefono es requerido'});
        }
        if (!address) {
            return res.send({message: 'Direccion es requerido'});
        }
        if (!answer) {
            return res.send({message: 'Answer es requerido'});
        }

        //usuario existente
        const existUser = await userModel.findOne({email});

        //val
        if (existUser){
            res.status(200).send({
                succes: false,
                message: 'Usuario ya registrado anteriormente',
            });
        }else{

            //registro usuario
            const hashedPassword = await hashPassword(password);

            //salvar
            const user = await new userModel({name, email, phone, address, password:hashedPassword, answer}).save();

            res.status(201).send({
                success: true,
                message: 'Registro de usuario exitoso',
                user,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: 'Error en el registro',
            error
        });
    }
};

//LOGIN
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        //val
        if(!email||!password){
            return res.status(404).send({
                success: false,
                message: 'Usuario/Contrasenia Invalido',
            });
        }
        //val usuario
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).send({
                success: false,
                message: 'El email/correo no existe',
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match){
            return res.status(200).send({
                success: false,
                message: 'Contrasenia invalida',
            });
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Inicio/Login exitoso",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer: user.answer,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error en inicio de sesion',
            error,
        });
    }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.status(400).send({message:'Email es requerido'});
        }
        if(!answer){
            res.status(400).send({message:'Answer es requerido'});
        }
        if(!newPassword){
            res.status(400).send({message:'New password es requerido'});
        }
        //check
        const user = await userModel.findOne({email, answer});
        //validacion
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password:hashed});
        res.status(200).send({
            success:true,
            message:'Password Reset',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error forgot password botton',
            error,
        });
    }
};

//test
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error Token',
        error,
      });
    }
  };
//export default {registerController};