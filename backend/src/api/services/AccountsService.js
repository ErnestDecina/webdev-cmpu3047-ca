import { mysql_database } from "../../index.js";
import bcrypt from "bcrypt";
import { bcrypt_salt_rounds } from "../../config/express.config.js";


class AccountsService {


    /**
     * 
     * @param {*} request 
     */
    async signup(
        request
    ) {
        const user_first_name = request.body.first_name;
        const user_last_name = request.body.second_name;
        const user_username = request.body.username;
        const user_email = request.body.email;
        const user_password = request.body.password;

        // Check if Username already Exists
        const user_data_username = await mysql_database.querySearchUserId(user_email); 

        // UserName found
        if(user_data_username != -1) return false;

        const user_data_email = await mysql_database.querySearchUserEmail(user_email);

        // Email found
        if(user_data_email != -1) return false;

        // Create a new account
        const hash_password = await bcrypt.hash(user_password, bcrypt_salt_rounds);
        mysql_database.insertNewUser(user_username, user_email, hash_password, user_first_name, user_last_name);

        return true;
    } // End signup()


        /**
     * 
     * @param {*} request 
     */
        async delete(
            request
        ) {
            const user_email = request.session.email;
            const user_uid = request.session.uid;
    
            // Check if Account Exists
            const user_data = await mysql_database.querySearchUserId(user_email); 

            // Account not found
            if(user_data == -1) return false;
        
            // Delete account
            await mysql_database.deleteUser(user_uid);

            return true;
        } // End signup()


}

export default new AccountsService();