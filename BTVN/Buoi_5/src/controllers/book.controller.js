import { books } from "../data.js";
import { successResponse } from "../utils/success.helper.js";
import { errorResponse } from "../utils/error.helper.js";

export const getBooks = (req, res) => {
    try {
        return successResponse(
            res,
            books,
            "Get all books successfully"
        );
    } catch (error) {
        return errorResponse(
            res,
            "Internal Server Error",
            500
        );
    }
};

export const getBookById = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const book = books.find((book) => book.id === id);

        if (!book) {
            return errorResponse(
                res,
                "Book not found",
                404
            );
        }

        return successResponse(
            res,
            book,
            "Get book successfully"
        );
    } catch (error) {
        return errorResponse(
            res,
            "Internal Server Error",
            500
        );
    }
};

export const createBook = (req, res) => {
    try {
        const { title, author } = req.body;

        const newBook = {
            id: books.length + 1,
            title,
            author,
        };

        books.push(newBook);

        return successResponse(
            res,
            newBook,
            "Book created successfully",
            201
        );
    } catch (error) {
        return errorResponse(
            res,
            "Internal Server Error",
            500
        );
    }
};

export const updateBook = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const book = books.find((book) => book.id === id);

        if (!book) {
            return errorResponse(
                res,
                "Book not found",
                404
            );
        }

        Object.assign(book, req.body);

        return successResponse(
            res,
            book,
            "Book updated successfully"
        );
    } catch (error) {
        return errorResponse(
            res,
            "Internal Server Error",
            500
        );
    }
};

export const deleteBook = (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const index = books.findIndex((book) => book.id === id);

        if (index === -1) {
            return errorResponse(
                res,
                "Book not found",
                404
            );
        }

        books.splice(index, 1);

        return successResponse(
            res,
            null,
            "Xóa sách thành công"
        );
    } catch (error) {
        return errorResponse(
            res,
            "Internal Server Error",
            500
        );
    }
};