// CONSTANTS

export const isDesktop = () => window.innerWidth >= 680;
export const menu = document.querySelector('.menu');

// NAVIGATION TOGGLE

export function initNavToggle(isDesktop) {
  const menuBtn = document.getElementById('menu-btn');
  const menuLinks = Array.from(document.querySelectorAll('.menu__link'));
  const overlay = document.querySelector('.nav-overlay');
  const showMenu = (isDesktop) => {
    const isWide = isDesktop();
    menu.ariaExpanded = isWide ? 'undefined' : 'false';
  };

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
    menu.ariaExpanded = isOpen;
    document.body.classList.toggle('stop-scrolling', isOpen);

    if (isOpen) {
      menu.style.display = 'block';
      overlay.addEventListener('click', toggleMenu, { once: true });
    } else {
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
}

// ANIMATION OBSERVER

let animationObserver = null;

export function initAnimationObserver() {
  if (!animationObserver) {
    animationObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.target.id && entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          } else {
            entry.target.classList.toggle('animate', entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
  }
  return animationObserver;
}
