import express from "express";

import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} from "../controllers/book.controller.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
    createBookSchema,
    updateBookSchema,
} from "../validations/book.validation.js";

const router = express.Router();


// API 1
router.get("/", getBooks);


// API 2
router.get("/:id", getBookById);


// API 3
router.post(
    "/",
    validate(createBookSchema),
    createBook
);


// API 4
router.patch(
    "/:id",
    validate(updateBookSchema),
    updateBook
);


// API 5
router.delete("/:id", deleteBook);


export default router;