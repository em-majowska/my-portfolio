'use strict';

export function initCard02(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const burgerBtn = card.querySelector('.frame');
  const line = card.querySelectorAll('.line');

  let isOpen = false;

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!isOpen) {
      line.forEach((el) => {
        el.classList.remove('closed');
        el.classList.add('open');
      });
    } else {
      line.forEach((el) => el.classList.replace('open', 'closed'));
    }

    isOpen = !isOpen;
  });
}
