// Sign In functionality
const signInButton = document.getElementById('signInButton');
const signOutButton = document.getElementById('signOutButton');
const signInModal = document.getElementById('signInModal');
const submitSignIn = document.getElementById('submitSignIn');
const showPasswordSignIn = document.getElementById('showPasswordSignIn');
const signInPassword = document.getElementById('signInPassword');
const switchToSignUp = document.getElementById('switchToSignUp');

// Security variables
let loginAttempts = 0;
let lastAttemptTime = 0;
const attemptLimits = [
    { attempts: 3, delay: 0 }, // First 3 attempts: no delay
    { attempts: 4, delay: 3000 }, // 4th attempt: 3 seconds delay
    { attempts: 5, delay: 60000 }, // 5th attempt: 1 minute delay
    { attempts: 6, delay: 1800000 }, // 6th attempt: 30 minutes delay
];

// Check if user is already signed in
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (isLoggedIn) {
    toggleAuthButtons(true);
}

// Open Sign In modal
signInButton.addEventListener('click', () => {
    signInModal.style.display = 'flex';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signInModal) {
        signInModal.style.display = 'none';
    }
});

// Handle Sign In submission
submitSignIn.addEventListener('click', () => {
    const username = document.getElementById('signInUsername').value.trim(); // Trim whitespace
    const password = signInPassword.value.trim(); // Trim whitespace

    // Debugging: Log entered and stored values
    console.log('Entered Username:', username);
    console.log('Entered Password:', password);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Stored Users:', users);

    // Check if the user is blocked due to too many attempts
    if (loginAttempts >= 6) {
        alert('Too many attempts. Please try again later.');
        return;
    }

    // Check if the user needs to wait before attempting again
    const currentTime = Date.now();
    const delay = getDelayForAttempt(loginAttempts + 1);
    if (currentTime - lastAttemptTime < delay) {
        const remainingTime = Math.ceil((delay - (currentTime - lastAttemptTime)) / 1000);
        alert(`Please wait ${remainingTime} seconds before trying again.`);
        return;
    }

    // Simulate user validation
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert(`Welcome back, ${username}!`);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user)); // Store the current user
        toggleAuthButtons(true);
        signInModal.style.display = 'none';
        loginAttempts = 0; // Reset login attempts on successful login
    } else {
        loginAttempts++;
        lastAttemptTime = Date.now();
        alert(`Invalid username or password. Attempts remaining: ${6 - loginAttempts}`);
    }
});

// Show Password functionality
showPasswordSignIn.addEventListener('change', () => {
    signInPassword.type = showPasswordSignIn.checked ? 'text' : 'password';
});

// Switch to Sign Up modal
switchToSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    signInModal.style.display = 'none';
    signUpModal.style.display = 'flex';
});

// Sign Out functionality
signOutButton.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn'); // Clear the login flag
    localStorage.removeItem('currentUser'); // Clear the current user data
    toggleAuthButtons(false);
    alert('You have been signed out.');
});

// Toggle between Sign In/Sign Up and Sign Out buttons
function toggleAuthButtons(isLoggedIn) {
    if (isLoggedIn) {
        signInButton.style.display = 'none';
        signUpButton.style.display = 'none';
        signOutButton.style.display = 'block';
    } else {
        signInButton.style.display = 'block';
        signUpButton.style.display = 'block';
        signOutButton.style.display = 'none';
    }
}

// Get delay for the current attempt
function getDelayForAttempt(attempt) {
    for (const limit of attemptLimits) {
        if (attempt <= limit.attempts) {
            return limit.delay;
        }
    }
    return 0;
}