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
        const email = request.body.email;
        const password = request.body.password;

        // Check if username or password is empty.
        if( !email || !password ) {
            return false;
        } // End if 

        // Look for using in DB
        // Look for user using index
        const user = await mysql_database.querySearchUserId(email); 
        
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
        request.session.email = user_data.email;

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
        const user_username = request.body.username;
        const user_email = request.body.email;
        const user_password = request.body.password;

        // Check if Username already Exists
        const user_data_username = await mysql_database.querySearchUserId(user_username); 

        // UserName found
        if(user_data_username != -1) return false;

        const user_data_email = await mysql_database.querySearchUserEmail(user_email);

        // Email found
        if(user_data_email != -1) return false;

        // Create a new account
        const hash_password = await bcrypt.hash(user_password, bcrypt_salt_rounds);
        mysql_database.insertNewUser(user_username, user_email, hash_password);

        return true;
    } // End signup()


    /**
     * 
     * @param {*} request 
     * @returns 
     */
    async validateUser(
        request
    ) {
        if(!request.session.email || !request.session.uid || !request.session.email) return false;

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