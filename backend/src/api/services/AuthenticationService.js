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
        request.session.uid = user_data.user_id;
        request.session.username = user_data.username;

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
        const session_username = request.session.username;
        const session_id = request.session.uid;

        if(!session_username || !session_password) return false;

        // Check if username and id match
        const user = await mysql_database.querySearchUserId(username); 

        // No user found
        if(user == -1) return false;

        const user_id = user.user_id;

        const user_data = await mysql_database.queryUserDetails(user_id); 

        if(user_data.user_id != session_id) return false;
        
        if(user_data.username != session_username) return false;


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