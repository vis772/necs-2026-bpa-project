/**
 * NECS 2026 - Main JavaScript
 * National Esports Championship Series 2026
 * 
 * Interactive functionality for the promotional website.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdown();
  initScheduleTabs();
  initTeamTabs();
  initScrollAnimations();
});

/* ========================================
   NAVIGATION
   ======================================== */

function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }

  // Close menu on link click
  const navLinks = document.querySelectorAll('.navbar-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('active');
      toggle?.classList.remove('active');
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

/* ========================================
   COUNTDOWN TIMER
   ======================================== */

function initCountdown() {
  const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  // Event date: May 6, 2026
  const eventDate = new Date('2026-05-06T09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (countdownElements.days) countdownElements.days.textContent = String(days).padStart(2, '0');
      if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
      if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
      if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
    }
  }

  // Initial call and interval
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ========================================
   SCHEDULE TABS
   ======================================== */

function initScheduleTabs() {
  const dayButtons = document.querySelectorAll('.schedule-day');
  const scheduleContents = document.querySelectorAll('.schedule-content');

  dayButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      dayButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      // Hide all schedule contents
      scheduleContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      // Show the corresponding schedule content
      const day = button.dataset.day;
      const targetContent = document.getElementById(`schedule-day-${day}`);
      if (targetContent) {
        targetContent.style.display = 'block';
        targetContent.classList.add('active');
      }
    });
  });
}

/* ========================================
   TEAM TABS
   ======================================== */

function initTeamTabs() {
  const teamTabs = document.querySelectorAll('.team-tab');
  const teamGrids = document.querySelectorAll('.teams-grid');

  teamTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      teamTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      // Hide all team grids
      teamGrids.forEach(grid => {
        grid.style.display = 'none';
        grid.classList.remove('active');
      });

      // Show the corresponding team grid
      const game = tab.dataset.game;
      const targetGrid = document.getElementById(`teams-${game}`);
      if (targetGrid) {
        targetGrid.style.display = 'grid';
        targetGrid.classList.add('active');
      }
    });
  });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ========================================
   TICKET PURCHASE (Placeholder)
   ======================================== */

function initTicketPurchase() {
  const buyButtons = document.querySelectorAll('.ticket-card .btn');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      // Placeholder for ticket purchase functionality
      alert('Ticket purchasing will be available soon! Stay tuned for updates.');
    });
  });
}

// Initialize ticket purchase
document.addEventListener('DOMContentLoaded', initTicketPurchase);


