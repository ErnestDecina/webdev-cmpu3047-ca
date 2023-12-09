import { Router } from 'express';

// Routes
import { main_router } from './main.js';

export const express_router = Router();

express_router.use('/', main_router);