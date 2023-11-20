import AuthenticationService from "../services/AuthenticationService.js";


class AuthController {
    async login (
        req,
        res
    ) {
        try {
            const reuqest = req;

            // Check if login failed
            if( !await AuthenticationService.login(reuqest) ) 
                res.status(401).send({"message": "Unauthorized"});
        

            res.status(200).send({"message": "Authorized"});
        } catch (error) {
            res.status(401)
        }
    } // End login()

    async logout (
        req,
        res
    ) {
        const reuqest = req;

        if(! await AuthenticationService.logout(reuqest))
            res.status(401).send({"message": "Unauthorized"});

        res.status(200).send({"message": "Successful Logout"});
    } // End logout()
} // End class AuthController

export default new AuthController();