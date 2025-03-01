window.onload = function () {
    const body = document.body;

    // Apply immediate zoom-in effect
    body.style.transform = 'scale(1.2)'; // Zoom in slightly
    body.style.transition = 'transform 1s ease-in-out'; // Smooth zoom

    // Redirect to index.html as soon as zoom starts
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000); // Redirect as soon as zoom effect is done
};
