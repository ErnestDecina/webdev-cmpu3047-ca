import AccountsService from "../services/AccountsService.js";
import AuthenticationService from "../services/AuthenticationService.js";


class AccountsController {
    async signup(
        req,
        res
    ) {
        const request = req;

        // Check if the Account Signup was unsuccsessful
        if(!await AccountsService.signup(request)) {
            res.status(409).send({"auth": false});
            return;
        }

        // Successful User Signup
        res.status(200).send({"auth": true});
    } // End signup()


    async getUserDetails(
        req,
        res
    ) {
        const request = req;

        // Get Details of a single user
        const data = await AccountsService.getUserDetails(request) 

        // Check if get details was unsuccessful
        if(!data) {
            res.status(401).send({"status": false});
            return;
        }

        // Successful Get Details of user
        res.status(200).send(data);
    } // End delete()

    
    async delete(
        req,
        res
    ) {
        const request = req;
        

        // Delete the user account and check if it was unsuccessful
        if(!await AccountsService.delete(request)) {
            res.status(401).send({"status": false});
            return;
        }

        // Logout user out and check if it was unsuccessful
        if(!await AuthenticationService.logout(request)) {
            res.status(401).send({"status": false});
            return;
        }

        // Successful Account Delete
        res.status(200).send({"status": true});
    } // End delete()


    async update(
        req,
        res
    ) {
        const request = req;

        // Update User details and check if it was unsuccessful
        if(!await AccountsService.update(request)) {
            res.status(401).send({"status": false});
            return;
        }

        // Successful User details update
        res.status(200).send({"status": true});
    } // End delete()


    async check (
        req,
        res,
        next 
    ) {

        // Check if the user is Validated and check if it was unsuccsessful
        if(! await AuthenticationService.validateUser(req)) {
            res.status(401).send({"status": false});
            return; 
        } // End if
        
        // Call next Synchronousy Function
        next();
    } // End exmapleSessionCheck()
} // End class AuthController

export default new AccountsController();