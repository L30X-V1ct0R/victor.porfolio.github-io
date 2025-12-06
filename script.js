(function() {
  'use strict';

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      navToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // Close nav when link clicked
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.style.display = 'none';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#top') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal');
  
  function revealOnScroll() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = elementTop < window.innerHeight && elementBottom > 0;
      
      if (isVisible) {
        element.classList.add('is-visible');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // ===== CLICK ANIMATIONS ON PROJECT CARDS =====
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.animation = 'pulse 0.6s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 600);
    });
  });

  // ===== SKILL TAGS CLICK EFFECT =====
  const skillTags = document.querySelectorAll('.skills span');
  skillTags.forEach(tag => {
    tag.addEventListener('click', function() {
      this.style.animation = 'bounce 0.6s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 600);
    });
  });

  // ===== FEATURE LIST ITEMS CLICK EFFECT =====
  const featureItems = document.querySelectorAll('.feature-list li');
  featureItems.forEach(item => {
    item.addEventListener('click', function() {
      this.style.animation = 'slideIn 0.5s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 500);
    });
  });

  // ===== STAT CARDS COUNTER ANIMATION =====
  const stats = document.querySelectorAll('.stat strong');
  stats.forEach(stat => {
    stat.addEventListener('mouseenter', function() {
      this.style.animation = 'spin 0.6s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 600);
    });
  });

  // ===== FORM VALIDATION & SUBMISSION FEEDBACK =====
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      
      // Simple validation
      if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
        alert('⚠️ Please fill in all fields!');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert('⚠️ Please enter a valid email address!');
        return;
      }
      
      // Success message
      alert('✅ Thanks for reaching out, ' + nameInput.value + '! I\'ll get back to you soon.');
      this.reset();
    });
  }

  // ===== BUTTON RIPPLE EFFECT =====
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
      const homeLink = document.querySelector('a[href="#top"], a[href="index.html"]');
      if (homeLink) homeLink.click();
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
      const contactSection = document.querySelector('#contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ===== USEFUL WEBSITES SEARCH FUNCTIONALITY =====
  const searchInput = document.getElementById('websiteSearch');
  const searchBtn = document.getElementById('searchBtn');
  const websiteCards = document.querySelectorAll('.website-card');
  const websitesGrid = document.getElementById('websitesGrid');
  const noResults = document.getElementById('noResults');

  // Function to filter websites
  function filterWebsites(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    
    websiteCards.forEach(card => {
      const name = card.getAttribute('data-name').toLowerCase();
      const category = card.getAttribute('data-category').toLowerCase();
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      
      // Check if search term matches any field
      const matches = name.includes(term) || 
                     category.includes(term) || 
                     title.includes(term) || 
                     description.includes(term);
      
      if (term === '' || matches) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease';
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    
    // Show/hide no results message
    if (visibleCount === 0 && term !== '') {
      noResults.style.display = 'block';
      noResults.style.animation = 'fadeIn 0.4s ease';
    } else {
      noResults.style.display = 'none';
    }
  }

  // Search on button click
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const searchTerm = searchInput.value;
      filterWebsites(searchTerm);
      
      // Add button click animation
      this.style.animation = 'pulse 0.4s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 400);
    });
  }

  // Search on input change (real-time search)
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterWebsites(this.value);
    });
    
    // Search on Enter key press
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        filterWebsites(this.value);
      }
    });
  }

  // Add click animation to website cards
  websiteCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't prevent the link from working
      if (e.target.tagName !== 'A') {
        const link = this.querySelector('.website-link');
        if (link) {
          link.click();
        }
      }
    });
  });

  // Add hover animation to website links
  const websiteLinks = document.querySelectorAll('.website-link');
  websiteLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.animation = 'slideIn 0.3s ease';
    });
  });

  // Clear search on Escape key
  if (searchInput) {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchInput === document.activeElement) {
        searchInput.value = '';
        filterWebsites('');
      }
    });
  }

  // ===== STAT CARDS CLICK NAVIGATION =====
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.animation = 'pulse 0.4s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 400);
    });
  });

  // ===== PROFILE PIC HOVER EFFECT =====
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) {
    profilePic.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08) rotate(2deg)';
    });
    
    profilePic.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  // ===== ACTIVE NAV LINK DETECTION =====
  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
    });
  }
  
  updateActiveNav();

  // ===== SCROLL TO TOP BUTTON =====
  const backTopBtn = document.querySelector('.back-top');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== LAZY LOAD IMAGES =====
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';
      imageObserver.observe(img);
    });
  }

  // ===== PERFORMANCE: ADD ANIMATIONS TO CSS =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes spin {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== CONSOLE MESSAGE =====
  console.log('%c🚀 Victor\'s Portfolio Loaded!', 'color: #00b3ff; font-size: 16px; font-weight: bold;');
  console.log('%cTry pressing H for home or C for contact!', 'color: #7b61ff; font-size: 12px;');

})();