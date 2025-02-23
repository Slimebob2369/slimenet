// Sign Up functionality
const signUpButton = document.getElementById('signUpButton');
const signUpModal = document.getElementById('signUpModal');
const submitSignUp = document.getElementById('submitSignUp');
const showPasswordSignUp = document.getElementById('showPasswordSignUp');
const signUpPassword = document.getElementById('signUpPassword');
const switchToSignIn = document.getElementById('switchToSignIn');

// Open Sign Up modal
signUpButton.addEventListener('click', () => {
    signUpModal.style.display = 'flex';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === signUpModal) {
        signUpModal.style.display = 'none';
    }
});

// Handle Sign Up submission
submitSignUp.addEventListener('click', () => {
    const username = document.getElementById('signUpUsername').value.trim(); // Trim whitespace
    const password = signUpPassword.value.trim(); // Trim whitespace

    // Validate inputs
    if (username && password) {
        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username already exists
        const usernameExists = users.some(user => user.username === username);
        if (usernameExists) {
            alert('Username has been taken. Please choose a different username.');
            return;
        }

        // Create new user object
        const newUser = {
            username: username,
            password: password
        };

        // Add new user to the array
        users.push(newUser);

        // Save updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert(`Welcome, ${username}! You are now signed up. Please sign in.`);
        signUpModal.style.display = 'none';
        signInModal.style.display = 'flex'; // Redirect to Sign In modal
    } else {
        alert('Please fill in all fields.');
    }
});

// Show Password functionality
showPasswordSignUp.addEventListener('change', () => {
    signUpPassword.type = showPasswordSignUp.checked ? 'text' : 'password';
});

// Switch to Sign In modal
switchToSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpModal.style.display = 'none';
    signInModal.style.display = 'flex';
});