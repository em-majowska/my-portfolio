'use strict';

export function initCard27(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const weekDay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const months26 = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const weekDayName = weekDay[today.getDay()];
  const monthName = months26[today.getMonth()];

  card.querySelector('#day-27').innerHTML = weekDayName;
  card.querySelector('.date-year').innerHTML = `${monthName} ${day}, ${year}`;
}
