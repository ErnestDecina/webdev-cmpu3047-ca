import AuthenticationService from "../services/AuthenticationService.js";


class AuthController {
    async login (
        req,
        res
    ) {
        try {
            const reuqest = req;

            // Check if login failed
            if( !await AuthenticationService.login(reuqest) ) {
                res.status(401).send({"message": "Unauthorized"});
            } // End if

            res.status(200).send({"message": "Authorized"});
        } catch (error) {
            res.status(401)
        }
    } // End login

} // End class AuthController

export default new AuthController();