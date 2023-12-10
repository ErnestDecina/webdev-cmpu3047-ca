import ExerciseService from "../services/ExerciseService.js";



class ExerciseController {
    async createExercise(
        req,
        res
    ) {

        const request = req;

        // Create an exercise and check if unsuccessful
        if(! await ExerciseService.createExercise(request) ) {
            res.status(422).send({status: false});
            return;
        }


        // Successful Exercise creation
        res.status(200).send({status: true});
    } // End create Exercise


    async getExercises(
        req,
        res
    ) {

        const request = req;

        // Get Exercises
        const data = await ExerciseService.getExercises(request);

        // Successful Get Exercises
        res.status(200).send(data);
    } // End create Exercise
    
    async deleteExercise(
        req,
        res
    ) {
        const request = req;

        // Delete Exercise and check if it was unsuccessful
        if(! await ExerciseService.deleteExercise(request)) {
            res.status(422).send({status: false});
            return;
        }

        // Successful Deleted Exercise
        res.status(200).send({status: true});
    }

    async updateExercise(
        req,
        res
    ) {
        const request = req;
        
        // Update Exercise and check if it was unsuccessful
        if(! await ExerciseService.updateExercise(request)) {
            res.status(422).send({status: false});
            return;
        }

        // Successful Updated Exercise 
        res.status(200).send({status: true});
    }
} // End class AuthController

export default new ExerciseController();