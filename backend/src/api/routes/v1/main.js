import { Router } from 'express';
import ExampleController from '../../controllers/ExampleController.js';
import AuthController from '../../controllers/AuthController.js';
import AccountsController from '../../controllers/AccountsController.js';
import ExerciseController from '../../controllers/ExerciseController.js';

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


// Login //
main_router
    .route('/login')
    .post(AuthController.login);

// Signup //
main_router
    .route('/signup')
    .post(AccountsController.signup);

// Logout //
main_router
    .route('/logout')
    .get(AuthController.logout);

// Check Session //
main_router
    .route('/check')
    .get(AuthController.check);


// Account Details //
main_router
    .route('/accounts/details')
    .get(AccountsController.check, AccountsController.getUserDetails);

// Account Delete //
main_router
    .route('/accounts/delete')
    .get(AccountsController.check, AccountsController.delete);

// Account Edit //
main_router
    .route('/accounts/update')
    .post(AccountsController.check, AccountsController.update);


// Exercise Create //
main_router
    .route('/exercises')
    .post(AccountsController.check, ExerciseController.createExercise);


