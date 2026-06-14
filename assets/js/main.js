/* ==========================================
   BLOG DA LU - MAIN JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* --- Menu Toggle (Mobile) --- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Animate hamburger
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }

  /* --- Highlight current page in nav --- */
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath ||
        currentPath.endsWith(linkPath) ||
        (linkPath !== 'index.html' && currentPath.includes(linkPath))) {
      link.classList.add('active');
    }
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* --- Newsletter form --- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value.trim()) {
        alert('Obrigada por se inscrever! 🎉 Em breve você receberá novidades.');
        input.value = '';
      } else {
        alert('Por favor, digite seu e-mail.');
      }
    });
  }

  /* --- Contact form --- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada com sucesso! ✅ Entrarei em contato em breve.');
      contactForm.reset();
    });
  }

  /* --- Accordion --- */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');

      document.querySelectorAll('.accordion-body.open').forEach(openBody => {
        if (openBody !== body) {
          openBody.classList.remove('open');
          openBody.previousElementSibling.classList.remove('active');
        }
      });

      body.classList.toggle('open');
      header.classList.toggle('active');
    });
  });

  /* --- Animação de scroll (Intersection Observer) --- */
  const animateElements = document.querySelectorAll('.card, .post-item, .category-card, .resource-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
