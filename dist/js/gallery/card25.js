'use strict';

export function initCard25(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const card25 = card.querySelector('#card25');
  const front = card.querySelector('#front-face');
  const back = card.querySelector('#back-face');
  let isToggled = false;
  front.addEventListener('click', toggle);
  back.addEventListener('click', toggle);
  const backBtns = Array.from(back.querySelectorAll('button'));
  function toggle() {
    isToggled = !isToggled;
    card25.classList.toggle('animate');
    if (isToggled) {
      front.tabIndex = '-1';
      backBtns.forEach(btn => {
        btn.tabIndex = '0';
      });
    } else {
      front.tabIndex = '0';
      backBtns.forEach(btn => {
        btn.tabIndex = '-1';
      });
    }
  }
}