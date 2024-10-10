import express from 'express';
import {read, write} from './src/utils/files.js';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import joi from 'joi';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Definición del esquema de validación de Joi

const instrumentSchema = Joi.object({
    nombre: Joi.string().required(),
    referencia: Joi.string().required(),
    marca: Joi.string().required(),
    precio: Joi.number().required(),
    disponible: Joi.boolean().required(),
    peso_kg: Joi.number().required(),
    garantia_meses: Joi.number().required()
});

app.get('/instruments', (req, res) => {
    const instruments = read();
    console.log('instruments', instruments);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(instruments));
});

app.get('/instruments',(req, res) => {
    const instruments = read();
    console.log('instruments', instruments);
    res.setHeader('Content-Type', 'aplication/json');
    res.end(JSON.stringify(instruments));
})

//GET: Ruta para entregar la información de la instrumento con el ID recibido por parámetro.
app.get('/instruments/:id', (req, res) => {
    const instruments = read();
    const instrument = instruments.find(instrument => instrument.id === parseInt(req.params.id));
    if(instrument){
        res.json(instrument);
    }else{
        res.status(404).end();
    }
})

//POST: Ruta para agregar una nueva instrument al archivo JSON.
app.post('/instruments', (req, res) => {
    const instruments = read();
    const instrument ={
        ...req.body,
        id: instruments.length + 1
    }
    instruments.push(instrument);
    write(instruments);
    res.status(201).json(instruments);
})

//PUT: Ruta para actualizar la información de una instrumento (El que tenga el ID de la ruta).
app.put('/instruments/:id', (req, res) => {
    const instruments = read();
    let instrument = instruments.find(instrument => instrument.id === parseInt(req.params.id));
    if (instrument) {
        const updatedInstrument = {
            ...instrument,
            ...req.body
        };
        
        instruments[
            instruments.findIndex(instrument => instrument.id === parseInt(req.params.id))
        ] = updatedInstrument;
        write(instruments);
        
        const doc = new PDFDocument();
        const pdfDirectory = path.join(__dirname, 'generated'); // Especificar la carpeta para guardar
        const filePath = path.join(pdfDirectory, `instrument_${updatedInstrument.id}.pdf`); // Ruta completa del PDF

        if (!fs.existsSync(pdfDirectory)) {
            fs.mkdirSync(pdfDirectory);
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(25).text('Actualización de Instrumento', { align: 'center' });
        doc.moveDown();

        doc.fontSize(14).text(`ID: ${updatedInstrument.id}`);
        doc.text(`Nombre: ${updatedInstrument.nombre}`);
        doc.text(`Referencia: ${updatedInstrument.referencia}`);
        doc.text(`Marca: ${updatedInstrument.marca}`);
        doc.text(`Precio: $${updatedInstrument.precio}`);
        doc.text(`Disponible: ${updatedInstrument.disponible ? 'Sí' : 'No'}`);
        doc.text(`Peso: ${updatedInstrument.peso_kg} kg`);
        doc.text(`Garantía: ${updatedInstrument.garantia_meses} meses`);

        doc.end();

        res.json(updatedInstrument);
    } else {
        res.status(404).end();
    }
})

//DELETE: Ruta para eliminar una instrument del archivo JSON.
app.delete('/instruments/:id', (req, res) => {
    const instruments = read();
    const instrument = instruments.find(instrument => instrument.id === parseInt(req.params.id));
    if (instrument) {
        //Eliminar instrument
        instruments.splice(
            instruments.findIndex(instrument => instrument.id === parseInt(req.params.id)),
            1
        );
        write(instruments);
        res.json(instrument);
    }else {
        res.status(404).end();  
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

