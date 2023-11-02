import { createExpressServer } from './server.js';
import { express_port } from './config/express.config.js';

export const express_app = createExpressServer();

express_app.listen(express_port, () => {
    console.log(`http://localhost:${express_port}/`);    
});

