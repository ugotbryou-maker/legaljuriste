(function () {
  'use strict';

  /* ---------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navPanel = document.getElementById('navPanel');

  function closeNav() {
    if (!navToggle || !navPanel) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navPanel.removeAttribute('data-open');
    document.body.classList.remove('no-scroll');
  }

  function toggleNav() {
    if (!navToggle || !navPanel) return;
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeNav();
    } else {
      navToggle.setAttribute('aria-expanded', 'true');
      navPanel.setAttribute('data-open', 'true');
      document.body.classList.add('no-scroll');
    }
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', toggleNav);

    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Reset mobile nav state when resizing to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeNav();
    });
  }

  /* ---------------------------------------------------------
     FAQ accordion
     --------------------------------------------------------- */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';

      if (isOpen) {
        item.removeAttribute('data-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------------------------------------------------
     Focus management on anchor navigation (a11y)
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }

      window.setTimeout(function () {
        target.focus({ preventScroll: true });
      }, 400);
    });
  });

  /* ---------------------------------------------------------
     Formulaire de contact -> Google Sheets (Apps Script Web App)
     --------------------------------------------------------- */
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  if (contactForm) {
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var submitBtnDefaultHTML = submitBtn ? submitBtn.innerHTML : '';

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var action = contactForm.getAttribute('action');
      if (!action || action.indexOf('REMPLACER_PAR_ID_DE_DEPLOIEMENT') !== -1) {
        if (formStatus) {
          formStatus.hidden = false;
          formStatus.className = 'form-status form-status--error';
          formStatus.textContent = "Le formulaire n'est pas encore connecté. Merci de nous contacter par téléphone ou WhatsApp en attendant.";
        }
        return;
      }

      var formData = new FormData(contactForm);
      formData.append('page', window.location.href);
      formData.append('date', new Date().toISOString());

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }

      fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
        .then(function () {
          contactForm.reset();
          contactForm.hidden = true;
          if (formStatus) {
            formStatus.hidden = false;
            formStatus.className = 'form-status form-status--success';
            formStatus.textContent = 'Merci ! Votre demande a bien été envoyée. Notre équipe vous recontacte sous 24 à 48h ouvrées.';
            formStatus.focus();
          }
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtnDefaultHTML;
          }
          if (formStatus) {
            formStatus.hidden = false;
            formStatus.className = 'form-status form-status--error';
            formStatus.textContent = "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous contacter par téléphone/WhatsApp.";
          }
        });
    });
  }

  /* ---------------------------------------------------------
     Cookie consent banner
     --------------------------------------------------------- */
  var COOKIE_KEY = 'legal-juriste-cookie-consent';
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieRefuse = document.getElementById('cookieRefuse');
  var cookieSettingsLink = document.getElementById('cookieSettingsLink');

  function showCookieBanner() {
    if (cookieBanner) cookieBanner.setAttribute('data-visible', 'true');
  }

  function hideCookieBanner() {
    if (cookieBanner) cookieBanner.removeAttribute('data-visible');
  }

  function applyConsent(consent) {
    // Charger les scripts tiers (Google Ads, Meta Pixel, GA4...) uniquement
    // si l'utilisateur a accepté les cookies de mesure/publicité.
    // Voir README.md pour ajouter les identifiants de ces outils.
    if (consent === 'accepted') {
      document.dispatchEvent(new CustomEvent('cookies:accepted'));
    } else {
      document.dispatchEvent(new CustomEvent('cookies:refused'));
    }
  }

  if (cookieBanner) {
    var storedConsent = null;
    try {
      storedConsent = window.localStorage.getItem(COOKIE_KEY);
    } catch (e) {
      storedConsent = null;
    }

    if (storedConsent) {
      applyConsent(storedConsent);
    } else {
      showCookieBanner();
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', function () {
        try { window.localStorage.setItem(COOKIE_KEY, 'accepted'); } catch (e) {}
        applyConsent('accepted');
        hideCookieBanner();
      });
    }

    if (cookieRefuse) {
      cookieRefuse.addEventListener('click', function () {
        try { window.localStorage.setItem(COOKIE_KEY, 'refused'); } catch (e) {}
        applyConsent('refused');
        hideCookieBanner();
      });
    }

    if (cookieSettingsLink) {
      cookieSettingsLink.addEventListener('click', function () {
        showCookieBanner();
      });
    }
  }
})();
