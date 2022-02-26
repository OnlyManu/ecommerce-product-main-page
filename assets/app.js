const body = document.getElementsByTagName('body');
const burgerMenu = document.getElementById('burger-menu');
const Lightbox = document.getElementById('lightbox');
const navbar = document.getElementById('navbar');
const navbarClose = document.getElementById('navbar-close');
const carousel = document.getElementById('carousel').childNodes;
const carouselControls = document.querySelectorAll('.carousel-control');
let carouselPosition = 1;
const carouselImgs = [];

carousel.forEach((el) => {
    if(el.nodeName.toLowerCase() == 'img'){
        carouselImgs.push(el);
    }
});

burgerMenu.addEventListener('click', showSideMenu);
Lightbox.addEventListener('click', hideSideMenu);
navbarClose.addEventListener('click', hideSideMenu);
carouselControls.forEach((el) => {
    if(el.classList.toggle){
        el.addEventListener('click', carouselImgNext);
    } else {
        el.addEventListener('click', carouselImgPrev);
    }
});
 

function showSideMenu(){
    body[0].classList.add('lightbox-visible');
    Lightbox.classList.add('show');
    navbar.classList.add('menu-mobile');
}
function hideSideMenu(){
    body[0].classList.remove('lightbox-visible');
    Lightbox.classList.remove('show');
    navbar.classList.remove('menu-mobile');
}
function carouselImgNext(){
    if(carouselPosition < carouselImgs.length){
        carouselPosition++;
    } else {
        carouselPosition=1
    }
    carouselImgs.forEach((el) => {
        el.classList.remove('show');
    })
    carouselImgs[carouselPosition-1].classList.add('show');
}
function carouselImgPrev(){
    if(carouselPosition > 1){
        carouselPosition--;
    } else {
        carouselPosition=carouselImgs.length
    }
    carouselImgs.forEach((el) => {
        el.classList.remove('show');
    })
    carouselImgs[carouselPosition-1].classList.add('show');
}