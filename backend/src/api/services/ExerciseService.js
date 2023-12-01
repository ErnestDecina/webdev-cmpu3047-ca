import { mysql_database } from "../../index.js";

class ExerciseService {

    /**
     * 
     * @param {*} request 
     */
        async createExercise (
            request
        ) {
            const exercise_name = request.body.exercise_name;
            const exercise_pr = request.body.exercise_pr;

            console.log(exercise_name);
            console.log(exercise_pr);

            return true;
        } // End signup()
}

export default new ExerciseService();