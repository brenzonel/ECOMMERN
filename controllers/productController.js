import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping, status} = req.fields;
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
        const products = new productModel({...req.fields, shipping:false, status:true, slug:slugify(name)});
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

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo") //select("photo") is to get only the photo of the product;
        if(product.photo.data){
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        /*const product = await productModel.findOne({slug: req.params.slug});
        if(product.photo.data){
            res.set('Content-Type', product.photo.contentType);
            return res.send(product.photo.data);
        */}
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error to get photo product'
        })
    }
};


export const deleteProductController = async (req, res) => {
    try {
        //const product = await productModel.findByIdAndDelete(req.params.pid); //eliminacion de producto/registro
        const product = await productModel.findByIdAndUpdate(req.params.pid, {status:false},{new:true}); //eliminacion logica
    
        if(!product){
            return res.status(400).send({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Product deleted',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error to delete product'
        })
    }
};

export const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping, status} = req.fields;
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
            case !status:
                return res.status(400).send({message:'status is required'});
            case !shipping:
                return res.status(400).send({message:'Shipping is required'});
            
        }
        const statusCast = !!status;                             //convertir a booleano
        const shippingCast = shipping === 'true' ? true : false; //convertir a booleano

        const products = await productModel.findByIdAndUpdate(req.params.pid, 
            {...req.fields, status:statusCast, shipping:shippingCast, slug:slugify(name)},{new:true}
            );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in update Product'
        })
    }
};