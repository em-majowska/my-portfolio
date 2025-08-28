// CONSTANTS

export const isDesktop = () => window.innerWidth >= 680;
export const menu = document.querySelector('.menu');
export const showMenu = (isDesktop) => {
  const isWide = isDesktop();
  menu.ariaExpanded = isWide ? 'undefined' : 'false';
  menu.style.display = isWide ? 'flex' : 'none';
};
export const sttBtn = document.getElementById('stt-btn');
export const touch = window.matchMedia('(pointer: coarse)').matches;
export const spotlight = document.querySelector('.spotlight--outer');
export let dataCache = null;
// NAVIGATION TOGGLE

export function initNavToggle(isDesktop) {
  const menuBtn = document.getElementById('menu-btn');
  const menuLinks = Array.from(document.querySelectorAll('.menu__link'));
  const overlay = document.querySelector('.nav-overlay');
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    menu.ariaExpanded = isOpen;

    if (isOpen) {
      document.body.addEventListener('wheel', preventScroll, {
        passive: false,
      });

      menu.style.display = 'block';
      overlay.addEventListener('click', toggleMenu, { once: true });
    } else {
      document.body.removeEventListener('wheel', preventScroll, {
        passive: false,
      });

      menu.addEventListener(
        'animationend',
        () => {
          if (!isOpen) menu.style.display = 'none';
        },
        { once: true }
      );
    }
  };

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

// ANIMATION SERVER

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
