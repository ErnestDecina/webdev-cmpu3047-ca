import AuthenticationService from "../services/AuthenticationService.js";



class AuthController {
    async login (
        req,
        res
    ) {
        try {
            const reuqest = req;
            
            // Check if login failed
            if( !await AuthenticationService.login(reuqest) ) {}
                res.status(401).send({"auth": false});


            res.status(200).send({"auth": true});
        } catch (error) {
            res.status(401)
        }
    } // End login()


    async signup(
        req,
        res
    ) {
        const request = req;

        if(!await AuthenticationService.signup(request)) {
            res.status(409).send({"auth": false});
            return;
        }
            

            res.status(200).send({"auth": true});

    } // End signup()


    async logout (
        req,
        res
    ) {
        const reuqest = req;

        if(! await AuthenticationService.logout(reuqest))
            res.status(401).send({"auth": false});

        res.status(200).send({"auth": true});
    } // End logout()


    async check (
        req,
        res
    ) {
        if(! await AuthenticationService.validateUser(req)) {
            res.status(401).send({"auth": false});
            return; 
        } // End if
            

        res.status(200).send({"auth": true});
    } // End exmapleSessionCheck()
} // End class AuthController

export default new AuthController();