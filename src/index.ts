import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import mainRouter from './routes';
import cookieParser from 'cookie-parser';
const cors = require('cors');

require('dotenv').config();

const app = express();
createConnection()
    .then(async () => {
        app.use(express.json());
        app.use(cookieParser());
        app.use(
            cors({
                allowedHeaders: ['Content-Type'],
                credentials: true,
            })
        );
        app.use(mainRouter);
        app.listen(5000, () => console.log('server running on port 5000'));
    })
    .catch((error) => console.log(error));
