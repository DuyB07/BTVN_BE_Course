import * as productService from '../services/product.service.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (err) {
        next(err);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, stock, category_id } = req.body;

        const result = await productService.createProduct(name, price, stock, category_id);

        return res.status(201).json({
            success: true,
            data: result,
            /*{
                id: result.insertId,
                name,
                price,
                stock,
                category_id,
            },*/
        });
    } catch (err) {
        next(err);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await productService.updateProduct(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await productService.deleteProduct(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};