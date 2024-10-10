import express from 'express';
import {read, write} from './src/utils/files.js';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Joi from 'joi';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

const instrumentSchema = Joi.object({
    nombre: Joi.string()
        .min(3).message('El nombre debe tener al menos 3 caracteres.') // Validación de longitud mínima
        .max(50).message('El nombre no puede tener más de 50 caracteres.') // Validación de longitud máxima
        .required(),
    
    referencia: Joi.string()
        .pattern(/^[a-zA-Z0-9_-]+$/).message('La referencia solo puede contener letras, números, guiones y guiones bajos.') // Formato específico
        .required(),
    
    marca: Joi.string()
        .max(30).message('La marca no puede tener más de 30 caracteres.') // Validación de longitud máxima
        .required(),
    
    precio: Joi.number()
        .greater(0).message('El precio debe ser mayor que 0.') // Validación de valor mínimo
        .less(10000).message('El precio no puede ser mayor que 10,000.') // Validación de valor máximo
        .required(),
    
    disponible: Joi.boolean()
        .required(), // Simple validación de tipo
     
    peso_kg: Joi.number()
        .greater(0).message('El peso debe ser un número positivo.') // Validación de valor positivo
        .required(),
    
    garantia_meses: Joi.number()
        .integer().message('La garantía debe ser un número entero.') // Validación de tipo entero
        .min(0).message('La garantía no puede ser menor que 0 meses.') // Validación de valor mínimo
        .max(24).message('La garantía no puede ser mayor que 24 meses.') // Validación de valor máximo
        .required()
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

