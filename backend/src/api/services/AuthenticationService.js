


class AuthenticationService {
    mockDB = [
        {
            uid: 1,
            username: "ErnestDecina",
            password: "Test"
        },
        {
            uid: 2,
            username: "Test1",
            password: "Test1"
        },
        {
            uid: 3,
            username: "Test2",
            password: "Test2"
        },
    ]

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

        // TODO: Check if username or password doesnt contain any special characters.
        var user_index = null

        // Look for using in DB
        try {
            // Look for user using index
            user_index = this.mockDB.map(e => e.username).indexOf(username);

            if(user_index == -1) return false;

            const user_data = this.mockDB[user_index];
            console.log(user_data)

            // Check if passwords match
            if (user_data.password != password) return false;

        } catch (error) {
            console.log("Failed with error: " + error);
            return false;
        } // End try catch

        // Set Session Data
        request.session.uid = this.mockDB[user_index].uid;
        request.session.username = username;

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
        if(!request.session.username || !request.session.uid) return false;

        console.log(request.session)
        return true;
    } // End valideUser
}

export default new AuthenticationService();