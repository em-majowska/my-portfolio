'use strict';

export function initCard10(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  setInterval(updateTime, 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function updateTime() {
    const now = new Date();
    const weekIndex = now.getDay();
    const dWeek = dayWeek[weekIndex];
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const month = months[monthIndex];
    const year = now.getFullYear();
    const today = `${dWeek} ${day} ${month} ${year}`;

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    const dateEl = card.querySelector('.top');
    dateEl.innerHTML = today;

    const timeEl = card.querySelector('.time');
    timeEl.innerHTML = time;
  }
}
