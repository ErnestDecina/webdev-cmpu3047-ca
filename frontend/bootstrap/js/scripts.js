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



function testFunction() {

    var x = document.getElementById('accountPage');
    var y = document.getElementById('loginPage');

    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    }
    else {
        x.style.display = "none";
        y.style.display = "block";
    }
}

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


}





