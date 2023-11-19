import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { express_router } from './api/routes/v1/index.js';
import { api_version, session_config } from './config/express.config.js';
import { cors_options } from './config/express.config.js';

export function createExpressServer() {
    const express_app = express();
    
    // Add Middleware
    express_app.use(express.json());
    express_app.use(cors(cors_options));
    express_app.use(cookieParser())
    express_app.use(session(session_config))

    // Serve the api content
    express_app.use(`/api/${api_version}`, express_router);

    // Serve the website
    express_app.use('/', express.static('../frontend/bootstrap/'));
    express_app.use('/account', express.static('../frontend/bootstrap/account.html'));
    express_app.use('/exercise', express.static('../frontend/bootstrap/exercise.html'));
    express_app.use('/workout', express.static('../frontend/bootstrap/workout.html'));

    return express_app;
}

