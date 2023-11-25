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



async function getapi() {

    let message = await fetch("http://localhost:8000/api/v1/test");

    var data = await message.json();

    console.log(data);
    // document.getElementById("testImage").src = data.image_link;
}


// Changing account page based on session
function displayLogin(data) {

    var account = document.getElementById('accountPage');
    var login = document.getElementById('loginPage');

    if (data.auth == true) {
        account.style.display = "block";
        login.style.display = "none";
    }
    else {
        account.style.display = "none";
        login.style.display = "block";
    }

}

// Getting form values 
async function formValues() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    accountDetails = {
        username : email,
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
    console.log(data)

    displayLogin(data)
}

// Onload check if the user ws previously authenticated
async function changeAuth() {
    response = await fetch("http://localhost:8000/api/v1/check", {
        method: "GET",
        credentials: "include",
    });
    
    data = await response.json()
    console.log(data)

    // Change page depending on auth
    displayLogin(data)
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
