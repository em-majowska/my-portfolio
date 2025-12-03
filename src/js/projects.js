import {
  isDesktop,
  touch,
  showMenu,
  setupLangNavEvents,
  initNavToggle,
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
});

/* Update Hero on window resize */

window.addEventListener('resize', () => {
  showMenu(isDesktop);
  setupLangNavEvents(langData);
});

window.onscroll = function () {
  scrollToTop();
};
