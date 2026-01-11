/**
 * NECS 2026 - Main JavaScript
 * National Esports Championship Series 2026
 * 
 * Interactive functionality for the promotional website.
 * Features smooth scroll animations and refined interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdown();
  initScheduleTabs();
  initTeamTabs();
  initScrollAnimations();
  initStaggeredAnimations();
  initTeamsScrollReveal();
});

/* ========================================
   NAVIGATION
   ======================================== */

function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  const navbar = document.querySelector('.navbar');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isActive = menu.classList.toggle('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
    });
    
    // Handle keyboard navigation
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  }

  // Close menu on link click
  const navLinks = document.querySelectorAll('.navbar-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('active');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('active')) {
      menu.classList.remove('active');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    }
  });

  // Navbar background on scroll
  if (navbar) {
    let ticking = false;
    
    const updateNavbar = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
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

  // Check if elements exist
  if (!countdownElements.days) return;

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

      // Animate number changes
      animateValue(countdownElements.days, days);
      animateValue(countdownElements.hours, hours);
      animateValue(countdownElements.minutes, minutes);
      animateValue(countdownElements.seconds, seconds);
    } else {
      // Event has started
      if (countdownElements.days) countdownElements.days.textContent = '00';
      if (countdownElements.hours) countdownElements.hours.textContent = '00';
      if (countdownElements.minutes) countdownElements.minutes.textContent = '00';
      if (countdownElements.seconds) countdownElements.seconds.textContent = '00';
    }
  }
  
  function animateValue(element, newValue) {
    if (!element) return;
    const formattedValue = String(newValue).padStart(2, '0');
    if (element.textContent !== formattedValue) {
      element.textContent = formattedValue;
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

  if (!dayButtons.length) return;

  dayButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      dayButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Hide all schedule contents
      scheduleContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      // Show the corresponding schedule content with animation
      const day = button.dataset.day;
      const targetContent = document.getElementById('schedule-day-' + day);
      if (targetContent) {
        targetContent.style.display = 'block';
        targetContent.classList.add('active');
        
        // Trigger stagger animation for schedule items
        const items = targetContent.querySelectorAll('.schedule-item');
        items.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 60);
        });
      }
    });
    
    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      const buttons = Array.from(dayButtons);
      const currentIndex = buttons.indexOf(button);
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
        buttons[prevIndex].click();
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

  if (!teamTabs.length) return;

  teamTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      teamTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // Add active class to clicked tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Hide all team grids
      teamGrids.forEach(grid => {
        grid.style.display = 'none';
        grid.classList.remove('active');
      });

      // Show the corresponding team grid with cinematic animation
      const game = tab.dataset.game;
      const targetGrid = document.getElementById('teams-' + game);
      if (targetGrid) {
        targetGrid.style.display = 'grid';
        targetGrid.classList.add('active');
        
        // Animate cards with Apple-style reveal
        const cards = targetGrid.querySelectorAll('.team-card');
        cards.forEach((card, index) => {
          // Reset state
          card.classList.remove('is-revealed');
          card.style.transitionDelay = (0.05 + (index * 0.1)) + 's';
          
          // Trigger reveal after a frame
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('is-revealed');
            });
          });
        });
      }
    });
    
    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      const tabs = Array.from(teamTabs);
      const currentIndex = tabs.indexOf(tab);
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[prevIndex].focus();
        tabs[prevIndex].click();
      }
    });
  });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

function initScrollAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show all elements immediately
    document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-scale-in').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-scale-in');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ========================================
   STAGGERED ANIMATIONS FOR GRIDS
   ======================================== */

function initStaggeredAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;

  const staggerContainers = document.querySelectorAll('.stagger-children:not(.teams-grid)');
  
  if (!staggerContainers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, index) => {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            child.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 60);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  staggerContainers.forEach(container => observer.observe(container));
}

/* ========================================
   TEAMS SECTION - Apple-Style Scroll Reveal
   ======================================== */

function initTeamsScrollReveal() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show all elements immediately
    document.querySelectorAll('.teams-section .section-header').forEach(el => el.classList.add('is-revealed'));
    document.querySelectorAll('.teams-tabs').forEach(el => el.classList.add('is-revealed'));
    document.querySelectorAll('.team-card').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const teamsSection = document.querySelector('.teams-section');
  if (!teamsSection) return;

  // Elements to animate
  const sectionHeader = teamsSection.querySelector('.section-header');
  const teamsTabs = teamsSection.querySelector('.teams-tabs');

  // Create scroll-based reveal with Intersection Observer
  const createObserver = (element, options) => {
    options = options || {};
    const defaultOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };
    
    const mergedOptions = Object.assign({}, defaultOptions, options);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, mergedOptions);
    
    observer.observe(element);
  };

  // Observe section header
  if (sectionHeader) {
    createObserver(sectionHeader, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
  }

  // Observe tabs with slight delay after header
  if (teamsTabs) {
    createObserver(teamsTabs, { threshold: 0.5, rootMargin: '0px 0px -30px 0px' });
  }

  // Observe team cards in the initially visible grid
  const observeTeamCards = () => {
    const visibleGrid = teamsSection.querySelector('.teams-grid.active, .teams-grid[style*="display: grid"]');
    if (!visibleGrid) return;
    
    const cards = visibleGrid.querySelectorAll('.team-card');
    
    cards.forEach((card, index) => {
      // Add custom transition delay for stagger effect
      const baseDelay = 0.1;
      const staggerDelay = index * 0.12;
      
      // Center card (index 1) gets emphasis - slightly earlier reveal
      if (index === 1) {
        card.style.transitionDelay = baseDelay + 's';
        card.style.transitionDuration = '0.8s';
      } else {
        card.style.transitionDelay = (baseDelay + staggerDelay) + 's';
      }
      
      const threshold = index === 1 ? 0.08 : 0.12;
      
      createObserver(card, { 
        threshold: threshold, 
        rootMargin: '0px 0px -60px 0px' 
      });
    });
  };
  
  observeTeamCards();
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      
      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

/* ========================================
   FLOW SECTION ANIMATION
   ======================================== */

function initFlowAnimation() {
  const flowBars = document.querySelectorAll('.flow-bar');
  
  if (!flowBars.length) return;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    flowBars.forEach(bar => {
      bar.style.animation = 'none';
    });
  }
}

// Initialize flow animation
document.addEventListener('DOMContentLoaded', initFlowAnimation);

/* ========================================
   UTILITY: THROTTLE FUNCTION
   ======================================== */

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() { inThrottle = false; }, limit);
    }
  };
}

/* ========================================
   PERFORMANCE: LAZY LOADING SUPPORT
   ======================================== */

// Add loading="lazy" to images if not already present
document.querySelectorAll('img:not([loading])').forEach(img => {
  img.setAttribute('loading', 'lazy');
});
