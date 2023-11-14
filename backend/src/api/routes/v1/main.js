import { Router } from 'express';
import ExampleController from '../../controllers/ExampleController.js';

export const main_router = Router();

main_router
    .route('/test')
    .get(ExampleController.example);

main_router
    .route('/test/login')
    .post(ExampleController.exampleLogin)

