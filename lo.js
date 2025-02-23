const welcomeBackElement = document.getElementById("welcome-back");
const loadingContainerElement = document.getElementById("loading-container");
const loadingTextElement = document.getElementById("loading-text");
const didYouKnowElement = document.getElementById("did-you-know");
const didYouKnowTipElement = document.getElementById("did-you-know-tip");
const backgroundBoxElement = document.getElementById("background-box");
const welcomeToSlimeworksElement = document.getElementById("welcome-to-slimeworks");
const welcomeLineElement = document.getElementById("welcome-line");
const buttonsContainerElement = document.getElementById("buttons-container");
const rainContainerElement = document.getElementById("rain-container");
const copyrightElement = document.getElementById("copyright");
const visitorCounterElement = document.getElementById("visitor-counter");
const visitorCountElement = document.getElementById("visitor-count");
const welcomeText = "Welcome Back";

// Random tips/messages
const tips = [
    "My Discord account is Slimebob5369.",
    "Check out my YouTube channel!",
    "This Loading Page is HTML, CS and JS.",
    "This took like 3 hours to make!",
    "I have 2167 YT SUBSCRIBERS",
    "Are you even reading this :P",
    "I Have 190 Discord Members!",
    "I can code using Minecraft Command Blocks",
    "Whats your feedback on this website?",
    "Guess What? What..."
];

// Function to animate the "Loading..." text
function animateLoadingText() {
    const states = ["Loading.", "Loading..", "Loading..."];
    let currentState = 0;

    setInterval(() => {
        loadingTextElement.textContent = states[currentState];
        currentState = (currentState + 1) % states.length; // Loop through states
    }, 500); // Change state every 500ms
}

// Function to display random tips with fade transition
function displayRandomTips() {
    let currentTip = 0;

    setInterval(() => {
        // Fade out the current tip
        didYouKnowTipElement.style.opacity = "0";

        // After fade out, update the text and fade in
        setTimeout(() => {
            didYouKnowTipElement.textContent = tips[currentTip];
            didYouKnowTipElement.style.opacity = "1";
        }, 500); // Wait for fade out to complete

        currentTip = (currentTip + 1) % tips.length; // Loop through tips
    }, 3000); // Change tip every 3 seconds
}

// Function to create raindrops
function createRain() {
    const rainCount = 50; // Number of raindrops
    for (let i = 0; i < rainCount; i++) {
        const raindrop = document.createElement("div");
        raindrop.classList.add("raindrop");
        raindrop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random fall speed
        raindrop.style.animationDelay = `${Math.random() * 2}s`; // Random delay
        rainContainerElement.appendChild(raindrop);
    }
}

// Function to update visitor count
function updateVisitorCount() {
    // Check if the user has already visited the page in this session
    if (!sessionStorage.getItem("visited")) {
        let count = localStorage.getItem("visitorCount") || 0; // Get current count from localStorage
        count = parseInt(count) + 1; // Increment count
        localStorage.setItem("visitorCount", count); // Save updated count to localStorage
        sessionStorage.setItem("visited", "true"); // Mark the user as visited
        visitorCountElement.textContent = count; // Update the displayed count
    } else {
        // If the user has already visited, just display the current count
        let count = localStorage.getItem("visitorCount") || 0;
        visitorCountElement.textContent = count;
    }
}

function animateWelcomeBack() {
    // Clear the text and reset styles
    welcomeBackElement.innerHTML = "";
    welcomeBackElement.style.opacity = "0";
    welcomeBackElement.style.transform = "translateX(-50px)";

    // Add each letter with a delay
    welcomeText.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("letter");
        welcomeBackElement.appendChild(span);

        // Animate each letter
        setTimeout(() => {
            span.style.opacity = "1";
            span.style.transform = "translateX(0)";
        }, i * 200); // Staggered delay for each letter
    });

    // Fade in the "Welcome Back" container
    setTimeout(() => {
        welcomeBackElement.style.opacity = "1";
        welcomeBackElement.style.transform = "translateX(0)";
    }, 0);

    // Fade out the "Welcome Back" container after a delay
    setTimeout(() => {
        welcomeBackElement.style.opacity = "0";
        welcomeBackElement.style.transform = "translateX(50px)";
    }, welcomeText.length * 200 + 1500); // Wait for letters to appear, then fade out

    // After "Welcome Back" fades out, show the background box, loading container, and "Did You Know" box after 0.3 seconds
    setTimeout(() => {
        backgroundBoxElement.style.opacity = "1";
        loadingContainerElement.style.opacity = "1";
        didYouKnowElement.style.opacity = "1";
        welcomeToSlimeworksElement.style.opacity = "1";
        welcomeLineElement.style.opacity = "1";
        buttonsContainerElement.style.opacity = "1";
        copyrightElement.style.opacity = "1";
        visitorCounterElement.style.opacity = "1"; // Fade in the visitor counter
        // Animate the background box, loading box, and "Did You Know" box upwards by 120px
        setTimeout(() => {
            backgroundBoxElement.style.transform = "translate(-50%, calc(-50% - 60px))"; /* Adjusted for 60px down */
            loadingContainerElement.style.transform = "translateY(-120px)";
            didYouKnowElement.style.transform = "translateY(-120px)";
            buttonsContainerElement.style.transform = "translateY(-120px)";
            visitorCounterElement.style.transform = "translateY(-120px)"; // Move the visitor counter up
        }, 10); // Small delay to ensure opacity transition starts first
    }, welcomeText.length * 200 + 1500 + 300); // 0.3 seconds delay

    // Redirect to index.html after 14 seconds with a fade-out transition
    setTimeout(() => {
        // Add fade-out animation to all elements
        document.body.classList.add("fade-out");

        // Redirect after the fade-out animation completes
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000); // Wait for the fade-out animation to finish (1 second)
    }, 14000); // 14 seconds delay
}

createRain(); // Start the rain effect
updateVisitorCount(); // Update and display visitor count
animateWelcomeBack(); // Start the animation
animateLoadingText(); // Start the loading text animation
displayRandomTips(); // Start displaying random tips with fade transition