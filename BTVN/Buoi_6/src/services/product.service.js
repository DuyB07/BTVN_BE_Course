import { findProductsFromDB, findProductByIdFromDB, createProductToDB } from "../repositories/product.repository.js"

export const getAllProducts = async () => {
    return await findProductsFromDB();
}

export const getProductById = async (id) => {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
        const error = new Error("Product ID is not valid");
        error.statusCode = 400;
        throw error;
    }

    const product = await findProductByIdFromDB(numericId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
}

export const createProduct = async (name, price, stock, category_id) => {
    return await createProductToDB(name, price, stock, category_id);
}