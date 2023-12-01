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

} // End class AuthController

export default new ExerciseController();