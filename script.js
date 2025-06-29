document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Menu item active state
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Launch button functionality
    const launchButtons = document.querySelectorAll('.launch-btn');
    launchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appName = this.parentElement.querySelector('h3').textContent;
            
            if (appName === 'Add New App') {
                alert('Feature to add new apps coming soon!');
                return;
            }
            
            alert(`Launching ${appName}...`);
            // Here you would add code to actually launch the apps
            // For example, you could redirect to another page or open a modal
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const appCards = document.querySelectorAll('.app-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        appCards.forEach(card => {
            const appName = card.querySelector('h3').textContent.toLowerCase();
            const appDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (appName.includes(searchTerm) || appDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});