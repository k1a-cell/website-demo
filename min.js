// Basic interactivity: nav toggle, smooth scroll, modal preview, contact form validation, reveal on scroll

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // NAV TOGGLE (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // SMOOTH SCROLL for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // close mobile menu
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // PROJECT MODAL
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLive = document.getElementById('modal-live');
  const modalCode = document.getElementById('modal-code');
  const closeBtn = document.querySelector('.modal-close');

  document.querySelectorAll('.project-card .view-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      openProjectModal(card);
    });
  });

  // also open by pressing Enter for keyboard accessibility
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  function openProjectModal(card) {
    const title = card.dataset.title || 'Project';
    const desc = card.dataset.desc || '';
    const tech = card.dataset.tech || '';
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalTech.textContent = tech;
    // placeholder links
    modalLive.href = '#';
    modalCode.href = '#';
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      // focus first interactive element inside modal
      closeBtn.focus();
    }, 200);
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // CONTACT FORM (client-side)
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all fields.';
      return;
    }
    // simple email regex
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      return;
    }

    // For demo: use mailto fallback
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // This opens the user's email client. Replace with actual POST to a server when going production.
    window.location.href = `mailto:kyle@example.com?subject=${subject}&body=${body}`;
    formMsg.textContent = 'Opening your email client...';
  });

  // REVEAL ON SCROLL (simple)
  const revealItems = document.querySelectorAll('.skill-card, .project-card, .stat, .about-text, .profile-card, .contact-form, .info-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'opacity .6s ease, transform .6s ease';
    obs.observe(item);
  });

});