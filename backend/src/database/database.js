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

    // Exercise
    async createExercise(
        uid,
        exercise_name,
        exercise_pr
    ) {
        const query_string = "INSERT INTO exercise (fk_user_id, name, personal_record) VALUES ( ? , ? , ? );"

        const result = await this.mysql_database_connection.promise().query(
            query_string,
            [uid, exercise_name, exercise_pr]
        );
    }


    async getExercisesByUserID(
        uid
    ) {
        const query_string = "SELECT * FROM exercise WHERE fk_user_id = ?;"

        const result = await this.mysql_database_connection.promise().query(
            query_string,
            [uid]
        );

        return result;
    }

    async getExerciseByExerciseID(
        exercise_id
    ) {
        const query_string = "SELECT * FROM exercise WHERE exercise_id = ?;"

        const result = await this.mysql_database_connection.promise().query(
            query_string,
            [exercise_id]
        );

        return result;
    }

    async deleteExercise(
        exercise_id
    ) {
        const query_string = `DELETE FROM exercise WHERE exercise_id = ?;`;
        const results = await this.mysql_database_connection.promise().query(
            query_string, 
            [exercise_id]
        );
    }

    async updateExercise(
        exercise_id, 
        new_exercise_name,
        new_exercise_pr
    ) {
        const query_string = `
        UPDATE exercise
        SET 
            name = ?, 
            personal_record = ?
        WHERE exercise_id = ?;`;


        const results = await this.mysql_database_connection.promise().query(
            query_string,
            [new_exercise_name, new_exercise_pr, exercise_id]    
        );
    }


    // Workout
    async getWorkouts(
        uid
    ) {
        const query_string = "SELECT * FROM workout WHERE fk_user_id = ?;"
        const result = await this.mysql_database_connection.promise().query(
            query_string,
            [uid]
        );

        return result;
    }

    async createWorkout(
        uid,
        workout_name
    ) {
        const query_string = "INSERT INTO workout (name, status, fk_user_id) VALUES ( ? , ? , ? )";

        const result = await this.mysql_database_connection.promise().query(
            query_string,
            [workout_name, false, uid]
        );
    }

    async deleteWorkout(
        workout_id
    ) {
        const query_string = `DELETE FROM workout WHERE workout_id = ?;`;
        const results = await this.mysql_database_connection.promise().query(
            query_string, 
            [workout_id]
        );
    }




    // Sets
    async getSets(
        workout_id
    ) {
         const query_string = "SELECT * FROM sets WHERE fk_workout_id = ?";
         const result = await this.mysql_database_connection.promise().query(
            query_string, 
            [workout_id]
        );

        return result[0];
    }

    async createSet(

    ) {

    }

    async deleteSetUsingSetID(

    ) {

    }

    async deleteSetUsingWorkoutID(
        workout_id
    ) {
        const query_string = "DELETE FROM sets WHERE fk_workout_id = ?";
        const results = await this.mysql_database_connection.promise().query(
            query_string, 
            [workout_id]
        );
    }

    async updateSet(

    ) {

    }

} // End class mySQLDatabase
