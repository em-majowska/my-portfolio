'use strict';

export function initCard26(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const card26 = card.querySelector('#card');
  const messages = card.querySelectorAll('.content');
  const nextBtn = card.querySelector('#next-btn');
  setDefault();
  nextBtn.addEventListener('click', next);
  function setDefault() {
    messages.forEach((message, i) => {
      if (i === 0) {
        message.style.opacity = '1';
      }
    });
  }
  function next() {
    card26.classList.add('disappear');
    setTimeout(() => {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].style.opacity === '1') {
          if (i === messages.length - 1) {
            messages[messages.length - 1].style.opacity = '0';
            messages[0].style.opacity = '1';
            break;
          } else {
            messages[i].style.opacity = '0';
            messages[i + 1].style.opacity = '1';
            break;
          }
        }
      }
      card26.classList.remove('disappear');
    }, 500);
  }
}