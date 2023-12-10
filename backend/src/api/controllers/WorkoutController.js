import WorkoutService from "../services/WorkoutService.js";



class WorkoutController {
    async getWorkouts(
        req,
        res
    ) {
        const request = req;

        // Get Workouts
        const data = await WorkoutService.getWorkouts(request);

        // Successful Get Workouts
        res.status(200).send(data);
    } // End getWorkouts

    async getWorkout(
        req,
        res
    ) {
        const request = req;

        // Get Workout
        const data = await WorkoutService.getWorkout(request);

        // Check if Workout was undefined
        if(!data) {
            res.status(401).send({
                "name": "ERROR"
            });
        } // End if

        // Successful Get Workout
        res.status(200).send(data);
    } // End getWorkouts


    async createWorkout(
        req,
        res
    ) {
        const request = req;

        // Create Workout and check if it was unsuccessful
        if(! await WorkoutService.createWorkout(request) ) {
            res.status(422).send({status: false});
            return;
        }

        // Successful Create Workout
        res.status(200).send({status: true});
    } // End create Exercise



    
    async deleteWorkout(
        req,
        res
    ) {
        const request = req;

        // Delete Workout and check if it was unsuccessful
        if(! await WorkoutService.deleteWorkout(request)) {
            res.status(422).send({status: false});
            return;
        }

        // Successful Delete Workout
        res.status(200).send({status: true});
    }

    async updateWorkout(
        req,
        res
    ) {
        const request = req;
        
        // Update Workout and check if it was unsuccessful
        if(! await WorkoutService.updateWorkout(request)) {
            res.status(422).send({status: false});
            return;
        }

        // Successful Update Workout
        res.status(200).send({status: true});
    }
} // End class AuthController

export default new WorkoutController();