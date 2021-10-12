import Config  from './config';
const { port } = new Config();

import userRouter from './routes/userRouter';

import express, { Application } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

const app:Application = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
});

app.use(express.json());

userRouter(app);

const server:Server = app.listen(port, () => {
    const { port } = server.address() as AddressInfo;

    console.log(`Servidor escuchando desde el puerto ${ port }.`);
});