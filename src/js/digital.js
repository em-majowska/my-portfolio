import {
  isDesktop,
  touch,
  showMenu,
  setupLangNavEvents,
  initNavToggle,
  initAnimationObserver,
  scrollToTop,
  initSpotlightCursor,
  spotlight,
  translationSetup,
  menuBtn,
} from './utils.js';

let langData;

document.addEventListener('DOMContentLoaded', async () => {
  langData = await translationSetup(isDesktop);
  initNavToggle(isDesktop, langData);

  touch ? (spotlight.style.display = 'none') : initSpotlightCursor();
  document.body.classList.remove('preload');

  // Prepare sections animations on scroll
  const animationObserver = initAnimationObserver();
  const animatedSections = Array.from(
    document.querySelectorAll('.description')
  );
  animatedSections.forEach((section) => animationObserver.observe(section));
});

/* Update Hero on window resize */

window.addEventListener('resize', () => {
  showMenu(isDesktop);
  setupLangNavEvents(langData);
  cacheImages();
});

window.onscroll = function () {
  scrollToTop();
};

/* Scroll to top button appearance */
window.onscroll = function () {
  scrollToTop();
};

/* Cache API for images */

const CACHE_LIFETIME = 259200000; // 3 days

if ('caches' in window) {
  cacheImages();

  document.querySelectorAll('img[data-src]').forEach(async (img) => {
    img.src = await getDataFromCache(img.dataset.src, 'image');
  });
} else {
  console.log('Cache API not supported in this browser.');
}

async function cacheImages() {
  try {
    // Open cache
    const cache = await caches.open('image-cache');
    const imgSources = Array.from(document.querySelectorAll('img')).map(
      (img) => img.src
    );

    // Fetch and cache each image
    await Promise.all(
      imgSources.map(async (imgSource) => {
        const timestampKey = `cache-timestamp-${imgSource}`;
        const lastCached = localStorage.getItem(timestampKey);
        const now = Date.now();

        if (!lastCached || now - lastCached > CACHE_LIFETIME) {
          const response = await fetch(imgSource);
          await cache.put(imgSource, response);
          localStorage.setItem(timestampKey, now);
        }
      })
    );
  } catch (err) {
    console.error('Error caching images:', err);
  }
}

// Retrieve data from cache or fetch if not present

async function getDataFromCache(data, type) {
  const cache = await caches.open(`${type}-cache`);

  const cachedResponse = await cache.match(data);

  if (cachedResponse) {
    return cachedResponse;
  } else {
    const response = await fetch(data);
    await cache.put(data, response.clone());
    return response;
  }
}

// Digital art

const galleryImage = document.getElementById('digital-gallery-img');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const buttons = document.querySelectorAll('.digital-list__btn');

let selectedArt = {
  name: '',
  alt: '',
};

function getImagePath(name) {
  return `./assets/img/digital/${name}.jpg`;
}

function showImage(name, alt) {
  galleryImage.src = getImagePath(name);
  galleryImage.alt = alt;
  galleryImage.style.display = 'block';
  void galleryImage.offsetWidth;
  galleryImage.classList.add('image-enter');
}

function hideImage() {
  galleryImage.style.display = 'none';
  galleryImage.classList.remove('image-enter');
}

//Hover preview
buttons.forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    showImage(btn.dataset.art, btn.getAttribute('aria-label'));
  });
  btn.addEventListener('mouseleave', hideImage);

  btn.addEventListener('click', () => {
    selectedArt.name = btn.dataset.art;
    selectedArt.alt = btn.getAttribute('aria-label');
    openLightbox(selectedArt.name, selectedArt.alt);
  });
});

// Lightbox

function openLightbox(name, alt) {
  lightboxImage.src = getImagePath(name);
  lightboxImage.alt = alt;
  lightboxTitle.textContent = alt;
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.id === 'lightbox-btn') {
    closeLightbox();
  }
});

// Lightbox navigation

const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

prevBtn.addEventListener('click', () => {
  navigateLightbox(-1);
});

nextBtn.addEventListener('click', () => {
  navigateLightbox(1);
});

function navigateLightbox(direction) {
  const currentIndex = Array.from(buttons).findIndex(
    (btn) => btn.dataset.art === selectedArt.name
  );
  let newIndex = currentIndex + direction;

  if (newIndex < 0) {
    newIndex = buttons.length - 1;
  } else if (newIndex >= buttons.length) {
    newIndex = 0;
  }

  const newBtn = buttons[newIndex];
  selectedArt.name = newBtn.dataset.art;
  selectedArt.alt = newBtn.getAttribute('aria-label');
  openLightbox(selectedArt.name, selectedArt.alt);
}

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'none') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});
