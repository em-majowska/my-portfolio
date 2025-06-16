'use strict';

export function initCard20(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const sendBtn = card.querySelector('.send-btn');
  const resetBtn = card.querySelector('.reset-btn');
  let isSent = false;
  let intervalId;
  sendBtn.addEventListener('click', sendMail);
  function sendMail() {
    if (!isSent) {
      card.classList.add('animate');
      intervalId = setInterval(() => {
        resetBtn.innerHTML = 'RESET';
      }, 3800);
    } else {
      clearInterval(intervalId);
      card.classList.remove('animate');
      resetBtn.innerHTML = 'SEND MAIL';
    }
    isSent = !isSent;
  }
}