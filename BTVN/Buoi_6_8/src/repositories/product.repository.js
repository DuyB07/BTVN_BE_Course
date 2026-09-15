import pool from "../configs/db.config.js";
import { sql } from "../configs/db.config.js";

// Get all products
export const findProductsFromDB = async () => {
    const poolConnection = await pool;

    const result = await poolConnection.request().query(`
        SELECT
            p.id,
            p.name,
            p.price,
            p.stock,
            p.created_at,
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id ASC
    `);

    return result.recordset;
};

// Get product by ID
export const findProductByIdFromDB = async (id) => {
    const poolConnection = await pool;

    const result = await poolConnection
        .request()
        .input("id", sql.Int, id)
        .query(`
            SELECT
                p.id,
                p.name,
                p.price,
                p.stock,
                p.created_at,
                c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = @id
        `);

    return result.recordset[0] ?? null;
};

// Create product
export const createProductToDB = async (name, price, stock, category_id) => {
    const poolConnection = await pool;

    const result = await poolConnection
        .request()
        .input("name", sql.NVarChar, name)
        .input("price", sql.Decimal(12, 2), price)
        .input("stock", sql.Int, stock)
        .input("category_id", sql.Int, category_id)
        .query(`
            INSERT INTO products (name, price, stock, category_id)
            OUTPUT INSERTED.id
            VALUES (@name, @price, @stock, @category_id);
    `);

    return result.recordset[0];
};

// Update product
export const updateProductToDB = async (id, { name, price, stock, category_id }) => {
    const poolConnection = await pool;

    await poolConnection
        .request()
        .input("id", sql.Int, id)
        .input("name", sql.NVarChar, name)
        .input("price", sql.Decimal(12, 2), price)
        .input("stock", sql.Int, stock)
        .input("category_id", sql.Int, category_id)
        .query(`
            UPDATE products
            SET
                name = @name,
                price = @price,
                stock = @stock,
                category_id = @category_id
            WHERE id = @id;
        `);

    return await findProductByIdFromDB(id);
};

// Delete product
export const deleteProductFromDB = async (id) => {
    const poolConnection = await pool;

    await poolConnection
        .request()
        .input("id", sql.Int, id)
        .query(`
            DELETE FROM products
            WHERE id = @id;
        `);
};


/*// Get all products
export const findProductsFromDB = async () => {
  const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.stock,
        p.created_at,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC
  `);
  return rows;
}

// Get product by id
export const findProductByIdFromDB = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.stock,
      p.created_at,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `, [id]);
  return rows[0] ?? null;
}

// Create product
export const createProductToDB = async (name, price, stock, category_id) => {
  const [result] = await pool.query(`
    INSERT INTO products (name, price, stock, category_id)
    VALUES (?, ?, ?, ?),
  `, [name, price, stock, category_id]);
  return result;
}

// Update product
export const updateProductToDB = async (id, { name, price, stock, category_id }) => {
    await pool.query(`
        UPDATE products
        SET
            name = ?,
            price = ?,
            stock = ?,
            category_id = ?
        WHERE id = ?;
    `, [name, price, stock, category_id, id]);

    return await findProductByIdFromDB(id);
}; 

// Delete product
export const deleteProductFromDB = async (id) => {
    await pool.query(`
        DELETE FROM products
        WHERE id = ?;
    `, [id]);
};
*/