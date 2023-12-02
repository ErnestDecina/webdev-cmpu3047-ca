import AccountsService from "../services/AccountsService.js";
import AuthenticationService from "../services/AuthenticationService.js";
import ExerciseService from "../services/ExerciseService.js";



class ExerciseController {
    async createExercise(
        req,
        res
    ) {

        const request = req;

        if(! await ExerciseService.createExercise(request) ) {
            res.status(422).send({status: false});
            return;
        }



        res.status(200).send({status: true});
    } // End create Exercise


    async getExercises(
        req,
        res
    ) {

        const request = req;
        const data = await ExerciseService.getExercises(request);
        res.status(200).send(data);
    } // End create Exercise
    
    async deleteExercise(
        req,
        res
    ) {
        const request = req;

        if(! await ExerciseService.deleteExercise(request)) {
            res.status(422).send({status: false});
            return;
        }

        res.status(200).send({status: true});
    }

    async updateExercise(
        req,
        res
    ) {
        const request = req;
        
        if(! await ExerciseService.updateExercise(request)) {
            res.status(422).send({status: false});
            return;
        }

        res.status(200).send({status: true});
    }

} // End class AuthController

export default new ExerciseController();