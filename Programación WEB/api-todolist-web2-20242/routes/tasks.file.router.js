import express from "express";


export const taskFileRouter = express.Router();

taskFileRouter.get("/", (req, res) => {
    res.send("GET  /file/tasks");
})