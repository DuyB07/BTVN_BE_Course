import express from "express";
import { books } from "../data/books.js";

const router = express.Router();

// API 1
router.get("/books", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Get all books successfully",
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
});

// API 2
router.get("/books/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const book = books.find((book) => book.id === id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Get book successfully",
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
});

// API 3
router.post("/books", (req, res) => {
    try {
        const { title, author } = req.body;

        const newBook = {
            id: books.length + 1,
            title: title,
            author: author,
        };

        books.push(newBook);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
});

// API 4
router.patch("/books/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const book = books.find((book) => book.id === id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }

        Object.assign(book, req.body);

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
});

// API 5
router.delete("/books/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const index = books.findIndex((book) => book.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
        }

        books.splice(index, 1);

        res.status(200).json({
            success: true,
            message: "Xóa sách thành công",
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
});

export default router;