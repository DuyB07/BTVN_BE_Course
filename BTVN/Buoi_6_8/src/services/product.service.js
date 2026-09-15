import { findProductsFromDB, findProductByIdFromDB, createProductToDB, updateProductToDB, deleteProductFromDB } from "../repositories/product.repository.js"

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
    // Validate name
    if (!name || name.trim().length < 2) {
        const error = new Error("Name must be at least 2 characters");
        error.statusCode = 400;
        throw error;
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
        const error = new Error("Price must be a number greater than 0");
        error.statusCode = 400;
        throw error;
    }

    // Validate stock
    if (stock !== undefined && stock < 0) {
        const error = new Error("Stock must be greater than or equal to 0");
        error.statusCode = 400;
        throw error;
    }

    const productId = await createProductToDB({name, price, stock, category_id});

    // Lấy lại product vừa tạo
    return await findProductByIdFromDB(productId);
};

export const updateProduct = async (id, { name, price, stock, category_id }) => {
    const numericId = parseInt(id);

    // Kiểm tra ID
    if (isNaN(numericId)) {
        const error = new Error("Product ID is not valid");
        error.statusCode = 400;
        throw error;
    }

    // Kiểm tra product có tồn tại
    const existingProduct = await findProductByIdFromDB(numericId);

    if (!existingProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return await updateProductToDB(numericId, {name, price, stock, category_id});
};

export const deleteProduct = async (id) => {
    const numericId = parseInt(id);

    // Kiểm tra ID
    if (isNaN(numericId)) {
        const error = new Error("Product ID is not valid");
        error.statusCode = 400;
        throw error;
    }

    // Kiểm tra product có tồn tại
    const existingProduct = await findProductByIdFromDB(numericId);

    if (!existingProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    await deleteProductFromDB(numericId);
};