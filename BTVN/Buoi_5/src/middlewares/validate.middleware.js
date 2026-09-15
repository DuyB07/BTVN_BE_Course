import { errorResponse } from "../utils/error.helper.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return errorResponse(
                res,
                "Validation failed",
                400,
                result.error.issues
            );
        }

        req.body = result.data;

        next();
    };
};