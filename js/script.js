function showPage(page) {
  const target = document.getElementById('page-' + page);
  if (!target) {
    // Unknown page (e.g. a service detail page not yet built) — fall back to services overview
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById('page-services').classList.add('active');
    document.getElementById('nav-services').classList.add('active');
    document.getElementById('nav-links').classList.remove('open');
    document.getElementById('nav-toggle').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  target.classList.add('active');
  const navItem = document.getElementById('nav-' + page);
  if (navItem) navItem.classList.add('active');
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('nav-toggle').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleServicesClick(e) {
  // On mobile, the parent toggles the accordion. On desktop, it navigates to the overview.
  if (window.innerWidth <= 960) {
    e.stopPropagation();
    document.getElementById('nav-mega-wrap').classList.toggle('mobile-open');
  } else {
    showPage('services');
  }
}

function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('nav-toggle').classList.toggle('open');
}

// Tap-to-flip for value cards on touch devices
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// Contact form submission via mailto (placeholder until Formspree/Web3Forms is added)
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const interest = document.getElementById('cf-interest').value;
  const message = document.getElementById('cf-message').value.trim();

  const subject = `Website enquiry: ${interest || 'General'}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    (phone ? `Phone: ${phone}\n` : '') +
    `Interested in: ${interest}\n\n` +
    `Message:\n${message}`;

  window.location.href = `mailto:murangiandco@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Hide Calendly placeholder once the widget loads (detected by iframe presence)
(function() {
  const checkCalendly = setInterval(() => {
    const widget = document.querySelector('.calendly-inline-widget iframe');
    const placeholder = document.getElementById('calendly-placeholder');
    if (widget && placeholder) {
      placeholder.style.display = 'none';
      clearInterval(checkCalendly);
    }
  }, 500);
  // Stop checking after 8 seconds either way
  setTimeout(() => clearInterval(checkCalendly), 8000);
})();

function showTab(tab) {
  document.getElementById('tab-biz-content').style.display = tab === 'biz' ? 'block' : 'none';
  document.getElementById('tab-ind-content').style.display = tab === 'ind' ? 'block' : 'none';
  document.getElementById('tab-biz').classList.toggle('active', tab === 'biz');
  document.getElementById('tab-ind').classList.toggle('active', tab === 'ind');
}

/* ---------------------------------------------------------------
   Deep-link support: allows sharing URLs such as
   https://www.murangiandco.com/#services
   Purely additive; falls back silently if the hash is unknown.
---------------------------------------------------------------- */
(function () {
  var applyHash = function () {
    var id = (window.location.hash || '').replace('#', '').trim();
    if (id && document.getElementById('page-' + id)) {
      showPage(id);
    }
  };
  window.addEventListener('DOMContentLoaded', applyHash);
  window.addEventListener('hashchange', applyHash);
})();
