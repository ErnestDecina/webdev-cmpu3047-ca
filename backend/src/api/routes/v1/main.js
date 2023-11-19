import { Router } from 'express';
import ExampleController from '../../controllers/ExampleController.js';
import AuthController from '../../controllers/AuthController.js';

export const main_router = Router();

// TESTING //
main_router
    .route('/test')
    .get(ExampleController.example);

main_router
    .route('/test/login')
    .post(ExampleController.exampleLogin);

main_router
    .route('/test/session')
    .get(ExampleController.exmapleSessionCheck);
// TESTING //


// Login In //
main_router
    .route('/login')
    .post(AuthController.login);

// Logout //
main_router
    .route('/logout')
    .get(AuthController.logout);
