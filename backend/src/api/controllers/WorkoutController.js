import AccountsService from "../services/AccountsService.js";
import AuthenticationService from "../services/AuthenticationService.js";
import ExerciseService from "../services/ExerciseService.js";
import WorkoutService from "../services/WorkoutService.js";



class WorkoutController {
    async getWorkouts(
        req,
        res
    ) {
        const request = req;
        const data = await WorkoutService.getWorkouts(request);
        res.status(200).send(data);
    } // End getWorkouts

    async getWorkout(
        req,
        res
    ) {
        const request = req;
        const data = await WorkoutService.getWorkout(request);

        if(!data) {
            res.status(401).send({
                "name": "ERROR"
            });
        } // End if

        res.status(200).send(data);
    } // End getWorkouts


    async createWorkout(
        req,
        res
    ) {
        const request = req;

        if(! await WorkoutService.createWorkout(request) ) {
            res.status(422).send({status: false});
            return;
        }



        res.status(200).send({status: true});
    } // End create Exercise



    
    async deleteWorkout(
        req,
        res
    ) {
        const request = req;

        if(! await WorkoutService.deleteWorkout(request)) {
            res.status(422).send({status: false});
            return;
        }

        res.status(200).send({status: true});
    }

    async updateWorkout(
        req,
        res
    ) {
        const request = req;
        
        if(! await WorkoutService.updateWorkout(request)) {
            res.status(422).send({status: false});
            return;
        }

        res.status(200).send({status: true});
    }
} // End class AuthController

export default new WorkoutController();