'use strict';

export function initCard41(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const btn = card.querySelector('.btn');
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('reset-btn');
  restartBtn.innerHTML = 'Restart';
  btn.addEventListener('click', activateCard);
  restartBtn.addEventListener('click', restartCard);
  function activateCard() {
    btn.parentNode.classList.add('close');
    card.children[0].append(restartBtn);
    setTimeout(() => {
      restartBtn.classList.add('active');
    }, 2000);
  }
  function restartCard() {
    restartBtn.classList.remove('active');
    setTimeout(() => {
      btn.parentNode.classList.remove('close');
      card.focus();
    }, 1000);
  }
}