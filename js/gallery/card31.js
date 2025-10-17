'use strict';

export function initCard31(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const balls = card.querySelectorAll('.ball');
  let duration = 1.2;
  balls.forEach((ball) => {
    duration *= 1.01;
    ball.style.animationDuration = `${duration}s`;
  });
}
