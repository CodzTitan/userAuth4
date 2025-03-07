const backendUrl = 'https://userauth4.onrender.com'; // Replace with your Render URL

// Form switching functions
function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        showHome();
    }
}

// Show home page
function showHome() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Logout
function logout() {
    localStorage.removeItem('token');
    showLogin();
}

// Login form submission
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch("https://userauth4.onrender.com/api/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            showHome();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('An error occurred');
        console.error(error);
    }
});

// Signup form submission
document.getElementById('signup').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch("https://userauth4.onrender.com/api/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            alert('Signup successful! Please login.');
            showLogin();
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        alert('An error occurred');
        console.error(error);
    }
});

// Check auth on page load
checkAuth();