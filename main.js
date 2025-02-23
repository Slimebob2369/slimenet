// Main functionality (side column, search bar, etc.)
const sideColumn = document.getElementById('sideColumn');
const menuButton = document.getElementById('menuButton');
const title = document.getElementById('title');
const mainContent = document.getElementById('mainContent');
const header = document.getElementById('header');

// Toggle side column expansion
menuButton.addEventListener('click', () => {
    sideColumn.classList.toggle('expanded');
    title.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
    header.classList.toggle('expanded');
});

// Search bar functionality
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');
const searchButton = document.getElementById('searchButton');

// Clear the search input
clearButton.addEventListener('click', () => {
    searchInput.value = '';
});

// Handle search button click and Enter key press
const handleSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
        alert(`Searching for: ${query}`); // Replace with actual search functionality
    }
};

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
