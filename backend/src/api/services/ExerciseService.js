import { mysql_database } from "../../index.js";

class ExerciseService {

    /**
     * 
     * @param {*} request 
     */
    async createExercise (
        request
    ) {
        const session_uid = request.session.uid;
        const exercise_name = request.body.exercise_name;
        const exercise_pr = request.body.exercise_pr;


        if(exercise_name == undefined || exercise_pr == undefined) return false;

        mysql_database.createExercise(
            session_uid,
            exercise_name,
            exercise_pr
        );

        return true;
    } // End signup()

    /**
     * 
     * @param {*} request 
     */
    async getExercises (
        request
    ) {
        const session_uid = request.session.uid;

        const data = await mysql_database.getExercisesByUserID(
            session_uid
        );

        return data[0];
    } // End signup()


    async deleteExercise(
        request
    ) {
        const session_uid = request.session.uid;
        const exercise_id = request.body.exercise_id;

        // Check if User owns the Exercise
        const exercises = await mysql_database.getExercisesByUserID(session_uid);
        var data = undefined;

        exercises[0].forEach(exercise => {
            if(exercise.exercise_id == exercise_id) 
                data = exercise;
        });

        if(!data) return false;

        // Delete Exercise
        mysql_database.deleteExercise(exercise_id);
        
        return true;
    }

    async updateExercise(
        request
    ) {
        const session_uid = request.session.uid;
        const exercise_id = request.body.exercise_id;

        if(!request.body.exercise_name) return false;

        // Check if User owns the Exercise
        const exercises = await mysql_database.getExercisesByUserID(session_uid);
        var data = undefined;

        exercises[0].forEach(exercise => {
            if(exercise.exercise_id == exercise_id) 
                data = exercise;
        });

        if(!data) return false;

        const new_exercise_name = (request.body.exercise_name) ?  request.body.exercise_name : data.name;
        const new_presonal_record = (request.body.exercise_pr) ? request.body.exe : data.personal_record;

        mysql_database.updateExercise(exercise_id, new_exercise_name, new_presonal_record);

        return true;
    }
}

export default new ExerciseService();