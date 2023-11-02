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
    express_app.use(`/api/v1`, express_router);

    // Serve the website
    express_app.use('/', express.static('../frontend/bootstrap/'));
    express_app.use('/account', express.static('../frontend/bootstrap/account.html'));
    express_app.use('/exercise', express.static('../frontend/bootstrap/exercise.html'));
    express_app.use('/workout', express.static('../frontend/bootstrap/workout.html'));

    return express_app;
}

