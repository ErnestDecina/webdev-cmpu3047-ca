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
        const data = this.getExercisesByUserID(uid);
        const exercises = data[0]
        
        // Delete All Sets and Exercises
        for(const exercise of exercises) {
            const q = `DELETE FROM sets WHERE fk_exercise_id = ?;`;
            await this.mysql_database_connection.promise().query(
                q,
                exercise.exercise_id
            );

            const p = `DELETE FROM exercise WHERE exercise_id = ?;`;
            await this.mysql_database_connection.promise().query(
                p,
                exercise.exercise_id
            );
        }

        // Delete Workouts
        const c = `DELETE FROM workout WHERE fk_user_id = ?;`;
        await this.mysql_database_connection.promise().query(
            c,
           uid
        );


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
        const query_string_1 = `DELETE FROM sets WHERE fk_exercise_id = ?;`;
        await this.mysql_database_connection.promise().query(
            query_string_1, 
            [exercise_id]
        );

        const query_string_2 = `DELETE FROM exercise WHERE exercise_id = ?;`;
        await this.mysql_database_connection.promise().query(
            query_string_2, 
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

    async getWorkoutByWorkoutID(
        workout_id
    ) {
        const query_string = "SELECT * FROM workout WHERE workout_id = ?;" 
        const result = await this.mysql_database_connection.promise().query(
            query_string,
            [workout_id]
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
        const query_string_1 = `DELETE FROM sets WHERE fk_workout_id = ?;`;
        await this.mysql_database_connection.promise().query(
            query_string_1, 
            [workout_id]
        );

        const query_string_2 = `DELETE FROM workout WHERE workout_id = ?;`;
        await this.mysql_database_connection.promise().query(
            query_string_2, 
            [workout_id]
        );
    }

    async updateWorkout(
        workout_id,
        new_workout_name,
        new_workout_status
    ) {
        const query_string = `
        UPDATE workout
        SET 
            name = ?, 
            status = ?
        WHERE workout_id = ?;`;


        const results = await this.mysql_database_connection.promise().query(
            query_string,
            [new_workout_name, new_workout_status, workout_id]    
        );
    }


 

    // Sets
    async getSetsByWorkoutId(
        workout_id
    ) {
         const query_string = "SELECT * FROM sets WHERE fk_workout_id = ?";
         const result = await this.mysql_database_connection.promise().query(
            query_string, 
            [workout_id]
        );

        return result[0];
    }

    async getSetsByWorkoutIdExerciseId(
        workout_id,
        exercise_id
    ) {
         const query_string = "SELECT * FROM sets WHERE fk_workout_id = ? AND fk_exercise_id = ?";
         const result = await this.mysql_database_connection.promise().query(
            query_string, 
            [workout_id, exercise_id]
        );

        return result[0];
    }


    async geSetByWorkoutIdExerciseIdSetNum(
        workout_id,
        exercise_id,
        set_num
    ) {
        const query_string = `
        SELECT * FROM sets 
        WHERE fk_workout_id = ? AND
              fk_exercise_id = ? AND
              sets = ?;
        `;

        const result = await this.mysql_database_connection.promise().query(
           query_string, 
           [workout_id, exercise_id, set_num]
       );

       return result[0];
    }


    async createSet(
        fk_exercise_id,
        fk_workout_id,
        set_num,
        weight,
        rep
    ) {
        const query_string = `
        INSERT INTO sets (fk_exercise_id, fk_workout_id, sets, weight, rep) 
        VALUES ( ? , ? , ? , ? , ?);`;

        await this.mysql_database_connection.promise().query(
            query_string,
            [fk_exercise_id, fk_workout_id, set_num, weight, rep]
        );
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
        set_id,
        weight,
        rep
    ) {
        const query_string = `
        UPDATE sets
        SET 
            weight = ?,
            rep = ?
        WHERE sets_id = ?;`;


        const results = await this.mysql_database_connection.promise().query(
            query_string,
            [weight, rep, set_id]    
        );
    }

} // End class mySQLDatabase
