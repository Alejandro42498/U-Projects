import express from 'express';
import { routerTasks } from './routes/index.js';


const app = express();

app.use(express.json());

//Crear Middleware
app.use((req, res, next) => {
    console.log('Middleware');
    next();
})

routerTasks(app)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})