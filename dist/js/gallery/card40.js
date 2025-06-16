'use strict';

export function initCard40(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const gallery = Array.from(card.querySelectorAll('button'));
  let isOpen = false;
  for (let img of gallery) {
    img.addEventListener('click', e => {
      if (!isOpen) {
        img.classList.add('open');
        img.classList.add('ontop');
        gallery.forEach(el => {
          if (img !== el) {
            el.classList.add('off');
            el.tabIndex = '-1';
          }
        });
        isOpen = true;
      } else {
        img.classList.remove('open');
        gallery.forEach(el => {
          if (img !== el) {
            el.classList.remove('off');
            el.tabIndex = '0';
          }
        });
        setTimeout(() => {
          img.classList.remove('ontop');
        }, 500);
        isOpen = false;
      }
    });
  }
}