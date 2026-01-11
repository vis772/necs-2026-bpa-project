/**
 * NECS 2026 - Main JavaScript
 * National Esports Championship Series 2026
 * 
 * Apple-style scroll-driven storytelling animations
 * Features cinematic, controlled, subtle motion tied to scroll position
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdown();
  initScheduleTabs();
  initTeamTabs();
  initAppleScrollReveal();
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
    
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  }

  const navLinks = document.querySelectorAll('.navbar-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.remove('active');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('active')) {
      menu.classList.remove('active');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    }
  });

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

  if (!countdownElements.days) return;

  const eventDate = new Date('2026-05-06T09:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      animateValue(countdownElements.days, days);
      animateValue(countdownElements.hours, hours);
      animateValue(countdownElements.minutes, minutes);
      animateValue(countdownElements.seconds, seconds);
    } else {
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
      dayButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      scheduleContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      const day = button.dataset.day;
      const targetContent = document.getElementById('schedule-day-' + day);
      if (targetContent) {
        targetContent.style.display = 'block';
        targetContent.classList.add('active');
        
        // Animate schedule items with stagger
        const items = targetContent.querySelectorAll('.schedule-item');
        items.forEach((item, index) => {
          item.classList.remove('is-revealed');
          item.style.transitionDelay = (index * 0.08) + 's';
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.classList.add('is-revealed');
            });
          });
        });
      }
    });
    
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
      teamTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      teamGrids.forEach(grid => {
        grid.style.display = 'none';
        grid.classList.remove('active');
      });

      const game = tab.dataset.game;
      const targetGrid = document.getElementById('teams-' + game);
      if (targetGrid) {
        targetGrid.style.display = 'grid';
        targetGrid.classList.add('active');
        
        // Animate cards with Apple-style reveal
        const cards = targetGrid.querySelectorAll('.team-card');
        cards.forEach((card, index) => {
          card.classList.remove('is-revealed');
          // Center card (index 1) appears first
          const delay = index === 1 ? 0 : 0.05 + (index * 0.1);
          card.style.transitionDelay = delay + 's';
          
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('is-revealed');
            });
          });
        });
      }
    });
    
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
   APPLE-STYLE SCROLL REVEAL SYSTEM
   ======================================== */

function initAppleScrollReveal() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Immediately reveal all elements
    revealAllElements();
    return;
  }

  // Initialize all section observers
  initHeroReveal();
  initRhythmReveal();
  initTeamsReveal();
  initScheduleReveal();
  initConcertReveal();
  initTicketsReveal();
  initFooterReveal();
}

function revealAllElements() {
  // Reveal all scroll-animated elements immediately
  document.querySelectorAll('.scroll-reveal-item').forEach(el => el.classList.add('is-revealed'));
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('is-revealed'));
  document.querySelectorAll('.team-card').forEach(el => el.classList.add('is-revealed'));
  document.querySelectorAll('.ticket-card').forEach(el => el.classList.add('is-revealed'));
  document.querySelectorAll('.schedule-item').forEach(el => el.classList.add('is-revealed'));
  document.querySelectorAll('.teams-tabs').forEach(el => el.classList.add('is-revealed'));
  document.querySelectorAll('.concert-card').forEach(el => el.classList.add('is-revealed'));
}

/* ========================================
   HERO SECTION REVEAL
   ======================================== */

function initHeroReveal() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroItems = hero.querySelectorAll('.scroll-reveal-item');
  
  // Hero reveals on page load with slight delay
  setTimeout(() => {
    heroItems.forEach(item => {
      item.classList.add('is-revealed');
    });
  }, 100);
}

/* ========================================
   RHYTHM SECTION REVEAL
   ======================================== */

