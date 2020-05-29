// Typewriter effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Navbar color scroll
const navbar = document.getElementById('main-nav');
let scrolled = false;

window.onscroll = function () {
  if (window.pageYOffset > 100) {
    navbar.style.background = '#ab3d1f';
    if (!scrolled) {
      navbar.style.transform = 'translateY(-200px)';
    }
    this.setTimeout(function () {
      navbar.style.transform = 'translateY(0px)';
      scrolled = true;
    }, 200);
  } else {
    navbar.style.background = 'rgba(171, 61, 31, 0.8)';
    scrolled = false;
  }
}

// Smooth Scrolling
$('#main-nav a').on('click', function (e) {

  if (this.hash !== '') {
    e.preventDefault();

    const hash = this.hash;

    $('html, body').animate({
        scrollTop: $(hash).offset().top - 70,
      },
      800
    );
  }
});

// Add current class for Navbar when scrolling
const aboutNav = document.getElementById('about-nav');
const techNav = document.getElementById('tech-nav');
const projectNav = document.getElementById('project-nav');
const contactNav = document.getElementById('contact-nav');

window.addEventListener('scroll', function () {

  let aboutSection = document.getElementById('about');
  let aboutDistanceToTop = aboutSection.getBoundingClientRect().top;

  aboutDistanceToTop > -10 ? aboutNav.className = 'current' : aboutNav.className = '';


  let techSection = document.getElementById('home-a');
  let techDistanceToTop = techSection.getBoundingClientRect().top;

  if (techDistanceToTop < 270 && techDistanceToTop > -270) {
    techNav.className = 'current';
  } else {
    techNav.className = '';
  }


  let projectSection = document.getElementById('home-b');
  let projectDistanceToTop = projectSection.getBoundingClientRect().top;

  if (projectDistanceToTop < 200 && projectDistanceToTop > -550) {
    projectNav.className = 'current';
  } else {
    projectNav.className = '';
  }


  let contactSection = document.getElementById('home-c');
  let contactDistanceToTop = contactSection.getBoundingClientRect().top;

  if (contactDistanceToTop < 170) {
    contactNav.className = 'current';
  } else {
    contactNav.className = '';
  }
});