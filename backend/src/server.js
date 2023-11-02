import express from 'express';
import cors from 'cors';
import { express_router } from './api/routes/v1/index.js';
import { api_version } from './config/express.config.js';

export function createExpressServer() {
    const express_app = express();

    const cors_option = {
        origin: '*'
    };
    
    express_app.use(cors(cors_option));


    // Serve the api content


    // Serve the website
    express_app.use('/', express.static('../frontend/bootstrap/'));

    return express_app;
}

