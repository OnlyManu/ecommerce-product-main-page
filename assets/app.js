const body = document.getElementsByTagName('body');
const burgerMenu = document.getElementById('burger-menu');

const navbar = document.getElementById('navbar');
const navbarClose = document.getElementById('navbar-close');

const lightbox = document.getElementById('lightbox');
const lightboxCarousel = document.getElementById('lightbox-carousel')
const lightboxCarouselClose = document.getElementById('lightbox-close');
const lightboxCarouselControls = document.querySelectorAll('.lightbox-carousel .carousel-control');
const lightboxCarouselSlots = document.querySelectorAll('.lightbox-slot');
let lightboxCarouselImgs = []
let lightboxCarouselControlsNext;
let lightboxCarouselControlsPrevious;
let lightboxCarouselPosition = 1;


const carousel = document.getElementById('carousel');
const carouselControls = document.querySelectorAll('.sneakers-carousel .carousel-control');
const carouselSlots = document.querySelectorAll('.slot');
let carouselImgs = [];
let carouselPosition = 1;

const cartIcon = document.getElementById('cart-icon');
const cartBadge = document.getElementById('badge');
const cart = document.getElementById('cart');
const cartArticleList = document.getElementById('article-list');
let articleList = [];

const orderIncrementButton = document.getElementById('order-increment');
const orderDecrementButton = document.getElementById('order-decrement');
const orderQuantityText = document.getElementById('order-quantity');
const orderSubmitButton = document.getElementById('order-submit');
let orderQuantity=0;


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
navbarClose.addEventListener('click', hideSideMenu, false);

cartIcon.addEventListener('click', hideOrShowCart, false);

carousel.addEventListener('click', showLightboxCarousel, false);
carouselControls.forEach((el) => {
    if(el.classList.contains('next')){
        el.addEventListener('click', carouselImgNext);
    } else {
        el.addEventListener('click', carouselImgPrev);
    }
});
for(let i=0; i<carouselSlots.length; i++){
    carouselSlots[i].addEventListener('click', function(e){
        carouselImgSelect(e);
    }, false);
}

lightboxCarouselClose.addEventListener('click', hidelightboxCarousel, false);
lightbox.addEventListener('click', hideSideMenu, false);
lightboxCarouselControls.forEach((el) => {
    if(el.classList.contains('next')){
        lightboxCarouselControlsNext = el.querySelector('.control');
    } else {
        lightboxCarouselControlsPrevious = el.querySelector('.control');
    }
});
lightboxCarouselControls.forEach((el) => {
    if(el.classList.contains('next')){
        el.addEventListener('click', lightboxCarouselImgNext, false);
    } else {
        el.addEventListener('click', lightboxCarouselImgPrev, false);
    }
});
for(let i=0; i<lightboxCarouselSlots.length; i++){
    lightboxCarouselSlots[i].addEventListener('click', function(e){
        lightboxCarouselImgSelect(e);
    }, false);
}

orderIncrementButton.addEventListener('click', orderIncrement, false);
orderDecrementButton.addEventListener('click', orderDecrement, false);
orderSubmitButton.addEventListener('click', addToCart, false);

function addToCart(){
    if(orderQuantity>0){
        let article = {
            id: 1,
            name: "Fall Limited Edition Sneakers",
            tumbnail: "assets/imgs/image-product-1-thumbnail.jpg",
            quantity: orderQuantity,
            price: 125.00
        };
        let totalArticleQuantity = 0;
        if(articleList.length>0){
            let articleExist = false;
            for(let i=0; i<articleList.length; i++){
                if(articleList[i].id == article.id){
                    articleList[i].quantity+=article.quantity;
                    articleExist = true;
                }
            }
            if(!articleExist){
                articleList.push(article);
            }
        }else{
            articleList.push(article);
        }
        let checkOutButton;
        console.log(articleList);
        cartArticleList.childNodes.forEach((el) => {
            if(el.nodeName.toLowerCase()=='div'){
                if(el.classList.contains('article-info')){
                    el.remove();
                }
                if(el.classList.contains('empty')){
                   checkOutButton=el;
                }
            }
        });
        for(let i=0; i<articleList.length; i++){
            let articleHtml = document.createElement('div');
            articleHtml.className='article-info';
            articleHtml.id="article-"+articleList[i].id;
            let articleContent = `
                    <img src="${articleList[i].tumbnail}">
                    <div class="article-description">
                        <div class="article-name">
                            ${articleList[i].name}
                        </div>
                        <div class="article-price">
                            <span class="quantity">$125.00*${articleList[i].quantity}</span>
                            <span class="price">$${(articleList[i].quantity*articleList[i].price).toFixed(2)}</span>
                        </div>
                    </div>
                    <img src="assets/imgs/icon-delete.svg" class="list-button" alt="delete article" onclick="deleteArticle(${i})">
            `;
            articleHtml.innerHTML=articleContent;
            cartArticleList.insertBefore(articleHtml, checkOutButton);
            totalArticleQuantity += articleList[i].quantity;
        }
        cartBadge.innerHTML=totalArticleQuantity;
        cartBadge.classList.remove('hide');
    }
}
function deleteArticle(index){
    document.getElementById('article-'+articleList[index].id).remove();
    articleList.splice(index, 1);
    if(articleList.length>0){
        let totalArticleQuantity = 0;
        for(let i=0; i<articleList.length; i++){
            totalArticleQuantity += articleList[i].quantity;
        }
        cartBadge.innerHTML=totalArticleQuantity;
    }else{
        cartBadge.classList.add('hide');
        cartArticleList.classList.add('empty');
    }
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
function hideOrShowCart(){
    if(cart.classList.contains('hide')){
        if(articleList.length<1){
            cartArticleList.classList.add('empty');
        }else{
            cartArticleList.classList.remove('empty');
        }
        cart.classList.replace('hide', 'show');
    }else if(cart.classList.contains('show')){
        cart.classList.replace('show', 'hide');
    }
}
function orderIncrement(){
    orderQuantity++;
    orderQuantityText.innerHTML=orderQuantity;
}
function orderDecrement(){
    orderQuantity--
    if(orderQuantity<0){
        orderQuantity=0
    }
    orderQuantityText.innerHTML=orderQuantity;
}
function showLightboxCarousel(){
    if(getComputedStyle(carouselControls[0], null).display == 'none'){
        lightboxCarouselImgs[lightboxCarouselPosition-1].classList.remove('show');
        lightboxCarouselSlots[lightboxCarouselPosition-1].classList.remove('show');
        lightboxCarouselPosition = carouselPosition
        lightboxCarouselImgs[lightboxCarouselPosition-1].classList.add('show');
        lightboxCarouselSlots[lightboxCarouselPosition-1].classList.add('show');
        body[0].classList.add('lightbox-visible'); 
        lightbox.classList.replace('hide', 'show');
        lightboxCarousel.parentNode.classList.replace('hide', 'show');
    }
}
function hidelightboxCarousel(){
    body[0].classList.remove('lightbox-visible');
    lightboxCarousel.parentNode.classList.replace('show', 'hide');
    lightbox.classList.replace('show', 'hide');
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