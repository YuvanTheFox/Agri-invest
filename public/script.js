document.addEventListener('DOMContentLoaded', function() {

    // Event listener for the Sign-Up form submission
    document.getElementById('signupForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const category = document.getElementById('category').value;

        if (!firstName || !lastName || !email || !mobile || !category) {
            alert("Please fill in all the fields.");
            return;
        }

        alert("Sign-up successful! Redirecting to home page...");
        window.location.href = "home.html"; // Redirect to home page after sign-up
    });

    // Event listener for the Login form submission
    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        alert("Login successful! Redirecting to home page...");
        window.location.href = "home.html"; // Redirect to home page after login
    });

    // Event listener for the "Get Started" button
    document.getElementById('getStartedButton')?.addEventListener('click', function() {
        window.location.href = "http://localhost:3000/"; // Redirect to the local server
    });

});
