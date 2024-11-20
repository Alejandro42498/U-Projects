import express from "express";
import {read, write} from "../utils/files.js";
export const tasksFileRouter = express.Router();

tasksFileRouter.get ("/", (req, res) => {
    const tasks = read();
    let done = req.query.done;
    if (done === 'true') {
        done = true;
    } else if (done === 'false') {
        done = false;
    }
    console.log('req.query', req.query);
    console.log('tasks', tasks);
    if (req.query.done) {
        res.json(tasks.filter(task => {
            console.log('task.done', task.done);
            console.log('done', done);
            return task.done === done
        }));
        return;
    }
    console.log('tasks', tasks);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tasks));
})

tasksFileRouter.post('/', 
    (req, res, next) => {
        console.log('Middleware POST');
        next();
    },
    (req, res) => {
    const tasks = read();
    //Añadir ID a los datos recibidos
    const task = {
        ...req.body, //Spread operator
        id: tasks.length + 1
    }
    tasks.push(task);
    write(tasks);
    //Código HTTP 201 Created
    res.status(201).json(tasks);
})

tasksFileRouter.get('/:id', (req, res) =>{
    const tasks = read();
    const task = tasks.find(task => task.id ===parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).end();
    }
})

tasksFileRouter.put('/:id', (req, res) =>{
    const tasks = read();
    let task = tasks.find(task => task.id ===parseInt(req.params.id));
    if (task) {
        //Actualizar task
    task = {
        ...task,
        ...req.body
    }
    //Actualizar task en el array
    tasks[
        tasks.findIndex(task => task.id === parseInt(req.params.id))
    ] = task;
    write(tasks);
    res.json(task);
    } else {
        res.status(404).end();
    }
})

tasksFileRouter.delete('/:id', (req, res) =>{
    const tasks = read();
        const task = tasks.find(task => task.id ===parseInt(req.params.id));
        if (task) {
            //eliminar task
        tasks.splice(
            tasks.findIndex(task => task.id === parseInt(req.params.id)),
            1
        );
        write(tasks);
        res.json(task);
        } else {
            res.status(404).end();
        }
    })