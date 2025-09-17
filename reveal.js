// Drop-down reveal animation for all main sections and nav on page load
// Add this to min.js

document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate (in order)
  const elements = [
    document.querySelector('header.nav-wrap'),
    document.querySelector('.hero-left'),
    document.querySelector('.hero-right'),
    document.querySelector('#about'),
    document.querySelector('#skills'),
    document.querySelector('#projects'),
    document.querySelector('#contact')
  ].filter(Boolean);

  const duration = 900;
  const stagger = 350;

  // Animate only letters in headings
  for (const el of elements) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-60px)';
    el.style.willChange = 'opacity, transform';
    el.querySelectorAll('h1, h2, h3').forEach(heading => {
      const text = heading.textContent;
      heading.innerHTML = '';
      text.split('').forEach((char, idx) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(-30px)';
        span.style.transition = `opacity 0.6s cubic-bezier(.6,.2,.2,1), transform 0.6s cubic-bezier(.6,.2,.2,1)`;
        span.style.willChange = 'opacity, transform';
        heading.appendChild(span);
      });
    });
  }

  // Animate with stagger
  for (let i = 0; i < elements.length; i++) {
    setTimeout(() => {
      elements[i].style.transition = `opacity ${duration}ms cubic-bezier(.6,.2,.2,1), transform ${duration}ms cubic-bezier(.6,.2,.2,1)`;
      elements[i].style.opacity = '1';
      elements[i].style.transform = 'translateY(0)';
      elements[i].style.willChange = '';
      // Animate letters inside headings
      elements[i].querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.childNodes.forEach((span, idx) => {
          setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
            span.style.willChange = '';
          }, idx * 30);
        });
      });
    }, 600 + i * stagger);
  }
});
