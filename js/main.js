// Main App Controller: Preloader, GSAP Animations, Lenis Smooth Scroll & Reveals

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Timeline
  const preloader = document.getElementById('sitePreloader');
  const barFill = document.querySelector('.preloader-bar-fill');

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (progress > 100) progress = 100;
    if (barFill) barFill.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
        initScrollAndEntranceAnimations();
      }, 500);
    }
  }, 100);

  // 2. Scroll Progress Bar & Header Glass Effect
  const progressBar = document.querySelector('.scroll-progress-bar');
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = `${scrollPercent}%`;

    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // 3. Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(250, 247, 242, 0.98)';
        navMenu.style.padding = '24px';
        navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }
    });
  }

  // 4. Parallax Mouse on Hero section
  const heroSection = document.querySelector('.hero-section');
  const floatingTooth = document.querySelector('.hero-floating-tooth');
  const floatingBadge = document.querySelector('.hero-floating-badge');
  const heroGlow = document.querySelector('.hero-bg-glow');

  if (heroSection && !window.matchMedia('(pointer: coarse)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth - 0.5) * 2;
      const yNorm = (clientY / window.innerHeight - 0.5) * 2;

      if (floatingTooth) {
        floatingTooth.style.transform = `translate(${xNorm * -25}px, ${yNorm * -25}px)`;
      }
      if (floatingBadge) {
        floatingBadge.style.transform = `translate(${xNorm * 20}px, ${yNorm * 20}px)`;
      }
      if (heroGlow) {
        heroGlow.style.transform = `translate(${xNorm * -40}px, ${yNorm * -40}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      if (floatingTooth) floatingTooth.style.transform = 'translate(0, 0)';
      if (floatingBadge) floatingBadge.style.transform = 'translate(0, 0)';
      if (heroGlow) heroGlow.style.transform = 'translate(0, 0)';
    });
  }
});

// Function to split text into animated span characters
function splitCharacters(element) {
  if (!element || element.dataset.splitDone) return;
  const text = element.textContent.trim();
  element.innerHTML = '';
  
  // Split by words first so they don't break mid-word
  const words = text.split(' ');
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.style.marginRight = '0.28em';

    for (let char of word) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('char');
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    }
    element.appendChild(wordSpan);
  });
  element.dataset.splitDone = 'true';
}

function initScrollAndEntranceAnimations() {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Applying standard CSS visibility.');
    return;
  }

  // Register ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Character Reveal
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    splitCharacters(heroTitle);
    const chars = heroTitle.querySelectorAll('.char');
    gsap.fromTo(chars, 
      {
        opacity: 0,
        y: 40,
        rotateX: -45,
        filter: 'blur(8px)'
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.025,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }

  // 2. Hero Subtitle & CTA Blur Reveal
  gsap.fromTo('.hero-subtitle, .hero-rating-badge, .hero-cta-group, .hero-highlights-strip',
    { opacity: 0, y: 30, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: 'power2.out', delay: 0.5 }
  );

  // 3. Hero Visual Frame Image Mask Reveal
  gsap.fromTo('.hero-visual-frame',
    { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', scale: 0.95 },
    { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', scale: 1, duration: 1.4, ease: 'power4.out', delay: 0.3 }
  );

  // 4. Section Titles and Subtitles with ScrollTrigger
  const sectionHeaders = document.querySelectorAll('.about-content-col, .section-header-center, .experience-info, .booking-info');
  sectionHeaders.forEach((sec) => {
    const title = sec.querySelector('h2, .about-title, .experience-title');
    const desc = sec.querySelector('p, .about-bio-text, .experience-desc');
    const tag = sec.querySelector('.section-tag');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });

    if (tag) tl.fromTo(tag, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' });
    if (title) tl.fromTo(title, { opacity: 0, y: 35, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.3');
    if (desc) tl.fromTo(desc, { opacity: 0, y: 25, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }, '-=0.4');
  });

  // 5. Treatments Tilt Cards Stagger
  if (document.querySelectorAll('.tilt-card-wrapper').length) {
    gsap.fromTo('.tilt-card-wrapper',
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.treatments-grid',
          start: 'top 85%'
        }
      }
    );
  }

  // 6. Review Cards Stagger
  if (document.querySelectorAll('.review-card').length) {
    gsap.fromTo('.review-card',
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reviews-grid',
          start: 'top 85%'
        }
      }
    );
  }

  // 7. Stats Counter Animation in About
  const statNumbers = document.querySelectorAll('.about-stat-item h3');
  statNumbers.forEach((stat) => {
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 90%',
      onEnter: () => {
        stat.classList.add('stat-animated');
      }
    });
  });

  // 8. Parallax Image Scrolling in Experience Section
  const expImg = document.querySelector('.exp-main-img-card img');
  if (expImg && typeof ScrollTrigger !== 'undefined') {
    gsap.to(expImg, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  }
}
