import express from "express";
import userRouter from "./routes/user.router.js";
import bookRouter from "./routes/book.router.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});