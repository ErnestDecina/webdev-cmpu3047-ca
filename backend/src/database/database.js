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

    // USERS
    async queryUserDetails(user_id) {
        if (!user_id) return -1;

        // Create query string
        const query_string = `SELECT * FROM user WHERE user_id = ?;`;

        const results = await this.mysql_database_connection.promise().query(
            query_string, 
            [user_id
        ]);

        if(results[0][0] == undefined) return -1;

        return results[0][0];
    }


    async querySearchUserId(email) {
        if (!email) return -1;

        // Create query string
        const query_string = `SELECT user_id FROM user WHERE email = ?;`;


        const results = await this.mysql_database_connection.promise().query(
            query_string,
            [email]
        );

        if(results[0][0] == undefined) return -1;

        return results[0][0];
    }


    async querySearchUserEmail(email) {
        if (!email) return -1;

        // Create query string
        const query_string = `SELECT user_id FROM user WHERE email = ?;`;


        const results = await this.mysql_database_connection.promise().query(
            query_string, 
            [email]
        );

        if(results[0][0] == undefined) return -1;

        return results[0][0];
    }


    async insertNewUser(username, email, password, first_name, last_name) {
            // Create query string
            const query_string = `INSERT INTO user (username, email, password, first_name, last_name) VALUES ( ? , ? , ? , ? , ? );`;
            const results = await this.mysql_database_connection.promise().query(
                query_string, 
                [username, email, password, first_name, last_name]
            );
    }


    async deleteUser(uid) {
        const query_string = `DELETE FROM user WHERE user_id = ?;`;
        const results = await this.mysql_database_connection.promise().query(
            query_string, 
            [uid]
        );
    }


    async updateUser(
        uid, 
        first_name,
        last_name,
        username,
        email,
        phone,
        address,
        bio,
        password
    ) {
        const query_string = `
        UPDATE user
        SET 
            username = ?, 
            bio = ?,
            email = ?, 
            password = ?,
            phone_number = ?, 
            address = ?,
            first_name = ?, 
            last_name = ?
        WHERE user_id = ?;`;


        const results = await this.mysql_database_connection.promise().query(
            query_string,
            [username, bio, email, password, phone, address, first_name, last_name, uid]    
        );
    }


} // End class mySQLDatabase