function initRhythmReveal() {
  const rhythmSection = document.querySelector('.rhythm-section');
  if (!rhythmSection) return;

  const rhythmItems = rhythmSection.querySelectorAll('.scroll-reveal-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rhythmItems.forEach(item => {
          item.classList.add('is-revealed');
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  observer.observe(rhythmSection);
}

/* ========================================
   TEAMS SECTION REVEAL
   ======================================== */

function initTeamsReveal() {
  const teamsSection = document.querySelector('.teams-section');
  if (!teamsSection) return;

  const sectionHeader = teamsSection.querySelector('.section-header');
  const teamsTabs = teamsSection.querySelector('.teams-tabs');
  
  // Observer for section header
  if (sectionHeader) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          headerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    headerObserver.observe(sectionHeader);
  }

  // Observer for tabs
  if (teamsTabs) {
    const tabsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          tabsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -30px 0px'
    });
    
    tabsObserver.observe(teamsTabs);
  }

  // Observer for team cards
  const observeTeamCards = () => {
    const visibleGrid = teamsSection.querySelector('.teams-grid.active, .teams-grid[style*="display: grid"]');
    if (!visibleGrid) return;
    
    const cards = visibleGrid.querySelectorAll('.team-card');
    
    cards.forEach((card, index) => {
      // Center card (index 1) gets emphasis
      const baseDelay = index === 1 ? 0 : 0.1 + (index * 0.12);
      card.style.transitionDelay = baseDelay + 's';
      
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            cardObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: index === 1 ? 0.08 : 0.12,
        rootMargin: '0px 0px -60px 0px'
      });
      
      cardObserver.observe(card);
    });
  };
  
  observeTeamCards();
}

/* ========================================
   SCHEDULE SECTION REVEAL
   ======================================== */

function initScheduleReveal() {
  const scheduleSection = document.querySelector('.schedule-section');
  if (!scheduleSection) return;

  const sectionHeader = scheduleSection.querySelector('.section-header');
  const countdown = scheduleSection.querySelector('.countdown-wrapper');
  const scheduleDays = scheduleSection.querySelector('.schedule-days');
  const scheduleItems = scheduleSection.querySelectorAll('.schedule-content.active .schedule-item, #schedule-day-1 .schedule-item');

  // Observer for section header
  if (sectionHeader) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          headerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    headerObserver.observe(sectionHeader);
  }

  // Observer for countdown
  if (countdown) {
    const countdownObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          countdownObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.4,
      rootMargin: '0px 0px -40px 0px'
    });
    
    countdownObserver.observe(countdown);
  }

  // Observer for day selector
  if (scheduleDays) {
    const daysObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          daysObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -30px 0px'
    });
    
    daysObserver.observe(scheduleDays);
  }

  // Observer for schedule items with stagger
  scheduleItems.forEach((item, index) => {
    item.style.transitionDelay = (index * 0.08) + 's';
    
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          itemObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
    
    itemObserver.observe(item);
  });
}

/* ========================================
   CONCERT SECTION REVEAL
   ======================================== */

function initConcertReveal() {
  const concertSection = document.querySelector('.concert-section');
  if (!concertSection) return;

  const sectionHeader = concertSection.querySelector('.section-header');
  const concertCards = concertSection.querySelectorAll('.concert-card');

  // Observer for section header
  if (sectionHeader) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          headerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    headerObserver.observe(sectionHeader);
  }

  // Observer for concert cards with stagger
  concertCards.forEach((card, index) => {
    // Featured card reveals first
    const isFeatured = card.classList.contains('concert-card-featured');
    const delay = isFeatured ? 0 : (index * 0.1);
    card.style.transitionDelay = delay + 's';
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: isFeatured ? 0.1 : 0.15,
      rootMargin: '0px 0px -60px 0px'
    });
    
    cardObserver.observe(card);
  });
}

/* ========================================
   TICKETS SECTION REVEAL
   ======================================== */

function initTicketsReveal() {
  const ticketsSection = document.querySelector('.tickets-section');
  if (!ticketsSection) return;

  const sectionHeader = ticketsSection.querySelector('.section-header');
  const ticketCards = ticketsSection.querySelectorAll('.ticket-card');

  // Observer for section header
  if (sectionHeader) {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          headerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    headerObserver.observe(sectionHeader);
  }

  // Observer for ticket cards with stagger
  ticketCards.forEach((card, index) => {
    // Featured card (center) reveals first
    const isFeatured = card.classList.contains('featured');
    const delay = isFeatured ? 0 : (index * 0.12);
    card.style.transitionDelay = delay + 's';
    
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: isFeatured ? 0.1 : 0.15,
      rootMargin: '0px 0px -60px 0px'
    });
    
    cardObserver.observe(card);
  });
}

/* ========================================
   FOOTER REVEAL
   ======================================== */

function initFooterReveal() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const footerItems = footer.querySelectorAll('.scroll-reveal-item');
  
  footerItems.forEach((item, index) => {
    item.style.transitionDelay = (index * 0.08) + 's';
    
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          itemObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px'
    });
    
    itemObserver.observe(item);
  });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

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

document.querySelectorAll('img:not([loading])').forEach(img => {
  img.setAttribute('loading', 'lazy');
});
