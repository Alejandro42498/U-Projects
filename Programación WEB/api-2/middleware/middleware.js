import dayjs from "dayjs";
import fs from "fs";
import { Router } from "express";
export const router = Router(); 


//Middleware
export const ipMiddleware = (req, res, next) => {
    const currentDataTime = dayjs().format('HH:mm DD-MM-YYYY');

    req.body.ip = req.ip;
    if(req.method === 'POST') {
        req.body.created_at = currentDataTime;
    } else if (req.method === 'PUT') {
        req.body.update_at = currentDataTime;
    }

    next();
}
//Middleware log
export const logMiddleware = (req, res, next) => {
    const now = dayjs().format('DD-MM-YYYY HH:mm:ss');

    const method = req.method;
    const url = req.url;

    const headers = JSON.stringify(req.headers);

    const log = `${now} - ${method} - ${url} - ${headers}\n`;

    fs.appendFile('access_log.txt', log, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de log:', err);
        }
    });

    next();
};