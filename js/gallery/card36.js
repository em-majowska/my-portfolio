'use strict';

export function initCard36(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const btns = card.querySelectorAll('.btn');
  const content = card.querySelectorAll('.content');

  for (let button of btns) {
    button.addEventListener('click', changeTab);
  }

  function changeTab(e) {
    if (e.target.id === 'search') {
      return;
    }
    const section = Array.from(content).find((section) =>
      section.classList.contains(e.target.id)
    );

    for (let button of btns) {
      button.classList.remove('active');
    }

    e.target.classList.add('active');

    content.forEach((section) => {
      section.classList.remove('active');
    });

    section.classList.add('active');
  }
}
