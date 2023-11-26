import AccountsService from "../services/AccountsService.js";
import AuthenticationService from "../services/AuthenticationService.js";



class AccountsController {
    async signup(
        req,
        res
    ) {
        const request = req;

        if(!await AccountsService.signup(request)) {
            res.status(409).send({"auth": false});
            return;
        }

        res.status(200).send({"auth": true});
    } // End signup()

    
    async delete(
        req,
        res
    ) {
        const request = req;

        if(!await AccountsService.delete(request)) {
            res.status(401).send({"status": false});
            return;
        }

        res.status(200).send({"status": true});
    } // End delete()


    async update(
        req,
        res
    ) {
        const request = req;

        if(!await AccountsService.update(request)) {
            res.status(401).send({"status": false});
            return;
        }

        res.status(200).send({"status": true});
    } // End delete()


    async check (
        req,
        res,
        next
    ) {
        if(! await AuthenticationService.validateUser(req)) {
            res.status(401).send({"status": false});
            return; 
        } // End if
            

        next();
    } // End exmapleSessionCheck()
} // End class AuthController

export default new AccountsController();