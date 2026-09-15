import express from "express";
import {
    getUsers,
    createUser,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/user.validation.js";

const router = express.Router();

router.get("/", getUsers);

router.post(
    "/",
    validate(createUserSchema),
    createUser
);

export default router;