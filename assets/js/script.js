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

function autoScroll() {
  scrollAmount += scrollStep;
  if (scrollAmount >= gridList.scrollWidth / 2) {
    scrollAmount = 0;
  }
  gridList.style.transform = `translateX(-${scrollAmount}px)`;
}

setInterval(autoScroll, scrollSpeed);

function createEventCard(imageSrc, date, subtitle, title) {
  return `
     <li>
        <button onclick="_vs()">
          <div class="event-card card-slide has-before hover:shine">
              <div class="card-banner img-holder" style="--width: 350; --height: 450;">
                  <img src="${imageSrc}" width="350" height="450" loading="lazy" alt="${title}" class="img-cover">
                  <time class="publish-date label-2" datetime="${date}">${date}</time>
              </div>
              <div class="card-content">
                  <p class="card-subtitle label-2 text-center">${subtitle}</p>
                  <h3 class="card-title title-2 text-center">${title}</h3>
              </div>
          </div>
        </button>
      </li>
  `;
}

// Appel 1
gridList.innerHTML += createEventCard(
  './assets/images/event-1.jpg',  // imageSrc
  '2024-10-15',                  // date
  'Intimate Dining',             // subtitle
  'An unforgettable night of culinary indulgence.'  // title
);

// Appel 2
gridList.innerHTML += createEventCard(
  './assets/images/event-2.jpg',
  '2024-11-20',
  'Gourmet Night',
  'A journey through exquisite flavors.'
);

// Appel 3
gridList.innerHTML += createEventCard(
  './assets/images/event-3.jpg',
  '2024-12-05',
  'Wine Tasting',
  'Discover the art of fine wines.'
);

// Appel 4
gridList.innerHTML += createEventCard(
  './assets/images/event-4.jpg',
  '2025-01-10',
  'Art Exhibition',
  'Explore the creativity of emerging artists.'
);

// Appel 5
gridList.innerHTML += createEventCard(
  './assets/images/event-5.jpg',
  '2025-02-14',
  'Valentine’s Special',
  'Celebrate love with a romantic dinner.'
);
