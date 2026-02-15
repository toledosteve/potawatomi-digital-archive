/**
 * Potawatomi Digital Archive - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize any interactive components
  initializeLazyLoading();
  initializeAccessibility();
});

/**
 * Lazy load images for better performance
 */
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.removeAttribute('data-src');
          imageObserver.unobserve(image);
        }
      });
    });

    images.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(function(img) {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Enhance accessibility
 */
function initializeAccessibility() {
  // Add skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  // Announce dynamic content changes to screen readers
  window.announceToScreenReader = function(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('visually-hidden');
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(function() {
      announcement.remove();
    }, 1000);
  };
}

/**
 * Format dates consistently
 */
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = function() {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
