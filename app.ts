// main
import express, { Application } from "express";
// import cors from "cors";
import sharp, { Sharp } from 'sharp';
import { glob } from 'glob';

import convertRouter from './routes/convert.route.js'

// routes

export const app: Application = express();

// var corOptions = {
//   origin: "*",
// };

// app.use(cors(corOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello there');
});

app.use('/convert', convertRouter)

