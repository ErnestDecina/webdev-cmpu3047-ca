import { mysql_database } from "../../index.js";
import bcrypt from "bcrypt";
import { bcrypt_salt_rounds } from "../../config/express.config.js";


class AuthenticationService {
    /**
     * 
     * @param {*} request 
     * @returns 
     */
    async login(
        request
    ) {
        const username = request.body.username;
        const password = request.body.password;

        // Check if username or password is empty.
        if( !username || !password ) {
            return false;
        } // End if 

        // Look for using in DB
        // Look for user using index
        const user = await mysql_database.querySearchUserId(username); 
        
        // No user found
        if(user == -1) return false;

        // Get userdata
        const user_data = await mysql_database.queryUserDetails(user.user_id); 

        // Check if passwords match
        // Use bcrypt
        if (!await bcrypt.compare(password, user_data.password)) return false;

        // Set Session Data
        console.log("Setting sessions")
        request.session.uid = user_data.user_id;
        request.session.username = user_data.username;
        console.log(user_data.user_id)
        console.log(user_data.username)

        return true;
    } // End login()


    /**
     * 
     * @param {*} request 
     */
    async logout(
        request
    ) { 
        // Check if session exists
        if(!request.session) return false;

        request.session.destroy();
        return true;
    } // En


    /**
     * 
     * @param {*} request 
     */
    async signup(
        request
    ) {

    } // End signup()


    /**
     * 
     * @param {*} request 
     * @returns 
     */
    async validateUser(
        request
    ) {
        console.log(request.session);

        if(!request.session.username || !request.session.uid) return false;

        return true;
    } // End valideUser
    

    /**
     * 
     * @param {*} error 
     * @returns 
     */
    catchError(error) {
        console.log(`Error: ${error}`);
        return false;
    }
}

export default new AuthenticationService();