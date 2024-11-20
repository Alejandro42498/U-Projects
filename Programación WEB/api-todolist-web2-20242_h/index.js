import express from 'express';
import {read, write} from './src/utils/files.js';
import {routerTasks} from './routes/index.js';

const app = express();

app.use(express.json());

//crear middeleware

app.use((req, res, next) => {
    console.log('Middelware');
    next();
})

app.get('/tasks',(req, res) => {
    const tasks = read();
    let done = req.query.done;
    //cambiar el done de string a boolean
    if (done === 'true') {
        done = true;
    } else if (done === 'false') {
        done = false;
    }
    if (req.query.done) {
        res.json (tasks.filter(task => task.done === done));
    
    return res.json(tasks);
    }
    console.log('tasks', tasks);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tasks));
})

app.post('/tasks',
    (req, res, next) => {console.log('Middleware POST'); next();},   
    (req, res,) => {
    const tasks = read();

    //añadir ID a los datos
    const task = {
        ...req.body, //operador spread
        id: tasks.length + 1
    }
    tasks.push(task);
    //fs.writeFileSync('tasks.json', JSON.stringify(tasks));
    write(tasks);
    // codigo HTTP 201 Created
    res.status(201);
    res.end(JSON.stringify(tasks));
})

app.get('/tasks/:id', (req, res) => {
    const tasks = read();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404);
        res.end();
    }
})

app.put('/tasks/:id', (req, res) => {
    const tasks = read();
    let task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        task = {
            ...task,
            ...req.body
        } 
        tasks[
            tasks.findIndex(task => task.id === parseInt(req.params.id))
        ] = task;
        //fs.writeFileSync('tasks.json', JSON.stringify(tasks));
        write (tasks);
        res.json(task);
    }
        else {
            res.status(404).end();         
        }
    }
)

app.delete('/tasks/:id', (req, res) => {
    const tasks = read();
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        
            //eliminar tarea
            tasks.splice(tasks.findIndex(task => task.id === parseInt(req.params.id)), 1);
        
        
        //fs.writeFileSync('tasks.json', JSON.stringify(tasks));
        write (tasks);
        res.json(task);
    }
        else {
            res.status(404).end();         
        }
    }
)



routerTasks(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


