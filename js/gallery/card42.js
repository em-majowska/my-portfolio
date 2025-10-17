'use strict';

export function initCard42(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const stars42 = Array.from(card.querySelectorAll('.star42'));
  const shootingStars = Array.from(card.querySelectorAll('.shooting-star'));

  stars42.forEach((star) => {
    star.style.top = randomNum();
    star.style.left = randomNum();
    star.style.animationDelay = randomDelay();
  });

  shootingStars.forEach((star) => {
    star.style.top = Math.floor(Math.random() * 200) + 'px';
    star.style.animationDelay = Math.floor(Math.random() * 25) + 's';
  });

  function randomDelay() {
    let num = (Math.random() * 6).toFixed(1) + 's';
    return num;
  }
  function randomNum() {
    let number = Math.floor(Math.random() * 250) + 'px';
    return number;
  }
}
