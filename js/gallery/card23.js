'use strict';

export function initCard23(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const resetBtn = card.querySelector('.btn--reset');
  const overlay = card.querySelector('.overlay');
  const longestAnimationEl = card.querySelector('.top.small');

  resetBtn.addEventListener('click', resetAnimation);

  function resetAnimation(e) {
    card.focus();
    resetBtn.tabIndex = '-1';
    card.classList.add('reset');
    card.offsetHeight;
    card.classList.remove('reset');

    resetBtn.classList.remove('active');
    overlay.classList.remove('active');
  }

  longestAnimationEl.addEventListener('animationend', () => {
    resetBtn.tabIndex = '0';
    resetBtn.classList.add('active');
    overlay.classList.add('active');
  });
}
