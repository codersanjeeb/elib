import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

//Routes

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to eLib" });
});

app.use("/api/users",userRouter);

//Global error handler.
app.use(globalErrorHandler);

export default app;
