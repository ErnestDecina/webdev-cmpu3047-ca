import express from 'express';
import cors from 'cors';

export function createExpressServer() {
    const express_app = express();

    const cors_option = {
        origin: '*'
    };
    
    express_app.use(cors(cors_option));
}

