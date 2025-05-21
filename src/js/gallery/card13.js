'use strict';

export function initCard13(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const closeBtn = card.querySelector('.cta.close');
  const openBtns = Array.from(card.querySelectorAll('.gallery__overlay'));
  const profile = card.querySelector('#profile');
  const ctaBtns = Array.from(
    card.querySelector('.buttons').querySelectorAll('button')
  );
  let isOpen = false;

  openBtns.forEach((btn) => btn.addEventListener('click', toggle));
  closeBtn.addEventListener('click', toggle);

  function toggle() {
    profile.classList.toggle('open');

    if (!isOpen) {
      openBtns.forEach((btn) => (btn.tabIndex = '-1'));
      ctaBtns.forEach((btn) => (btn.tabIndex = '0'));
      closeBtn.tabIndex = '0';
    } else {
      openBtns.forEach((btn) => (btn.tabIndex = '0'));
      ctaBtns.forEach((btn) => (btn.tabIndex = '-1'));
      closeBtn.tabIndex = '-1';
    }
    isOpen = !isOpen;
  }
}
