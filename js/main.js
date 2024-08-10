document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage loaded');
});

// Menubar for mobile
document.addEventListener('DOMContentLoaded', () => {
    const menuBar = document.querySelector('.menu-bar');
    const navList = document.querySelector('.nav-list');

    menuBar.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
});

// Account dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const accountIcons = document.querySelector('.account-icons');
    const accountDropdown = document.querySelector('.account-dropdown');

    accountIcons.addEventListener('click', () => {
        accountDropdown.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
        if (!accountIcons.contains(event.target)) {
            accountDropdown.classList.remove('visible');
        }
    });
});
