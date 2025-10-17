'use strict';

export function initCard24(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const btn = card.querySelector('#btn');
  const circle = card.querySelector('.circle');
  let isToggled = false;

  btn.addEventListener('click', toggleBtn);

  function toggleBtn() {
    isToggled = !isToggled;

    if (isToggled) {
      btn.classList.add('animate');
      circle.classList.add('animate');
      btn.blur();
    } else {
      btn.classList.remove('animate');
      circle.classList.remove('animate');
    }
  }
}
