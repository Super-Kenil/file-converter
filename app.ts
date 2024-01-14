// main
import express, { Application } from "express";
import cors from "cors";

// routes
import convertRouter from './routes/convert.route.js'

export const app: Application = express();

const corOptions = {
  origin: "*",
};

app.use(cors(corOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('this is console');
  res.send('hello there');
});

app.use('/convert', convertRouter)

