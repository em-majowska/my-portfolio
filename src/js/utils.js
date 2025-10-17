// Constants

export const isDesktop = () => window.innerWidth >= 770;
export const menu = document.querySelector('.menu');
export const menuBtn = document.getElementById('menu-btn');
export const showMenu = (isDesktop) => {
  const isWide = isDesktop();
  menu.ariaExpanded = isWide ? 'undefined' : 'false';
  menu.style.display = isWide ? 'flex' : 'none';
};
export const sttBtn = document.getElementById('stt-btn');
export const touch = window.matchMedia('(pointer: coarse)').matches;
export const spotlight = document.querySelector('.spotlight--outer');
export let dataCache = null;
const langNav = document.getElementById('langNav');
const langNavBtn = document.getElementById('langNavBtn');

/* Toggle Navigation */

export function initNavToggle(isDesktop, langData) {
  const menuLinks = Array.from(document.querySelectorAll('.menu__link'));
  const overlay = document.querySelector('.nav-overlay');
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    menu.ariaExpanded = isOpen;

    if (isOpen) {
      disableScroll();
      menuBtn.ariaLabel = langData.menu_btn.close['aria-label'];
      menu.style.display = 'block';
      overlay.addEventListener('click', toggleMenu, { once: true });
    } else {
      enableScroll();
      menuBtn.ariaLabel = langData.menu_btn.open['aria-label'];

      menu.addEventListener(
        'animationend',
        () => {
          if (!isOpen) menu.style.display = 'none';
        },
        { once: true }
      );
    }
  };

  function preventBehavior(e) {
    e.preventDefault();
  }

  function disableScroll() {
    nav.addEventListener('touchmove', preventBehavior, false);

    document.body.addEventListener('wheel', preventScroll, {
      passive: false,
    });
  }

  function enableScroll() {
    nav.removeEventListener('touchmove', preventBehavior, false);

    document.body.removeEventListener('wheel', preventScroll, {
      passive: false,
    });
  }
  showMenu(isDesktop);
  menuBtn.addEventListener('click', toggleMenu);
  menuLinks.forEach((link) =>
    link.addEventListener('click', () => {
      if (menu.ariaExpanded !== 'undefined') toggleMenu();
    })
  );

  function preventScroll(e) {
    e.preventDefault();
  }
}

/* Animation Ovserver */

let animationObserver = null;

export function initAnimationObserver() {
  if (!animationObserver) {
    animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !entry.target.id) return;

          entry.target.classList.add('animate');

          // Load bodymovin script dynamically
          if (
            entry.target.classList.contains('contact') &&
            entry.isIntersecting
          ) {
            loadCatAnimation();
          }
          observer.unobserve(entry.target);

          // entry.target.classList.toggle('animate', entry.isIntersecting);
        });
      },
      {
        threshold: 0.4,
      }
    );
  }
  return animationObserver;
}
/* Cat Animation */
export function loadCatAnimation() {
  const script = document.createElement('script');
  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js';
  script.onload = () => {
    bodymovin.loadAnimation({
      container: document.getElementById('cat-animation'),
      path: './assets/cat-animation.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'cat animation',
    });
  };
  document.body.appendChild(script);
}

/* Scroll to top */

export function scrollToTop() {
  if (
    document.body.scrollTop > 700 ||
    document.documentElement.scrollTop > 700
  ) {
    sttBtn.classList.add('active');
  } else {
    sttBtn.classList.remove('active');
  }
}

/* Spotlight cursor initialization */

export function initSpotlightCursor() {
  document.addEventListener('mousemove', spotlightCursor);

  function spotlightCursor(e) {
    const spotlight = document.querySelector('.spotlight--outer');

    spotlight.animate(
      {
        top: e.pageY + 'px',
        left: e.pageX + 'px',
      },
      {
        duration: 500,
        fill: 'forwards',
      }
    );
  }
}

export async function fetchGalleryData() {
  if (!dataCache) {
    const response = await fetch('./assets/gallery-data.json');

    if (!response.ok)
      throw new Error(`HTTP error, status = ${response.status}`);

    const { cards } = await response.json();
    dataCache = cards;
  }
  return dataCache;
}

