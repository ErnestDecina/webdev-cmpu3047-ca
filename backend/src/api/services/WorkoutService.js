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
            const sets = await mysql_database.getSets(workout.workout_id);
            
            console.log(workout.name);
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


    
        // for(var index = 0; index < workouts.length; index++) {
        //     console.log(index);
        //     console.log(workouts[index].name);
        //     workouts[index].exercises = [];

        //     const sets = await mysql_database.getSets(workouts[index].workout_id);

        //     // Get Exercises
        //     sets[0].forEach(async set => {
        //         const exercise_id = set.fk_exercise_id;
                
        //         const exercise = await mysql_database.getExerciseByExerciseID(exercise_id);
                
        //         workouts[index].exercises.push(exercise[0][0]);
        //     });

        //     console.log(workouts[index]);
        // }

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

        // Delete Sets belonging to workouts
        mysql_database.deleteSetUsingWorkoutID(workout_id);

        // Delete Workouts
        mysql_database.deleteWorkout(workout_id);
        
        return true;
    }


    async updateWorkout(
        request
    ) {

        return true;
    }
}

export default new WorkoutService();