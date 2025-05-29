newFunction();

// Navigation and section handling
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');

const activePage = () => {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
};

let isTransitioning = false;

const handleSectionTransition = (targetSection) => {
  // Remove active from all sections
  sections.forEach(section => section.classList.remove('active'));
  // Add active to the target section
  targetSection.classList.add('active');
};

// Navigation click handlers
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (!link.classList.contains('active')) {
      activePage();
      link.classList.add('active');
      handleSectionTransition(targetSection);
    }
  });
});

// Logo click handler
logoLink.addEventListener('click', (e) => {
  e.preventDefault();
  const homeSection = document.querySelector('.home');
  
  if (!navLinks[0].classList.contains('active')) {
    activePage();
    navLinks[0].classList.add('active');
    handleSectionTransition(homeSection);
  }
});

// Resume section handling
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach(btn => {
      btn.classList.remove('active');
    });
    btn.classList.add('active');

    resumeDetails.forEach(detail => {
      detail.classList.remove('active');
    });

    resumeDetails[idx].classList.add('active');
  });
});

// Portfolio carousel
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
let index = 0;

const activePortfolio = () => {
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
  arrowLeft.classList.toggle('disabled', index === 0);
  arrowRight.classList.toggle('disabled', index === 3);
  
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');
  portfolioDetails.forEach(detail => detail.classList.remove('active'));
  portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
  if (index < 3) {
    index++;
    activePortfolio();
  }
});

arrowLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
    activePortfolio();
  }
});

// Initialize carousel
activePortfolio();

// Portfolio button in home section navigates to portfolio tab
const homePortfolioBtn = document.querySelector('.home .btn[href="#portfolio"]');
if (homePortfolioBtn) {
  homePortfolioBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Find the portfolio section and nav link
    const targetSection = document.getElementById('portfolio');
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    // Activate the correct nav link
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#portfolio') {
        link.classList.add('active');
      }
    });
    // Hide all sections, show portfolio
    document.querySelectorAll('section').forEach(section => section.classList.remove('active'));
    if (targetSection) targetSection.classList.add('active');
  });
}

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('header nav');
if (menuIcon && nav) {
  menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

function newFunction() {
  // ... (existing code)
}

window.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to body for fade-in effect
  document.body.classList.add('loaded');
  
  // Add active class to header for slide-in effect
  document.querySelector('header').classList.add('active');
  
  // Show home section by default
  const homeSection = document.querySelector('.home');
  if (homeSection) {
    homeSection.classList.add('active');
  }
});