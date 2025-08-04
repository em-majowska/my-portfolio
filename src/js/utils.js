// CONSTANTS

export const isDesktop = () => window.innerWidth >= 680;
export const menu = document.querySelector('.menu');
export const showMenu = (isDesktop) => {
  const isWide = isDesktop();
  menu.ariaExpanded = isWide ? 'undefined' : 'false';
  menu.style.display = isWide ? 'flex' : 'none';
};
export const sttBtn = document.getElementById('stt-btn');

// NAVIGATION TOGGLE

export function initNavToggle(isDesktop) {
  const menuBtn = document.getElementById('menu-btn');
  const menuLinks = Array.from(document.querySelectorAll('.menu__link'));
  const overlay = document.querySelector('.nav-overlay');
  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    menu.ariaExpanded = isOpen;
    // document.body.classList.toggle('stop-scrolling', isOpen);

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

// ANIMATION OBSERVER

let animationObserver = null;

export function initAnimationObserver() {
  if (!animationObserver) {
    animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (
            (entry.target.id && entry.isIntersecting) ||
            (entry.target.classList.contains('about-me') &&
              entry.isIntersecting)
          ) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          } else {
            entry.target.classList.toggle('animate', entry.isIntersecting);
          }
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
