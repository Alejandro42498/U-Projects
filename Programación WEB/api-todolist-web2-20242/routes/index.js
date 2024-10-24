import express from "express";
import { taskFileRouter } from "./tasks.file.router.js";

const router = express.Router();

export function routerTasks(app) {
    app. use("/api/v1", router);

    router.use("/tasks", taskFileRouter);
}