const body = document.getElementsByTagName('body');
const burgerMenu = document.getElementById('burger-menu');
const lightbox = document.getElementById('lightbox');
const lightboxCarousel = document.getElementById('lightbox-carousel')
const lightboxCarouselClose = document.getElementById('lightbox-close');
const lightboxCarouselControls = document.querySelectorAll('.lightbox-carousel .carousel-control');
const lightboxCarouselSlots = document.querySelectorAll('.lightbox-slot');
const navbar = document.getElementById('navbar');
const navbarClose = document.getElementById('navbar-close');
const carousel = document.getElementById('carousel');
const carouselControls = document.querySelectorAll('.sneakers-carousel .carousel-control');
const carouselSlots = document.querySelectorAll('.slot');
let carouselPosition = 1;
let lightboxCarouselPosition = 1;
let carouselImgs = [];
let lightboxCarouselImgs = []
let lightboxCarouselControlsNext;
let lightboxCarouselControlsPrevious;

carousel.childNodes.forEach((el) => {
    if(el.nodeName.toLowerCase() == 'img'){
        carouselImgs.push(el);
    }
});
lightboxCarousel.childNodes.forEach((el) => {
    if(el.nodeName.toLowerCase() == 'img'){
        lightboxCarouselImgs.push(el);
    }
})

burgerMenu.addEventListener('click', showSideMenu, false);
carousel.addEventListener('click', showLightboxCarousel, false);
lightboxCarouselClose.addEventListener('click', hidelightboxCarousel, false);
lightbox.addEventListener('click', hideSideMenu, false);
navbarClose.addEventListener('click', hideSideMenu, false);
lightboxCarouselControls.forEach((el) => {
    if(el.classList.contains('next')){
        lightboxCarouselControlsNext = el.querySelector('.control');
    } else {
        lightboxCarouselControlsPrevious = el.querySelector('.control');
    }
});
carouselControls.forEach((el) => {
    if(el.classList.contains('next')){
        el.addEventListener('click', carouselImgNext);
    } else {
        el.addEventListener('click', carouselImgPrev);
    }
});
lightboxCarouselControls.forEach((el) => {
    if(el.classList.contains('next')){
        el.addEventListener('click', lightboxCarouselImgNext, false);
    } else {
        el.addEventListener('click', lightboxCarouselImgPrev, false);
    }
});
for(let i=0; i<carouselSlots.length; i++){
    carouselSlots[i].addEventListener('click', function(e){
        carouselImgSelect(e);
    }, false);
}
for(let i=0; i<lightboxCarouselSlots.length; i++){
    lightboxCarouselSlots[i].addEventListener('click', function(e){
        lightboxCarouselImgSelect(e);
    }, false);
}
function showLightboxCarousel(){
    lightboxCarouselImgs[lightboxCarouselPosition-1].classList.remove('show');
    lightboxCarouselSlots[lightboxCarouselPosition-1].classList.remove('show');
    lightboxCarouselPosition = carouselPosition
    lightboxCarouselImgs[lightboxCarouselPosition-1].classList.add('show');
    lightboxCarouselSlots[lightboxCarouselPosition-1].classList.add('show');
    body[0].classList.add('lightbox-visible'); 
    lightbox.classList.replace('hide', 'show');
    lightboxCarousel.parentNode.classList.replace('hide', 'show');
}
function hidelightboxCarousel(){
    body[0].classList.remove('lightbox-visible');
    lightboxCarousel.parentNode.classList.replace('show', 'hide');
    lightbox.classList.replace('show', 'hide');
}
function showSideMenu(){
    body[0].classList.add('lightbox-visible');
    lightbox.classList.replace('hide', 'show');
    lightboxCarousel.classList.replace('show', 'hide');
    navbar.classList.add('menu-mobile');
}
function hideSideMenu(){
    if(lightboxCarousel.parentNode.classList.contains('hide')){
        body[0].classList.remove('lightbox-visible');
        lightbox.classList.replace('show', 'hide');
        navbar.classList.remove('menu-mobile');
    }
}
function lightboxCarouselImgNext(){
    lightboxCarouselSlots[lightboxCarouselPosition-1].classList.remove('show');
    lightboxCarouselImgs[lightboxCarouselPosition-1].classList.remove('show');
    if(lightboxCarouselPosition < lightboxCarouselImgs.length){
        lightboxCarouselPosition++;
    } else {
        lightboxCarouselPosition=1
    }
    lightboxCarouselImgs[lightboxCarouselPosition-1].classList.add('show');
    lightboxCarouselSlots[lightboxCarouselPosition-1].classList.add('show');
}
function lightboxCarouselImgPrev(){
    lightboxCarouselSlots[lightboxCarouselPosition-1].classList.remove('show');
    lightboxCarouselImgs[lightboxCarouselPosition-1].classList.remove('show');
    if(lightboxCarouselPosition > 1){
        lightboxCarouselPosition--;
    } else {
        lightboxCarouselPosition=lightboxCarouselImgs.length
    }
    lightboxCarouselImgs[lightboxCarouselPosition-1].classList.add('show');
    lightboxCarouselSlots[lightboxCarouselPosition-1].classList.add('show');
}
function lightboxCarouselImgSelect(e){
    let indice = parseInt(e.target.getAttribute('indice'));
    if(!(indice===lightboxCarouselPosition)){
        lightboxCarouselSlots[lightboxCarouselPosition-1].classList.remove('show');
        lightboxCarouselImgs[lightboxCarouselPosition-1].classList.remove('show');
        lightboxCarouselPosition=indice;
        lightboxCarouselImgs[lightboxCarouselPosition-1].classList.add('show');
        lightboxCarouselSlots[lightboxCarouselPosition-1].classList.add('show');
    }
}
function carouselImgNext(){
    carouselSlots[carouselPosition-1].classList.remove('show');
    carouselImgs[carouselPosition-1].classList.remove('show');
    if(carouselPosition < carouselImgs.length){
        carouselPosition++;
    } else {
        carouselPosition=1
    }
    carouselImgs[carouselPosition-1].classList.add('show');
    carouselSlots[carouselPosition-1].classList.add('show');
}
function carouselImgPrev(){
    carouselSlots[carouselPosition-1].classList.remove('show');
    carouselImgs[carouselPosition-1].classList.remove('show');
    if(carouselPosition > 1){
        carouselPosition--;
    } else {
        carouselPosition=carouselImgs.length;
    }
    carouselImgs[carouselPosition-1].classList.add('show');
    carouselSlots[carouselPosition-1].classList.add('show');
}
function carouselImgSelect(e){
    let indice = parseInt(e.target.getAttribute('indice'))
    if(!(indice===carouselPosition)){
        carouselImgs[carouselPosition-1].classList.remove('show');
        carouselSlots[carouselPosition-1].classList.remove('show');
        carouselPosition=indice;
        carouselImgs[carouselPosition-1].classList.add('show');
        carouselSlots[carouselPosition-1].classList.add('show');
    }    
}