import { Router } from 'express';

const main_router = Router();

main_router
    .route('/test')
    .post((req, res) => {res.send('test')});