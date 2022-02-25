const burgerMenu = document.getElementById('burger-menu');
const Lightbox = document.getElementById('lightbox');
const navbar = document.getElementById('navbar');
const navbarClose = document.getElementById('navbar-close');

burgerMenu.addEventListener('click', showSideMenu);
Lightbox.addEventListener('click', hideSideMenu);
navbarClose.addEventListener('click', hideSideMenu);

function showSideMenu(){
    Lightbox.classList.add('show');
    navbar.classList.add('menu-mobile');
}
function hideSideMenu(){
    Lightbox.classList.remove('show');
    navbar.classList.remove('menu-mobile');
}