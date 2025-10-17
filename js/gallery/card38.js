'use strict';

export function initCard38(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const logo = card.querySelector('#logo');
  const logo2 = card.querySelector('#logo2');
  let isSwitched = false;

  card.addEventListener('click', () => {
    isSwitched = !isSwitched;

    if (isSwitched) {
      logo.tabIndex = '-1';
      logo2.tabIndex = '0';
      logo2.focus();
    } else {
      logo.tabIndex = '0';
      logo2.tabIndex = '-1';
      logo.focus();
    }

    logo.classList.toggle('animate');
    logo2.classList.toggle('animate');
  });

  logo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') card.click();
  });
  logo2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') card.click();
  });
}
