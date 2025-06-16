'use strict';

export function initCard32(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const btns = card.querySelectorAll('#btn');
  const counter = card.querySelector('#counter');
  let sum = 0;
  btns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const prevOldNum = counter.querySelector('.old-number');
      if (prevOldNum) prevOldNum.remove();
      const currentNum = counter.querySelector('.number');
      const isPlus = e.target.classList.contains('plus');
      sum += isPlus ? 1 : -1;
      if (currentNum) {
        currentNum.classList.remove('appearGrow', 'appearShrink', 'disappearGrow', 'disappearShrink');
        currentNum.classList.add(isPlus ? 'disappearGrow' : 'disappearShrink');
        currentNum.classList.add('old-number');
        setTimeout(() => {
          const oldNum = counter.querySelector('.old-number');
          if (oldNum) oldNum.remove();
        }, 400);
      }
      const newNum = document.createElement('span');
      newNum.className = `number ${isPlus ? 'appearGrow' : 'appearShrink'}`;
      newNum.textContent = sum;
      counter.insertAdjacentElement('afterbegin', newNum);
    });
  });
}