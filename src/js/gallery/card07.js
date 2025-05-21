'use strict';

export function initCard07(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const menuBtn = card.querySelector('#menu-btn');
  const nav = card.querySelector('.frame__nav');
  const searchBar = card.querySelector('#search-bar');
  const searchBtn = card.querySelector('#search-btn');
  const menuItems = nav.querySelectorAll('.frame__nav__link');

  const events = card.querySelectorAll('.event');
  let isOpen = false;
  let isToggled = false;

  menuBtn.addEventListener('click', toggleMenu);
  searchBtn.addEventListener('click', toggleSearch);

  function toggleMenu() {
    isOpen = !isOpen;
    nav.ariaExpanded = isOpen;

    if (isOpen) {
      for (let link of menuItems) {
        link.tabIndex = '0';
      }
    } else {
      for (let link of menuItems) {
        link.tabIndex = '-1';
      }
    }
  }

  function toggleSearch() {
    searchBar.classList.toggle('open');
    if (!isToggled) {
      searchBar.tabIndex = '0';
    } else {
      searchBar.tabIndex = '-1';
    }
    isToggled = !isToggled;
  }

  events.forEach((event, i) => {
    event.style.animationDelay = i * 0.4 + 's';
  });
}
