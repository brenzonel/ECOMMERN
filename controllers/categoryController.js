import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name) {
            return req.status(401).send({message:'Name is required'})
        }
        //Categoria existe
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            res.status(200).send({
                success: false,
                message: 'Ya existe la categoria',
            });
        }else {
            const category = await new categoryModel({name, slug:slugify(name),}).save();
            res.status(201).send({
                success: true,
                message: "Nueva categoria agregada",
                category,
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in Category'
        })
    }
};

//update Category
export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)}, {new:true})
        res.status(200).send({
            success: true,
            message: "Categoria actualizada exitosamente",
            category,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in update Category'
        })
    }
};

//get all category
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Todas las categorias",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in get Categorys'
        })        
    }
}

//GET ONE CATEGORY
export const singleCategoryController = async (req, res) => {
    try {
        const {name} = req.params;
        const category = await categoryModel.findOne({slug:req.params.slug}); 
        res.status(200).send({
            success: true,
            message: "Una categoria",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in get Categorys'
        })  
    }
};

//DELETE ONE CATEGORY
export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Categoria Eliminada", 
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error,
            message: 'Error in delete Categorys'
        })         
    }
};