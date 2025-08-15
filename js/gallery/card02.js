'use strict';

export function initCard02(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const burgerBtn = card.querySelector('.center');
  const line = card.querySelectorAll('.line');
  let isOpen = false;
  burgerBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!isOpen) {
      line.forEach(function (el) {
        el.classList.remove('closed');
        el.classList.add('open');
      });
    } else {
      line.forEach(function (el) {
        return el.classList.replace('open', 'closed');
      });
    }
    isOpen = !isOpen;
  });
}