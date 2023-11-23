import { createExpressServer } from './server.js';
import { mySQLDatabse } from './database/database.js';
import { express_port } from './config/express.config.js';

export const mysql_database = new mySQLDatabse();
export const express_app = createExpressServer();

mysql_database.createMySQLDatabase();


express_app.listen(express_port, async () => {
    console.log(`http://localhost:${express_port}/`);    

    console.log(await mysql_database.query("SELECT * FROM test"));
});

