import AuthenticationService from "../services/AuthenticationService.js";



class AuthController {
    async login (
        req,
        res
    ) {
        try {
            const reuqest = req;
            
            // Login user and check if it was unsuccessful
            if( !await AuthenticationService.login(reuqest) ) {
                res.status(401).send({"auth": false});
                return;
            }
                
            // Successful User Login
            res.status(200).send({"auth": true});
        } catch (error) {

            // Check if Login code breaks on server side
            res.status(401)
        }
    } // End login()


    async logout (
        req,
        res
    ) {
        const reuqest = req;

        // Log user out and check if it was unsuccessful
        if(! await AuthenticationService.logout(reuqest)) {
            res.status(401).send({"auth": false});
            return;
        }   
            
        // Successful Logout 
        res.status(200).send({"auth": true});
    } // End logout()


    async check (
        req,
        res
    ) {

        // Check if user is Session is valid and check if unsuccessful
        if(! await AuthenticationService.validateUser(req)) {
            res.status(401).send({"auth": false});
            return; 
        } // End if
            

        // User Session is Valid
        res.status(200).send({"auth": true});
    } // End exmapleSessionCheck()
} // End class AuthController

export default new AuthController();