/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});




//
//  ACCOUNTS
//


// Get user account details
async function getAccountDetails() {

    let message = await fetch("http://localhost:8000/api/v1/accounts/details");

    var data = await message.json();

    console.log(data);

    // When editing information
    document.getElementById("editFirstName").placeholder = data.first_name;
    document.getElementById("editLastName").placeholder = data.last_name;
    document.getElementById("editUsername").placeholder = data.username;
    document.getElementById("editEmail").placeholder = data.email;
    document.getElementById("editPhone").placeholder = data.phone_number;
    document.getElementById("editAddress").placeholder = data.address;
    document.getElementById("editBio").placeholder = data.bio;


    //Account Page Details
    document.getElementById("profileFirst").innerHTML = data.first_name;
    document.getElementById("profileLast").innerHTML = data.last_name;
    document.getElementById("profileBio").innerHTML = data.bio;

    document.getElementById("accountFirstName").innerHTML = data.first_name;
    document.getElementById("accountLastName").innerHTML = data.last_name;
    document.getElementById("accountUsername").innerHTML = data.username;
    document.getElementById("accountEmail").innerHTML = data.email;
    document.getElementById("accountPhone").innerHTML = data.phone_number;
    document.getElementById("accountAddress").innerHTML = data.address;
}

// Delete account
async function deleteAccount() {

    let message = await fetch("http://localhost:8000/api/v1/accounts/delete");

    var data = await message.json();

    console.log(data);
    changeAuth()
}

// Log out of account
async function logoutAccount() {
    response = await fetch("http://localhost:8000/api/v1/logout", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()
    changeAuth();
}

// Edit account
async function editValues() {
    editFirst = document.getElementById("editFirstName").value;
    editLast = document.getElementById("editLastName").value;
    editUsername = document.getElementById("editUsername").value;
    editEmail = document.getElementById("editEmail").value;
    editPhone = document.getElementById("editPhone").value;
    editAddress = document.getElementById("editAddress").value;
    editBio = document.getElementById("editBio").value;
    editPassword = document.getElementById("editPassword").value;

    clearEditForm();

    accountDetails = {
        first_name : editFirst,
        last_name : editLast,
        username : editUsername,
        email : editEmail,
        phone : editPhone,
        address : editAddress,
        bio : editBio,
        password : editPassword
    }

    response = await fetch("http://localhost:8000/api/v1/accounts/update", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(accountDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });
    
    data = await response.json()
    console.log(data)

    changeAuth()
}


// Getting form values for login
async function formValues() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    // Clear form values
    document.getElementById('email').value='';
    document.getElementById('password').value='';

    accountDetails = {
        email : email,
        password : password
    }

    response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(accountDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });
    
    data = await response.json()
    if (data.auth == false) {
        alert("Incorrect Details")
    }

    changeAuth();
}

// Getting form values for signup page
async function createAccount() {
    form_firstname = document.getElementById("firstName").value;
    form_secondname = document.getElementById("lastName").value;
    form_username = document.getElementById("username").value;
    form_email = document.getElementById("emailCreate").value;
    form_password = document.getElementById("passwordCreate").value;

    // Clear form
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("emailCreate").value = "";
    document.getElementById("passwordCreate").value = "";

    accountDetails = {
        first_name : form_firstname,
        second_name : form_secondname,
        username : form_username,
        email : form_email,
        password : form_password
    }

    response = await fetch("http://localhost:8000/api/v1/signup", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(accountDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });
    
    data = await response.json()
    console.log(data)

    changeToSignup()
}


