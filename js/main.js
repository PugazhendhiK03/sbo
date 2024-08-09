document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage loaded');
});


// menubar
document.addEventListener('DOMContentLoaded', () => {
    const menuBar = document.querySelector('.menu-bar');
    const navList = document.querySelector('.nav-list');

    menuBar.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
});

