import express from 'express';
import { routerInstruments } from './routes/index.js'; 
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('middleware');
    next();
})

routerInstruments(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