// Onload check if the user was previously authenticated
async function changeAuth() {
    response = await fetch("http://localhost:8000/api/v1/check", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    // Change page depending on auth
    displayLogin(data)
}

// Changing account page based on session
function displayLogin(data) {

    var account = document.getElementById('accountPage');
    var login = document.getElementById('loginPage');

    if (data.auth == true) {
        account.style.display = "block";
        login.style.display = "none";
        getAccountDetails(); // Display account information 
    }
    else {
        account.style.display = "none";
        login.style.display = "block";
    }

}


// Change between signup and login page
function changeToSignup() {
    var login = document.getElementById('loginPage');
    var signup = document.getElementById('signupPage');

    if (login.style.display == "block") {
        login.style.display = "none"
        signup.style.display = "block"
    }
    else {
        login.style.display = "block"
        signup.style.display = "none"
    }
}


// Clearing edit modal after changing details 
function clearEditForm() {
    document.getElementById('editFirstName').value='';
    document.getElementById('editLastName').value='';
    document.getElementById('editUsername').value='';
    document.getElementById('editEmail').value='';
    document.getElementById('editPhone').value='';
    document.getElementById('editAddress').value='';
    document.getElementById('editBio').value='';
    document.getElementById('editPassword').value='';
    document.getElementById('editPassword').type= "password"
    document.getElementById('checkPass').checked= false
}


// Toggle password visibility 
function togglePass() {
    var x = document.getElementById("editPassword");

    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

//
//  END ACCOUNTS
//



//
//  EXERCISE
//

// Check if the user is authenticated
async function checkExerciseAuth() {
    response = await fetch("http://localhost:8000/api/v1/check", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    // Change which page to display depending on auth
    var exercise = document.getElementById('exercisePage');

    if (data.auth == true) {
        exercise.style.display = "block";
        loadExercises();
    }
    else {
        exercise.style.display = "none";
        window.location.replace("/account");
    }
}


// Load user's exercises
async function loadExercises() {
    response = await fetch("http://localhost:8000/api/v1/exercises", {
        method: "GET",
        credentials: "include",
    });
    
    console.log(response)
    data = await response.json()
    console.log(data)

    var node = document.getElementById('exerciseTable');
    
    var htmlString = "";

    //Cycle through each of the user's exercise and display on page
    for (var i = 0; i < data.length; i++) {
        htmlString = htmlString + `<tr class="align-middle">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="h6 mb-0 lh-1">
                                                        ${data[i].name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            ${data[i].personal_record}
                                        </td>
                                        <td>
                                            <button class="btn btn-outline-danger" onclick="deleteExercise(${data[i].exercise_id});"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>`;
    }
    node.innerHTML = htmlString;
}

// Create a new exercise
async function createExercise() {
    editExercise = document.getElementById("addExerciseName").value;
    editExercisePR = document.getElementById("addExercisePR").value;

    if (editExercisePR == "") {
        editExercisePR = "0";
    }


    // Clear form input
    document.getElementById('addExerciseName').value='';
    document.getElementById('addExercisePR').value='';
    

    exerciseDetails = {
        exercise_name : editExercise,
        exercise_pr : editExercisePR
    }

    // Post new exercise to the database
    response = await fetch("http://localhost:8000/api/v1/exercises", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(exerciseDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });
    
    data = await response.json()

    // Wait a second before loading exercises
    new Promise(resolve => setTimeout(resolve, 1500)).then(() => {loadExercises();});


}

// Delete exercises
async function deleteExercise(exerciseID) {

    exerciseDetails = {
        exercise_id : exerciseID
    }

    response = await fetch("http://localhost:8000/api/v1/exercises", {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(exerciseDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });

    data = await response.json();
    console.log(data);

    loadExercises();
}

//
//  END EXERCISE
//


//
// WORKOUTS
//


// Check if the user is authenticated
async function checkWorkoutAuth() {
    response = await fetch("http://localhost:8000/api/v1/check", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    // // Change workout page depending on auth
    var workout = document.getElementById('workoutPage');

    console.log("check function called");

    if (data.auth == true) {
        workout.style.display = "block";
        loadWorkouts();
    }
    else {
        workout.style.display = "none";
        window.location.replace("/account");
    }
}


// Get workouts and display on screen
async function loadWorkouts() {
    response = await fetch("http://localhost:8000/api/v1/workouts", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    var node = document.getElementById('workoutsTable');
    
    var workoutHTML = "";

    // Go through each workout, exercise and set and display on page
    for (var workoutIndex = 0; workoutIndex < data.length; workoutIndex++) {
        console.log(data[workoutIndex]);
        workoutHTML = workoutHTML + ` <tr class="align-middle">
        <td>
            <div class="d-flex align-items-center">
                <div>
                    <div class="h6 mb-0 lh-1">
                        ${data[workoutIndex].name}
                    </div>
                </div>
            </div>
        </td>
        <td>
        <table>`;

        var exerciseHTML = "";
        for(var exerciseIndex = 0; exerciseIndex < data[workoutIndex].exercises.length; exerciseIndex++) {
            exerciseHTML = exerciseHTML + `
            <tr>
                <td>${data[workoutIndex].exercises[exerciseIndex].name}
                <table>    
            `
            
            
            exerciseHTML = exerciseHTML + `<tr>
                <td style="text-indent: 50px;">${data[workoutIndex].exercises[exerciseIndex].sets.length} set(s)</td>
            </tr>`


            exerciseHTML = exerciseHTML +
            `</table>
                </td>
                
            </tr>
            `;


        }

        workoutHTML = workoutHTML + exerciseHTML;


        workoutHTML = workoutHTML + " </table>";
        workoutHTML = workoutHTML + `<td>
                                        <button class="btn btn-outline-primary" onclick="startWorkout(${data[workoutIndex].workout_id});"><i class="bi bi-play-fill"></i></button>
                                    </td>`

        workoutHTML = workoutHTML + `<td>
                                        <button class="btn btn-outline-danger" onclick="deleteWorkout(${data[workoutIndex].workout_id});"><i class="bi bi-trash"></i></button>
                                    </td>`
    }

    node.innerHTML = workoutHTML;  

    console.log(node.innerHTML);
    
    
}

// Delete workout from database
async function deleteWorkout(workoutID) {
    workoutDetails = {
        workout_id : workoutID
    }

    response = await fetch("http://localhost:8000/api/v1/workouts", {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(workoutDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });

    data = await response.json();
    console.log(data);

    // Wait a second before loading exercises
    new Promise(resolve => setTimeout(resolve, 1500)).then(() => {loadWorkouts();});
}

// Create workout and post to database
async function createWorkout() {
    newWorkout = document.getElementById("addWorkoutName").value;


    // Clear form input
    document.getElementById('addWorkoutName').value='';
    

    workoutDetails = {
        workout_name : newWorkout
    }

    response = await fetch("http://localhost:8000/api/v1/workouts", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(workoutDetails),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });
    
    data = await response.json()

    // Wait a second before loading exercises
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {loadWorkouts();});

}

// Start a workout
async function startWorkout(workout) {

    apiGet = "http://localhost:8000/api/v1/workouts/" + workout;

    response = await fetch(apiGet, {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    var workoutPage = document.getElementById('workoutPage');
    var startWorkoutPage = document.getElementById('startWorkoutPage');

    workoutPage.style.display = "none";
    startWorkoutPage.style.display = "block";

    var node = document.getElementById('startWorkoutsTable');
    
    var workoutHTML = "";


    // Load a new page with the started workout
    workoutHTML = workoutHTML + ` <tr class="align-middle">
    <td>
        <div class="d-flex align-items-center">
            <div>
                <div class="h6 mb-0 lh-1">
                    ${data.name}
                </div>
            </div>
        </div>
    </td>
    <td>
    <table>`;

    var exerciseHTML = "";
    for(var exerciseIndex = 0; exerciseIndex < data.exercises.length; exerciseIndex++) {
        exerciseHTML = exerciseHTML + `
        <tr>
            <td>${data.exercises[exerciseIndex].name} <button class="btn btn-outline-primary btn-sm" onclick="addSet(${data.workout_id}, ${exerciseIndex})">
            <i class="bi bi-plus"></i></button> <button class="btn btn-outline-danger btn-sm" onclick="deleteSet(${data.workout_id}, ${exerciseIndex})"><i class="bi bi-dash-lg"></i></button>
            <button class="btn btn-outline-danger btn-sm"><i class="bi bi-trash" onclick="deleteFromWorkout(${data.workout_id}, ${exerciseIndex});"></i></button>
            <table>    
        `
        
        
        for(var setsIndex = 0; setsIndex < data.exercises[exerciseIndex].sets.length; setsIndex++) {
                            var setsHTML = "";
                            setsHTML = setsHTML + `<tr>
                                                        <td>
                                                            Set: ${data.exercises[exerciseIndex].sets[setsIndex][0]} <input id="Exercise${exerciseIndex}Set${setsIndex}" 
                                                            class="form-control  form-control-sm" type="text" placeholder="Weight (kg)" value="${data.exercises[exerciseIndex].sets[setsIndex][1]}">
                                                            <input id="RepExercise${exerciseIndex}RepSet${setsIndex}" class="form-control form-control-sm" type="text" 
                                                            placeholder="Reps" value="${data.exercises[exerciseIndex].sets[setsIndex][2]}"></td>
                                                        </td>

                                                    </tr>`
                            exerciseHTML = exerciseHTML + setsHTML;
        }


        exerciseHTML = exerciseHTML +
        `</table>
            </td>
        </tr>`;


    }

    workoutHTML = workoutHTML + exerciseHTML;
    


    workoutHTML = workoutHTML + `</table>`;

    node.innerHTML = workoutHTML;  

    // Change button's onclick to the relevant workout
    document.getElementById("finishWorkoutButton").onclick = function () {finishedWorkout(data);};
    document.getElementById("addExerciseWorkoutButton").onclick = function () {loadExerciseWorkout(data);};
    document.getElementById("saveChangesButton").onclick = function () {startWorkout(workout);};

}

// Add a set to an exercise
async function addSet(workout, exercise) {
    apiGet = "http://localhost:8000/api/v1/workouts/" + workout;

    response = await fetch(apiGet, {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    for(var exerciseIndex = 0; exerciseIndex < data.exercises.length; exerciseIndex++) {
        for(var setsIndex = 0; setsIndex < data.exercises[exerciseIndex].sets.length; setsIndex++) {
            weight = document.getElementById(("Exercise" + [exerciseIndex] + "Set" + [setsIndex]).replaceAll(' ', '')) 
            rep = document.getElementById(("RepExercise" + [exerciseIndex] + "RepSet" + [setsIndex]).replaceAll(' ', ''))
            data.exercises[exerciseIndex].sets[setsIndex][1] = parseFloat(weight.value);
            data.exercises[exerciseIndex].sets[setsIndex][2] = parseInt(rep.value);
        }
    }

    
    data.exercises[exercise].sets[data.exercises[exercise].sets.length] = [data.exercises[exercise].sets.length + 1, 0, 0];

    updateWorkout(data);
}

// Remove a set from an exercise
async function deleteSet(workout, exercise) {
    apiGet = "http://localhost:8000/api/v1/workouts/" + workout;

    response = await fetch(apiGet, {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    for(var exerciseIndex = 0; exerciseIndex < data.exercises.length; exerciseIndex++) {
        for(var setsIndex = 0; setsIndex < data.exercises[exerciseIndex].sets.length; setsIndex++) {
            weight = document.getElementById(("Exercise" + [exerciseIndex] + "Set" + [setsIndex]).replaceAll(' ', '')) 
            rep = document.getElementById(("RepExercise" + [exerciseIndex] + "RepSet" + [setsIndex]).replaceAll(' ', ''))
            data.exercises[exerciseIndex].sets[setsIndex][1] = parseFloat(weight.value);
            data.exercises[exerciseIndex].sets[setsIndex][2] = parseInt(rep.value);
        }
    }

    data.exercises[exercise].sets.pop()
    console.log(data)

    updateWorkout(data);
}

// Displaying the user's exercises when they want to add an exercise to the workout
async function loadExerciseWorkout(workout) {
    response = await fetch("http://localhost:8000/api/v1/exercises", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()

    var node = document.getElementById('addWorkoutTable');
    
    var htmlString = "";

    for (var i = 0; i < data.length; i++) {
        htmlString = htmlString + `<tr class="align-middle">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <div class="h6 mb-0 lh-1">
                                                        ${data[i].name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            ${data[i].personal_record}
                                        </td>
                                        <td>
                                            <button class="btn btn-outline-primary" onclick="addExerciseToWorkout(${workout.workout_id}, ${i});"><i class="bi bi-plus"></i></button>
                                        </td>
                                    </tr>`;
    }
    node.innerHTML = htmlString;
}

// Adds the new exercise to the workout
async function addExerciseToWorkout(workout, exercise) {
    exerciseResponse = await fetch("http://localhost:8000/api/v1/exercises", {
        method: "GET",
        credentials: "include",
    });

    exerciseData = await exerciseResponse.json()

    apiGet = "http://localhost:8000/api/v1/workouts/" + workout;

    workoutResponse = await fetch(apiGet, {
        method: "GET",
        credentials: "include",
    });
    
    workoutData = await workoutResponse.json()

    workoutData.exercises[workoutData.exercises.length] = exerciseData[exercise]
    workoutData.exercises[workoutData.exercises.length - 1].sets = [[1, 0, 0]]
    
    response = await fetch("http://localhost:8000/api/v1/workouts/update", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(workoutData),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });


}

// Updates the workout after each change
async function updateWorkout(data) {

    response = await fetch("http://localhost:8000/api/v1/workouts/update", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });
    
    console.log(data);

    startWorkout(data.workout_id);

}

// Remove an exercise from a workout
async function deleteFromWorkout(workout, exerciseID) {
    apiGet = "http://localhost:8000/api/v1/workouts/" + workout;

    workoutResponse = await fetch(apiGet, {
        method: "GET",
        credentials: "include",
    });
    
    workoutData = await workoutResponse.json()

    
    workoutData.exercises.splice(exerciseID, 1);
    
    updateWorkout(workoutData);

}

// Gets the input of reps and weight done from the user and saves it to the database
async function finishedWorkout(data) {

    for(var exerciseIndex = 0; exerciseIndex < data.exercises.length; exerciseIndex++) {
        for(var setsIndex = 0; setsIndex < data.exercises[exerciseIndex].sets.length; setsIndex++) {
            weight = document.getElementById(("Exercise" + [exerciseIndex] + "Set" + [setsIndex]).replaceAll(' ', '')) 
            rep = document.getElementById(("RepExercise" + [exerciseIndex] + "RepSet" + [setsIndex]).replaceAll(' ', ''))
            data.exercises[exerciseIndex].sets[setsIndex][1] = parseFloat(weight.value);
            data.exercises[exerciseIndex].sets[setsIndex][2] = parseInt(rep.value);
        }
    }

    data.status = true;
    
    response = await fetch("http://localhost:8000/api/v1/workouts/update", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    });

    window.location.replace("/workout");
}

//
//  END WORKOUTS
//