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

            mysql_database.createExercise(
                session_uid,
                exercise_name,
                exercise_pr
            );

            return true;
        } // End signup()
}

export default new ExerciseService();