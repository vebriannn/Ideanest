const menuToggle = document.getElementById('menu-toggle');
const navbarNav = document.getElementById('navbar-nav');

menuToggle.addEventListener('click', function () {
    navbarNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});