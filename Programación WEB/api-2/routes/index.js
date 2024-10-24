import express from 'express';
import { instrumentsFileRouter } from "./instruments.file.router.js";   


const router = express.Router();

export function routerInstruments(app) {
  app.use("/api/v1", router);

    router.use("/file/instruments", instrumentsFileRouter);

}

