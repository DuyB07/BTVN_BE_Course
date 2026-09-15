import { users } from "../data.js";
import { successResponse } from "../utils/success.helper.js";
import { errorResponse } from "../utils/error.helper.js";

export const getUsers = (req, res) => {
    try {
        return successResponse(
            res,
            users,
            "Get all users successfully"
        );
    } catch (error) {
        return errorResponse(
            res,
            "Internal Server Error",
            500
        );
    }
};

export const createUser = (req, res) => {
    try {
        const { name, email } = req.body;

        const newUser = {
            id: users.length + 1,
            name,
            email,
        };

        users.push(newUser);

        return successResponse(
            res,
            newUser,
            "User created successfully",
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