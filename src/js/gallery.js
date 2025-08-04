import 'https://cdn.jsdelivr.net/npm/core-js-bundle@3.45/minified.js';
import 'https://cdn.jsdelivr.net/npm/regenerator-runtime/runtime.min.js';

import {
  isDesktop,
  touch,
  showMenu,
  initNavToggle,
  initAnimationObserver,
  sttBtn,
  scrollToTop,
  initSpotlightCursor,
  spotlight,
  fetchGalleryData,
} from './utils.js';

let jsModuleObserver;
let lastCardObserver;

document.addEventListener('DOMContentLoaded', () => {
  const animationObserver = initAnimationObserver();
  initNavToggle(isDesktop);
  initCardModuleObserver();
  setupLoaderObserver();
  touch ? (spotlight.style.display = 'none') : initSpotlightCursor();

  // Animate intersecting cards
  observeGalleryCards();
});

window.addEventListener('resize', () => {
  showMenu(isDesktop);
});

window.onscroll = function () {
  scrollToTop();
};

/* OBSERVERS */

// Javascript modules loader

function initCardModuleObserver() {
  jsModuleObserver = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        const card = entry.target;

        if (
          !entry.isIntersecting ||
          !card.dataset.module ||
          card.dataset.loader === 'true'
        )
          continue;

        try {
          const module = await import(`./gallery/${card.dataset.module}.js`);
          const initFn = module[`init${capitalize(card.dataset.module)}`];

          if (typeof initFn === 'function') {
            initFn(card);
            card.dataset.loaded = 'true';
            jsModuleObserver.unobserve(card);
          }
        } catch (err) {
          console.error(`Module failed to load: ${card.dataset.module}:`, err);
        }
      }
    },
    {
      threshold: 0.3,
    }
  );
}

// Gallery card observer
// To show tags if a card is interactive

function observeGalleryCards(animationObserver) {
  document.querySelectorAll('.gallery__card:not(.observed)').forEach((card) => {
    if (touch && card.dataset.animated) animationObserver.observe(card);
    if (card.dataset.module) jsModuleObserver.observe(card);
    card.classList.add('observed');
  });
}

// Infinite scroll
/* Loads 6 cards each time
the user reaches the bottom of the page */

const gallery = document.getElementById('css-challenge-gallery');
const loader = document.getElementById('loader');
let dataCache = null;
let lastCardIndex = 0;
const cardsPerLoad = 6;
let hasMore = true;

function setupLoaderObserver() {
  lastCardObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting) return;

      entry.target.classList.toggle('show');
      setTimeout(loadCards, 800);
    },
    {
      threshold: 1,
    }
  );

  lastCardObserver.observe(loader);
}

async function loadCards() {
  if (!hasMore) return;

  const cards = await fetchGalleryData();
  const nextBatch = cards.slice(lastCardIndex, lastCardIndex + cardsPerLoad);

  nextBatch.forEach(createCard);
  observeGalleryCards(initAnimationObserver());

  lastCardIndex += cardsPerLoad;
  hasMore = lastCardIndex < cards.length;

  window.scrollBy(0, -300);

  if (!hasMore) loader.style.display = 'none';
  loader.classList.toggle('show');
}

// Gallery card template

function createCard(card) {
  let el = document.createElement('article');
  let day = String(card.day).padStart(2, '0');

  el.className = `card show gallery__card card-${day}`;
  el.tabIndex = 0;

  if (card.isAnimated) el.dataset.animated = true;
  if (card.isInteractive) el.classList.add('interact');
  if (card.JSModule) el.dataset.module = `card${day}`;

  el.innerHTML = `<div class="card__top">${card.content}</div>
        <div class="card__bar">
        <h2 class="card__bar__header">Day <span>#</span>${card.day}</h2>
        <p class="card__bar__title">${card.title}</p>
        </div>`;

  gallery.appendChild(el);
}

// Helper functions

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
