import { z } from "zod";

export const createBookSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required"),

    author: z
        .string()
        .min(1, "Author is required"),
});

export const updateBookSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .optional(),

    author: z
        .string()
        .min(1, "Author is required")
        .optional(),
});