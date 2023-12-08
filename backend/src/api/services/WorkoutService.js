import { mysql_database } from "../../index.js";

class WorkoutService {
    /**
     * 
     * @param {*} request 
     */
    async getWorkouts (
        request
    ) {
        const session_uid = request.session.uid;
    
        var workouts = await mysql_database.getWorkouts(
            session_uid
        );
        
        workouts = workouts[0];
        
        // Inserting Workouts
        for(const workout of workouts) {
            workout.exercises = [];
            const sets = await mysql_database.getSetsByWorkoutId(workout.workout_id);
            
            for(const set of sets) {
                const exercise = await mysql_database.getExerciseByExerciseID(set.fk_exercise_id);

                // Check for duplicates
                var duplicate_value = false;
                for(const ex of workout.exercises) {
                    if(ex.exercise_id == exercise[0][0].exercise_id) {
                        duplicate_value = true;

                        ex.sets.push([set.sets, set.weight, set.rep]);
                    }
                }

                if(duplicate_value) continue;


                exercise[0][0].sets = [
                    [set.sets, set.weight, set.rep]
                ];
                workout.exercises.push(exercise[0][0]);
            }
        }
        return workouts;
    } // End signup()


    /**
     * 
     * @param {*} request 
     */
    async createWorkout (
        request
    ) {
        const session_uid = request.session.uid;
        const workout_name = request.body.workout_name;

        if(!workout_name) return false;

        // Check if workout_name already exists
        const workouts = await mysql_database.getWorkouts(
            session_uid
        );
        
        const found_duplicate = false;
        workouts[0].forEach(workout => {
            if(workout.name == workout_name) {
                found_duplicate = true;
            }
        });

        if(found_duplicate) return false;

        // Insert new Workout
        await mysql_database.createWorkout(
            session_uid,
            workout_name
        );

        return true;
    } // End signup()


    async deleteWorkout(
        request
    ) {
        const session_uid = request.session.uid;
        const workout_id = request.body.workout_id;
        
        if(workout_id == undefined) return false;

        // Check if User owns the Exercise
        const workouts = await mysql_database.getWorkouts(session_uid);
        var data = undefined;

        workouts[0].forEach(workout => {
            if(workout.workout_id == workout_id) 
                data = workout;
        });

        if(!data) return false;



        // Delete Workouts
        mysql_database.deleteWorkout(workout_id);
        
        return true;
    }


    async updateWorkout(
        request
    ) {
        const session_uid = request.session.uid;
        const workout_id = request.body.workout_id;
        const exercises = request.body.exercises;

        // Check if the user owns the workout
        const workouts = await mysql_database.getWorkouts(session_uid);
        var data = undefined;

        workouts[0].forEach(workout => {
            if(workout.workout_id == workout_id) 
                data = workout;
        });

        if(!data) return false;

        // Update workout name or status
        const workout = await mysql_database.getWorkoutByWorkoutID(workout_id);
        const workout_name =  request.body.name;
        const workout_status = request.body.status;

        const new_workout_name = (request.body.name) ? request.body.name : workout[0][0].name;
        const new_workout_status = (request.body.status != undefined) ? request.body.status : workout[0][0].status;

        await mysql_database.updateWorkout(workout_id, new_workout_name, new_workout_status);
        await mysql_database.deleteSetUsingWorkoutID(workout_id);

        // Check all exercises
        for(const exercise of exercises) {

            // Input Set
            for(const set of exercise.sets) {
                await mysql_database.createSet(
                    exercise.exercise_id,
                    workout_id,
                    set[0],
                    set[1],
                    set[2]
                );
            }
        }

        return true;
    }
}

export default new WorkoutService();