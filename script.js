window.onload = function () {
    // Background cycling functionality
    const bgButton = document.getElementById('bg-button');
    let currentBgIndex = localStorage.getItem('bgIndex') || 1; // Get stored background index or default to 1
    let isCooldown = false;

    // Set the initial background immediately
    document.body.style.backgroundImage = `url('background${currentBgIndex}.jpg')`;

    // Add blur effect before navigating to another page
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href !== window.location.href) { // Only blur if navigating to a new page
                document.body.classList.add('blur'); // Add blur effect
                setTimeout(() => {
                    document.body.classList.remove('blur'); // Remove blur effect after a short delay
                }, 500); // Match the duration of the blur transition
            }
        });
    });

    // Background cycling functionality
    bgButton.addEventListener('click', () => {
        if (isCooldown) return;
        currentBgIndex = (currentBgIndex % 11) + 1;
        document.body.style.backgroundImage = `url('background${currentBgIndex}.jpg')`;

        // Store the current background index in localStorage
        localStorage.setItem('bgIndex', currentBgIndex);

        isCooldown = true;
        bgButton.classList.add('disabled');

        setTimeout(() => {
            isCooldown = false;
            bgButton.classList.remove('disabled');
        }, 1000);
    });

    // Update time display
    function updateTime() {
        const timeElement = document.getElementById('time');
        const now = new Date();
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
        timeElement.textContent = now.toLocaleString('en-US', options);
    }

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display time immediately

    // Update the view counter
    updateViewCounter();
};

// Function to update the view counter
function updateViewCounter() {
    // Get the current view count from localStorage
    let viewCount = localStorage.getItem('viewCount');
    let lastIncrementTime = localStorage.getItem('lastIncrementTime');

    // If viewCount doesn't exist, initialize it to 0
    if (!viewCount) {
        viewCount = 0;
    } else {
        viewCount = parseInt(viewCount);
    }

    // Check if the last increment time exists and is within the last hour
    if (lastIncrementTime) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - parseInt(lastIncrementTime);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        // If less than 1 hour has passed, do not increment
        if (timeDifference < oneHour) {
            console.log("Counter already incremented within the last hour.");
            document.getElementById('view-count').textContent = viewCount;
            return;
        }
    }

    // Increment the view count
    viewCount += 1;

    // Update the view count and last increment time in localStorage
    localStorage.setItem('viewCount', viewCount);
    localStorage.setItem('lastIncrementTime', new Date().getTime());

    // Display the updated view count on the page
    document.getElementById('view-count').textContent = viewCount;
}
