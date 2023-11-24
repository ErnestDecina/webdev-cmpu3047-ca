import mysql from 'mysql2';
import { mysql_options } from '../config/database.config.js';

export class mySQLDatabse {
    mysql_options = mysql_options;
    mysql_database_connection;

    
    createMySQLDatabase() {
        this.mysql_database_connection = mysql.createPool(mysql_options);
    } // End createMyDatabase()

    async query(query) {
        const results = await this.mysql_database_connection.promise().query(query);
        return results;
    } // End query()

    async queryUserDetails(user_id) {
        if (!user_id) return -1;

        // Create query string
        const query_string = `SELECT * FROM user WHERE user_id = ${user_id};`;

        const results = await this.mysql_database_connection.promise().query(query_string);

        if(results[0][0] == undefined) return -1;

        return results[0][0];
    }

    async querySearchUserId(username) {
        if (!username) return {};

        // Create query string
        const query_string = `SELECT user_id FROM user WHERE username = \'${username}\';`;

        const results = await this.mysql_database_connection.promise().query(query_string);

        if(results[0][0] == undefined) return {};

        return results[0][0];
    }
} // End class mySQLDatabase
