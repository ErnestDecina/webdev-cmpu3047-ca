import AuthenticationService from "../services/AuthenticationService.js";

class ExampleController {
    async example(
        req,
        res
    ) {
        try {
            res.status(200).send(
                {
                    message: "Hello World",
                    image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8okRIirv-byapDRLwZbkdWBz_f-bX1JgFQ19mQ5jH&s"
                }
            );
        } catch (error) {
            res.status(401)
        }
    } // End example()

    async exampleLogin(
        req,
        res
    ) {
        try {
            console.log(req.body)
            res.sendStatus(200)
        } catch (error) {
            res.status(401)
        }
    } // End exampleLogin()

    async exmapleSessionCheck(
        req,
        res
    ) {
        if(! await AuthenticationService.validateUser(req)) {
            res.status(401).send({"message": "Unauthorized"});
            return; 
        } // End if
            

        res.status(200).send({"message": "Authorized"});
    } // End exmapleSessionCheck()
} // End class ExampleController

export default new ExampleController();