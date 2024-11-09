'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


const gridList = document.querySelector('.grid-list');
const scrollSpeed = 50;
const scrollStep = 1;

gridList.innerHTML += gridList.innerHTML;  

let scrollAmount = 0;
let isScrolling = true;
let isDragging = false;

function autoScroll() {
  if (isScrolling && !isDragging) {
    scrollAmount += scrollStep;
    gridList.style.transform = `translateX(-${scrollAmount}px)`;
    
    if (scrollAmount >= gridList.scrollWidth / 2) {
      scrollAmount = 0;
      gridList.style.transform = `translateX(0px)`;
    }
  }
}
setInterval(autoScroll, scrollSpeed);


document.getElementById('scroll-left').addEventListener('click', () => {
  scrollAmount -= 200;
  if (scrollAmount < 0) {
    scrollAmount = gridList.scrollWidth / 2 - Math.abs(scrollAmount);
  }
  gridList.style.transform = `translateX(-${scrollAmount}px)`;
});

document.getElementById('scroll-right').addEventListener('click', () => {
  scrollAmount += 200; 
  if (scrollAmount >= gridList.scrollWidth / 2) {
    scrollAmount = 0;
  }
  gridList.style.transform = `translateX(-${scrollAmount}px)`;
});

function createEventCard(imageSrc, title) {
  return `
     <li>
        <button onclick="changeContent()">
          <div class="event-card card-slide has-before hover:shine">
              <div class="card-banner img-holder" style="--width: 350; --height: 450;">
                  <img src="${imageSrc}" width="350" height="450" loading="lazy" alt="${title}" class="img-cover">
              </div>
              <div class="card-content">
                  <h3 class="card-title title-2 text-center">${title}</h3>
              </div>
          </div>
        </button>
      </li>
  `;
}

// Function to add multiple event cards to the grid
function addEventCards() {
  const eventCards = [
    { imageSrc: './assets/HotImage/Mia_Marie.jpg', title: 'Own the moment, turn every glance into a story.' },
    { imageSrc: './assets/images/event-2.jpg', title: 'A journey through exquisite flavors.' },
    { imageSrc: './assets/images/event-3.jpg', title: 'Experience the thrill of new discoveries.' },
    { imageSrc: './assets/images/event-3.jpg', title: 'Experience the thrill of new discoveries.' },
    { imageSrc: './assets/images/event-3.jpg', title: 'Experience the thrill of new discoveries.' },
    { imageSrc: './assets/images/event-3.jpg', title: 'Experience the thrill of new discoveries.' },
  ];

  eventCards.forEach(card => {
    gridList.innerHTML += createEventCard(card.imageSrc, card.title);
  });
}

// Function to change content when an event card is clicked
function changeContent() {
  _vs().then(() => {
    // Logic to display new page with image link goes here
  });
}

// Add event cards to the grid list
addEventCards();
