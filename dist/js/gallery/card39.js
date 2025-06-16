'use strict';

export function initCard39(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const menuBtn = card.querySelector('.menu-button');
  const nav = card.querySelector('.nav39');
  const menuItems = nav.querySelectorAll('.menu__item');
  let isOpen = false;
  menuBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    toggleTabIndex();
    if (isOpen) {
      menuBtn.classList.remove('close');
      menuBtn.classList.add('open');
    }
  });
  for (let item of menuItems) {
    item.addEventListener('click', e => {
      closeMenu(e);
    });
    item.addEventListener('keypress', e => {
      if (e.key === 'Enter') item.click();
    });
  }
  function toggleTabIndex() {
    for (let item of menuItems) {
      if (!isOpen) {
        item.tabIndex = '-1';
      } else {
        item.tabIndex = '0';
      }
    }
  }
  function closeMenu(e) {
    isOpen = !isOpen;
    toggleTabIndex();
    if (!isOpen) {
      menuBtn.classList.remove('open');
      menuBtn.classList.add('close');
      e.stopPropagation();
    }
  }
}