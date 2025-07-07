// Combined main.js
import { db, collection, addDoc, serverTimestamp } from './firebase.js';

// === Firebase Form Logic ===
const form = document.getElementById('appointmentForm');
const loadingEl = document.querySelector('.loading');
const errorEl   = document.querySelector('.error-message');
const successEl = document.querySelector('.sent-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  loadingEl.style.display = 'block';
  errorEl.style.display   = 'none';
  successEl.style.display = 'none';

  const data = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    phone:   form.phone.value.trim(),
    date:    form.date.value,
    time:    form.time.value,
    topic:   form.topic.value,
    message: form.message.value.trim(),
    submittedAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, 'Appointments'), data);

    loadingEl.style.display = 'none';
    successEl.style.display = 'block';
    form.reset();
  } catch (err) {
    console.error('Error saving appointment:', err);
    loadingEl.style.display = 'none';
    errorEl.textContent = 'Oops! Something went wrong. Try again later.';
    errorEl.style.display = 'block';
  }
});

// === UI Logic (Navbar, Scroll, Audio, etc.) ===
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) selectEl.forEach(e => e.addEventListener(type, listener));
      else selectEl.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => el.addEventListener('scroll', listener);

  // Navbar active on scroll
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  // Header scroll
  let selectHeader = select('#header');
  let selectTopbar = select('#topbar');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
        if (selectTopbar) selectTopbar.classList.add('topbar-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
        if (selectTopbar) selectTopbar.classList.remove('topbar-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  // Back to top
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Dropdowns
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  // Scroll links
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      let navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  // Scroll on page load
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  // Preloader
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // GLightbox
  const glightbox = GLightbox({ selector: '.glightbox' });
  const galelryLightbox = GLightbox({ selector: '.galelry-lightbox' });

  // Swiper
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  // Audio
  let audio = new Audio('assets/the_lamp_is_low.wav');
  let audioButton = select('#audio-button');
  let isAudioPlaying = false;

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audio.pause();
      isAudioPlaying = false;
      audioButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
    } else {
      audio.play();
      isAudioPlaying = true;
      audioButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
    }
  };

  if (audioButton) {
    audioButton.addEventListener('click', toggleAudio);
  }

  new PureCounter();
})();
