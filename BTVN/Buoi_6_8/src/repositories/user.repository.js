import pool from "../configs/db.config.js";
import { sql } from "../configs/db.config.js";

// Get all users
export const getAllUsersFromDB = async () => {
    const poolConnection = await pool;

    const result = await poolConnection
        .request()
        .query(`
            SELECT *
            FROM users
            ORDER BY id ASC
        `);

    return result.recordset;
};

// Get user by ID
export const getUserByIdFromDB = async (id) => {
    const poolConnection = await pool;

    const result = await poolConnection
        .request()
        .input("id", sql.Int, id)
        .query(`
            SELECT *
            FROM users
            WHERE id = @id
        `);

    return result.recordset[0] ?? null;
};

// Get user by email
export const getUserByEmailFromDB = async (email) => {
    const poolConnection = await pool;

    const result = await poolConnection
        .request()
        .input("email", sql.NVarChar, email)
        .query(`
            SELECT *
            FROM users
            WHERE email = @email
        `);

    return result.recordset[0] ?? null;
};

// Create user
export const createUserInDB = async ({fullName, email, password, role}) => {
    const poolConnection = await pool;

    const result = await poolConnection
        .request()
        .input("fullName", sql.NVarChar, fullName)
        .input("email", sql.NVarChar, email)
        .input("password", sql.NVarChar, password)
        .input("role", sql.NVarChar, role)
        .query(`
            INSERT INTO users (full_name, email, password, role)
            OUTPUT INSERTED.id
            VALUES (@fullName, @email, @password, @role);
        `);

    return result.recordset[0].id;
};

/*
// Get all users
export const getAllUsersFromDB = async () => {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        ORDER BY id ASC
    `);

    return rows;
};

// Get user by ID
export const getUserByIdFromDB = async (id) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE id = ?
    `, [id]);

    return rows[0] ?? null;
};

// Get user by email
export const getUserByEmailFromDB = async (email) => {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE email = ?
    `, [email]);

    return rows[0] ?? null;
};

// Create user
export const createUserInDB = async ({fullName, email, password, role}) => {
    const [result] = await pool.query(`
        INSERT INTO users (full_name, email, password, role)
        VALUES (?, ?, ?, ?)
    `, [fullName, email, password, role]);

    return result.insertId;
};
*/