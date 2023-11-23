import mysql from 'mysql2';
import { mysql_options } from '../config/database.config.js';

export class mySQLDatabse {
    mysql_options = mysql_options;
    mysql_database_connection;

    
    createMySQLDatabase() {
        this.mysql_database_connection = mysql.createPool(mysql_options);
    } // End createMyDatabase()

    async query(query) {
        this.mysql_database_connection.query(query, (error, results) => {
            if (error) throw error;
        });
    } // End query()
} // End class mySQLDatabase