/* Toggle Language Selection Menu */
export function setupLangNavEvents(langData) {
  let isOpen = false;

  // make langNav element tabbable if on mobile
  // prevent double langNav opening button
  if (isDesktop()) {
    langNavBtn.addEventListener('click', (e) => toggleLangNav(e, langData));
    langNav.removeEventListener('click', toggleLangNav);
    langNav.removeEventListener('keypress', (e) => {
      if (e.key === 'Enter') toggleLangNav(e);
    });

    langNav.setAttribute('tabindex', '-1');
    langNav.removeAttribute('role');
    langNavBtn.setAttribute('tabindex', '0');
    langNavBtn.setAttribute('aria-hidden', 'true');
  } else {
    langNavBtn.removeEventListener('click', toggleLangNav);
    langNav.addEventListener('click', (e) => toggleLangNav(e, langData));
    langNav.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') toggleLangNav(e);
    });
    langNav.setAttribute('tabindex', '0');
    langNav.setAttribute('role', 'button');
    langNavBtn.setAttribute('tabindex', '-1');
    langNavBtn.setAttribute('aria-hidden', 'false');
  }

  function toggleLangNav(e) {
    const langMenu = document.getElementById('langMenu');

    if (e.target.tagName === 'LI') return;

    isOpen = !isOpen;
    langNav.ariaExpanded = isOpen;

    if (isOpen) {
      langMenu.removeAttribute('inert');
      langNavBtn.ariaLabel = langData.lang_nav_btn.close['aria-label'];
    } else {
      langMenu.setAttribute('inert', '');
      langNavBtn.ariaLabel = langData.lang_nav_btn.open['aria-label'];
    }
  }
}

export async function translationSetup() {
  const userPreferredLang = localStorage.getItem('language') || 'en';
  let langData = await fetchLangData(userPreferredLang);

  // Fetch language JSON data
  async function fetchLangData(langCode) {
    try {
      const response = await fetch(`./languages/${langCode}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Error loading language file:', err);
      return {};
    }
  }

  // Initialize language selector
  function initLanguageSelector() {
    const langLinks = langNav.firstElementChild.querySelectorAll('li a');

    langLinks.forEach((link) => {
      link.addEventListener('click', changeLanguage);
    });

    // Handle language change
    async function changeLanguage(e) {
      const langCode = e.target.lang;

      setLangPreference(langCode);
      updateContent(langData);
    }

    function setLangPreference(lang) {
      localStorage.setItem('language', lang);
      location.reload();
    }

    setupLangNavEvents(langData);
  }

  // Update page content based on selected language
  function updateContent(langData) {
    const collection = document.querySelectorAll('[data-i18l]');
    const catalogue = new Map();

    // Create catalogue with arrays of elements for each key
    collection.forEach((el) => {
      const key = el.getAttribute('data-i18l');

      !catalogue.has(key)
        ? catalogue.set(key, [el])
        : catalogue.get(key).push(el);
    });

    // Update elements based on their type and langData
    for (const key in langData) {
      const domElements = catalogue.get(key);
      const langDataValue = langData[key];

      if (!domElements) continue;

      // Special handling for menu button and langNav button
      if (typeof langDataValue === 'object' && 'open' in langDataValue) {
        domElements[0].ariaLabel = langDataValue.open['aria-label'];
        continue;
      }

      // Handle string type translation
      if (typeof langDataValue === 'string') {
        domElements[0].innerHTML = langDataValue;
      }
      // Handle object type translation
      else if (
        typeof langDataValue === 'object' &&
        langDataValue !== null &&
        !Array.isArray(langDataValue)
      ) {
        domElements.forEach((el) => handleObjectTranslation(el, langDataValue));
      }
      // Handle array type translation
      else if (Array.isArray(langDataValue)) {
        handleArrayTranslation(domElements, langDataValue);
      }
    }

    function handleArrayTranslation(elements, values) {
      for (let i = 0; i < values.length; i++) {
        const langDataValue = values[i];
        const domElement = elements[i];
        if (typeof langDataValue === 'object') {
          handleObjectTranslation(domElement, langDataValue);
        } else if (typeof langDataValue === 'string') {
          domElement.innerHTML = langDataValue;
        }
      }
    }

    function handleObjectTranslation(element, object) {
      for (const attr in object) {
        const value = object[attr];

        if (attr === 'innerHTML') {
          element.innerHTML = value;
        } else {
          element.setAttribute(attr, value);
        }
      }
    }
  }

  updateContent(langData);
  initLanguageSelector();
  return langData;
}
