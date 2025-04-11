// Dark mode functionality
export function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateDarkModeIcon(savedTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateDarkModeIcon(true);
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme === 'dark');
    });

    // Update icon based on theme
    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
} 