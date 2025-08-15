'use strict';

export function initCard29(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');
  const searchBar = card.querySelector('#search-bar-input');
  const activeSearch = card.querySelectorAll('.active-search');
  const accordeon = card.querySelector('.accordeon');
  let text = [];
  if (!text) {
    accordeon.style.display = 'none';
  }
  searchBar.addEventListener('keypress', function (event) {
    let key = event.key;
    if (key === 'Enter') key = '';
    text.push(key);
    changeSuggestions();
  });
  searchBar.addEventListener('keydown', function (event) {
    let key = event.key;
    if (key === 'Backspace') {
      text = text.slice(0, -1);
    }
    changeSuggestions();
    if (text.length === 0) {
      accordeon.style.display = 'none';
    }
  });
  function changeSuggestions() {
    accordeon.style.display = 'block';
    activeSearch.forEach(function (span) {
      span.innerHTML = text.join('');
    });
  }
}