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
        async getUserDetails(
            request
        ) {
            const user_id = request.session.uid;
            const user_email = request.session.email;

            // Check if Account Exists
            const user_data = await mysql_database.querySearchUserId(user_email); 

            // Account not found
            if(user_data == -1) return undefined;
            
            var user_details = await mysql_database.queryUserDetails(user_id);
            user_details.password = "";
            return user_details;
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
    } // End delete()


    /**
     * 
     * @param {*} request 
     */
        async update(
            request
        ) {
            const user_uid = request.session.uid;
            const user_email = request.session.email;
    
            // Check if Account Exists
            const user_data = await mysql_database.querySearchUserId(user_email); 
    
            // Account not found
            if(user_data == -1) return false;

            const user = await mysql_database.queryUserDetails(user_uid);

            // Using Turnary Operator to assign the value of new_(table colmn)
            const new_first_name = (request.body.first_name) ?  request.body.first_name : user.first_name;
            const new_last_name = (request.body.last_name) ? request.body.last_name : user.last_name;
            const new_username = (request.body.username) ? request.body.username : user.username;
            const new_email = (request.body.email) ? request.body.email : user.email;
            const new_phone = (request.body.phone) ? request.body.phone : user.phone_number;
            const new_address = (request.body.address) ? request.body.address : user.address;
            const new_bio = (request.body.bio) ? request.body.bio : user.bio;
            const new_password = (request.body.password) ? await bcrypt.hash(request.body.password, bcrypt_salt_rounds) : user.password;
        
            // Update account
            await mysql_database.updateUser(
                user_uid,
                new_first_name,
                new_last_name,
                new_username,
                new_email,
                new_phone,
                new_address,
                new_bio,
                new_password
            );

            // Update the users session
            request.session.username = new_username;
            request.session.email = new_email;
    
            return true;
        } // End delete()

}

export default new AccountsService();