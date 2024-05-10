import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping=false} = req.fields;
        const {photo} = req.files;
        //validacion completa
        //if(!name || !slug || !price || !description || !category || !quantity) {
        //    return req.status(401).send({message:'All fields are required'})
        //}
        //Product exists
        switch(true){
            case !name:
                return res.status(400).send({message:'Name is required'});
            case photo && photo.size > 1000000:
                return res.status(400).send({message:'Photo is required and size should be less than 1mb'});
            case !price:
                return res.status(400).send({message:'Price is required'});
            case !description:
                return res.status(400).send({message:'Description is required'});
            case !category:
                return res.status(400).send({message:'Category is required'});
            case !quantity:
                return res.status(400).send({message:'Quantity is required'});
        }
        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "New product added",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in create Product'
        })
    }
};

// get all product
export const allProductsController = async (req, res) => {
    try{   
        //const products = await productModel.find({}).limit(10).sort({createdAt: -1}) //limit(10) is to get only 10 products;
        const products = await productModel.find({}).populate("category").select("-photo").limit(14).sort({createdAt: -1}) //limit(10) is to get only 14 products;
        res.status(200).send({
            success: true,
            countProducts: products.length,
            products,
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error to get all products'
        })
    }
};

export const getOneProductController = async (req, res) => {
    try {
        //const product = await productModel.findOne({slug: req.params.slug});
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        if(!product){
            return res.status(400).send({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).send({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error to get one product'
        })
    }
};

export const productPhotoController = async (req, res) => {};