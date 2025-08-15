'use strict';

export function initCard09(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const bigDrop = card.querySelectorAll('.big');
  const midDrop = card.querySelectorAll('.mid');
  const smallDrop = card.querySelectorAll('.small');
  bigDrop.forEach(function (drop, i) {
    drop.style.left = (i + 1) * 30 + 'px';
  });
  midDrop.forEach(function (drop, i) {
    drop.style.left = (i + 1) * 40.5 + 'px';
  });
  smallDrop.forEach(function (drop, i) {
    drop.style.left = (i + 1) * 75.5 + 'px';
  });
}