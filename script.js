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
            
            // Show/hide content based on menu selection
            const targetSection = this.getAttribute('data-target');
            if (targetSection) {
                document.querySelectorAll('.content-section').forEach(section => {
                    section.style.display = 'none';
                });
                document.getElementById(targetSection).style.display = 'block';
            }
        });
    });
    
    // Recent apps functionality
    function saveRecentApp(appName, appIcon, appDesc) {
        let recentApps = JSON.parse(localStorage.getItem('recentApps') || '[]');
        
        // Check if app already exists in recent list
        const existingIndex = recentApps.findIndex(app => app.name === appName);
        if (existingIndex !== -1) {
            // Remove it so we can add it to the top
            recentApps.splice(existingIndex, 1);
        }
        
        // Add to beginning of array
        recentApps.unshift({
            name: appName,
            icon: appIcon,
            description: appDesc,
            timestamp: new Date().getTime()
        });
        
        // Keep only the last 4 apps
        recentApps = recentApps.slice(0, 4);
        
        // Save to localStorage
        localStorage.setItem('recentApps', JSON.stringify(recentApps));
        
        // Update the recent apps display
        updateRecentAppsDisplay();
    }
    
    // Update the recent apps section in the UI
    function updateRecentAppsDisplay() {
        const recentAppsContainer = document.querySelector('.recent-apps-grid');
        if (!recentAppsContainer) return;
        
        const recentApps = JSON.parse(localStorage.getItem('recentApps') || '[]');
        
        // Clear current content
        recentAppsContainer.innerHTML = '';
        
        if (recentApps.length === 0) {
            recentAppsContainer.innerHTML = '<p class="no-apps-message">No recently opened apps</p>';
            return;
        }
        
        // Add each recent app
        recentApps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.innerHTML = `
                <div class="app-icon"><i class="${app.icon}"></i></div>
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <button class="launch-btn">Launch</button>
            `;
            
            // Add event listener to the launch button
            const launchBtn = appCard.querySelector('.launch-btn');
            launchBtn.addEventListener('click', function() {
                launchApp(app.name, app.icon, app.description);
            });
            
            recentAppsContainer.appendChild(appCard);
        });
    }
    
    // Function to launch an app
    function launchApp(appName, appIcon, appDesc) {
        alert(`Launching ${appName}...`);
        // Save to recent apps
        saveRecentApp(appName, appIcon, appDesc);
        
        // Here you would add code to actually launch the apps
        // For example, you could redirect to another page or open a modal
    }
    
    // Launch button functionality
    const launchButtons = document.querySelectorAll('.launch-btn');
    launchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appCard = this.parentElement;
            const appName = appCard.querySelector('h3').textContent;
            const appIcon = appCard.querySelector('.app-icon i').className;
            const appDesc = appCard.querySelector('p').textContent;
            
            if (appName === 'Add New App') {
                alert('Feature to add new apps coming soon!');
                return;
            }
            
            launchApp(appName, appIcon, appDesc);
        });
    });
    
    // Initialize recent apps display
    updateRecentAppsDisplay();
    
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
    
    // Save app functionality
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appCard = this.parentElement;
            const appName = appCard.querySelector('h3').textContent;
            const appIcon = appCard.querySelector('.app-icon i').className;
            const appDesc = appCard.querySelector('p').textContent;
            
            saveApp(appName, appIcon, appDesc);
        });
    });
    
    function saveApp(appName, appIcon, appDesc) {
        let savedApps = JSON.parse(localStorage.getItem('savedApps') || '[]');
        
        // Check if app already exists in saved list
        if (!savedApps.some(app => app.name === appName)) {
            // Add to array
            savedApps.push({
                name: appName,
                icon: appIcon,
                description: appDesc
            });
            
            // Save to localStorage
            localStorage.setItem('savedApps', JSON.stringify(savedApps));
            
            // Update the saved apps display
            updateSavedAppsDisplay();
            
            alert(`${appName} has been saved to your favorites!`);
        } else {
            alert(`${appName} is already in your favorites!`);
        }
    }
    
    // Update the saved apps section in the UI
    function updateSavedAppsDisplay() {
        const savedAppsContainer = document.querySelector('.saved-apps-grid');
        if (!savedAppsContainer) return;
        
        const savedApps = JSON.parse(localStorage.getItem('savedApps') || '[]');
        
        // Clear current content
        savedAppsContainer.innerHTML = '';
        
        if (savedApps.length === 0) {
            savedAppsContainer.innerHTML = '<p class="no-apps-message">No saved apps yet</p>';
            return;
        }
        
        // Add each saved app
        savedApps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.innerHTML = `
                <div class="app-icon"><i class="${app.icon}"></i></div>
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <div class="app-buttons">
                    <button class="launch-btn">Launch</button>
                    <button class="remove-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // Add event listener to the launch button
            const launchBtn = appCard.querySelector('.launch-btn');
            launchBtn.addEventListener('click', function() {
                launchApp(app.name, app.icon, app.description);
            });
            
            // Add event listener to the remove button
            const removeBtn = appCard.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function() {
                removeSavedApp(app.name);
            });
            
            savedAppsContainer.appendChild(appCard);
        });
    }
    
    function removeSavedApp(appName) {
        let savedApps = JSON.parse(localStorage.getItem('savedApps') || '[]');
        
        // Remove the app from the saved list
        savedApps = savedApps.filter(app => app.name !== appName);
        
        // Save to localStorage
        localStorage.setItem('savedApps', JSON.stringify(savedApps));
        
        // Update the saved apps display
        updateSavedAppsDisplay();
        
        alert(`${appName} has been removed from your favorites!`);
    }
    
    // Initialize saved apps display
    updateSavedAppsDisplay();
});