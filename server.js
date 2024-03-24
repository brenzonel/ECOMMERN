//const express = require('express');
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/dbm.js';
import authRoutes from './routes/authRoute.js';
import cors from "cors";
import categoryRoutes from './routes/categoryRoute.js';

//config env
dotenv.config();

//database conf
connectDB();

//rest Object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

//rest api
app.get("/", (req,res) => {
    res.send("<h1>Bienvenido al Ecommerce Test</h1>");
});

const PORT = process.env.PORT1 || 8080;

app.listen(PORT,() => {
    console.log(`Servidor conectado en modo ${process.env.DEV_MODE} en ${PORT}`)
})