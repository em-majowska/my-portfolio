// NAVIGATION TOGGLE

const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
const menu = document.querySelector('.menu');
const menuItems = Array.from(document.querySelectorAll('.menu__link'));
let isOpen = false;

menuBtn.addEventListener('click', toggleMenu);

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (menu.ariaExpanded !== 'undefined') {
      toggleMenu();
    }
  });
});

function toggleMenu() {
  isOpen = !isOpen;
  menu.ariaExpanded = isOpen;

  if (isOpen) {
    menu.style.display = 'block';
    document.querySelector('body').classList.toggle('stop-scrolling');

    document
      .querySelector('.nav-overlay')
      .addEventListener('click', toggleMenu);
  } else {
    document.querySelector('body').classList.toggle('stop-scrolling');
    menu.addEventListener(
      'animationend',
      () => {
        if (!isOpen) menu.style.display = 'none';
      },
      { once: true }
    );
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// GALLERY CARD OBVSERVERS

// JAVASCRIPT MODUDLES LOADER
// let jsModuleObserver;

// function setupJSModuleObserver() {
//   jsModuleObserver = new IntersectionObserver(
//     async (entries) => {
//       for (const entry of entries) {
//         if (!entry.isIntersecting) continue;

//         const card = entry.target;
//         const moduleName = card.dataset.module;
//         if (!moduleName || card.dataset.loaded === 'true') continue;

//         try {
//           const module = await import(`./gallery/${moduleName}.js`);
//           const initFn = module[`init${capitalize(moduleName)}`];

//           if (typeof initFn === 'function') {
//             initFn(card);
//             card.dataset.loaded = 'true';
//             jsModuleObserver.unobserve(card);
//           }
//         } catch (err) {
//           console.error(`Failed to load module for ${moduleName}:`, err);
//         }
//       }
//     },
//     {
//       threshold: 0.3,
//     }
//   );
// }

// // ANIMATION LOADER
// let animationObserver;

// function setupAnimationObserver() {
//   animationObserver = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         entry.target.classList.toggle('animate', entry.isIntersecting);
//       });
//     },
//     {
//       threshold: 0.6,
//     }
//   );
// }

// function observeGalleryCards() {
//   const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

//   document.querySelectorAll('.gallery__card:not(.observed').forEach((card) => {
//     if (isTouchDevice && card.dataset.animated) {
//       animationObserver.observe(card);
//     }

//     if (card.dataset.module) {
//       jsModuleObserver.observe(card);
//     }

//     card.classList.add('observed');
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   setupJSModuleObserver();
//   setupAnimationObserver();
//   observeGalleryCards();
//   setupLoadingCardsObserver();
// });

// // SMOOTH SCROLLING

// // document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
// //   anchor.addEventListener('click', function (e) {
// //     e.preventDefault();

// //     document.querySelector(this.getAttribute('href')).scrollIntoView({
// //       behavior: 'smooth',
// //     });
// //   });
// // });

// // LOAD MORE CARDS

// const gallery = document.getElementById('100-days-gallery');
// const loader = document.getElementById('loader');

// let lastCardIndex = 0;
// const cardsPerLoad = 6;
// let hasMore = true;
// let lastCardObserver;

// let dataCache = null;

// async function fetchData() {
//   if (!dataCache) {
//     const response = await fetch('./assets/gallery-data.json');

//     if (!response.ok)
//       throw new Error(`HTTP error, status = ${response.status}`);

//     const data = await response.json();
//     dataCache = data.cards;
//   }
//   return dataCache;
// }

// async function loadCards() {
//   if (!hasMore) {
//     loader.classList.remove('show');
//     return;
//   }

//   const cards = await fetchData();
//   const nextCards = cards.slice(lastCardIndex, lastCardIndex + cardsPerLoad);

//   nextCards.forEach((card) => createCard(card));

//   observeGalleryCards();

//   lastCardIndex += cardsPerLoad;
//   hasMore = lastCardIndex < cards.length;

//   loader.classList.remove('show');
//   window.scrollBy(0, -300);
//   if (!hasMore) {
//     loader.style.display = 'none';
//     lastCardObserver.disconnect();
//   }
// }

// function createCard(card) {
//   let el = document.createElement('article');
//   let day = card.day.length === 1 ? '0' + card.day : card.day;
//   el.classList.add('card', 'show', 'gallery__card', `card-${day}`);
//   el.setAttribute('tabindex', '0');
//   if (card.isAnimated) el.setAttribute('data-animated', 'true');

//   if (card.isInteractive) el.classList.add('interact');

//   if (card.JSModule) el.setAttribute('data-module', `card${day}`);

//   el.innerHTML = `<div class="card__top">${card.content}</div>
//         <div class="card__bar">
//         <h2 class="card__bar__header">Day <span>#</span>${card.day}</h2>
//         <p class="card__bar__title">${card.title}</p>
//         </div>`;

//   gallery.appendChild(el);
// }

// function setupLoadingCardsObserver() {
//   lastCardObserver = new IntersectionObserver(
//     (entries) => {
//       const entry = entries[0];
//       if (entry.isIntersecting) {
//         entry.target.classList.add('show');

//         setTimeout(() => {
//           loadCards();
//         }, 1000);
//       }
//     },
//     {
//       rootMargin: '100px',
//       threshold: 1,
//     }
//   );

//   lastCardObserver.observe(loader);
// }

// BLOB OUTLINE

const outline = document.getElementById('outline');
const lines = document.querySelector('.lines');

const japaneseWord = document.getElementById('japanese-word');
const aboutWidgetFrame = document.querySelector('.widget__frame');

japaneseWord.classList.add('animate');

window.addEventListener('resize', resizeElements);
resizeElements();

function resizeElements() {
  if (window.innerWidth >= 680) {
    menu.ariaExpanded = 'undefined';
    lines.style.display = 'none';
    // aboutWidgetFrame.style.display = 'block';

    outline.setAttribute('viewBox', '0 0 616 669');
    for (let i = 0; i <= outline.children.length; i++) {
      let line = outline.children[i];

      switch (i) {
        case 0:
          line.setAttribute(
            'd',
            'M50.7389 515.628C36.8742 486.163 51.0995 459.13 69.1526 431.979C78.2983 418.225 88.4297 404.44 96.6829 390.086C104.925 375.751 111.215 360.972 112.682 345.345L112.792 344.054C113.783 330.723 110.769 317.438 106.013 304.228C101.097 290.572 94.3651 277.11 88.3275 263.768C76.3161 237.223 67.0244 211.125 81.9811 186.579L83.0379 184.854C105.348 148.604 135.404 111.144 170.795 84.6556C206.472 57.954 247.653 42.3427 291.803 50.4956L292.847 50.6926C338.656 59.5319 367.703 91.3123 390.342 130.729C401.661 150.435 411.402 172.091 420.841 193.794C429.993 214.837 438.857 235.913 448.624 255.387L449.572 257.266C460.919 279.633 474.604 302.177 488.118 324.849C501.623 347.505 514.953 370.284 525.537 393.056C546.539 438.24 556.828 483.602 536.111 528.185L535.616 529.238C513.58 575.553 471.75 606.884 422.155 626.273C373.334 645.359 316.913 652.907 264.21 651.777L261.704 651.717C173.679 649.366 88.4739 593.444 51.0721 516.324L50.7389 515.628Z'
          );
          break;
        case 1:
          line.setAttribute(
            'd',
            'M49.7578 526.311C33.9463 497.413 47.3704 469.76 64.7369 441.848C73.5369 427.705 83.355 413.491 91.2006 398.787C99.0357 384.103 104.826 369.06 105.58 353.378L105.63 352.083C106.004 338.716 102.235 325.563 96.6628 312.553C90.9027 299.105 83.2726 285.928 76.3656 272.838C62.6284 246.804 51.7165 221.08 66.0152 195.884L67.0252 194.114C88.3597 156.915 117.658 118.182 153.016 90.1956C188.659 61.9843 230.533 44.6421 276.632 50.9245L277.722 51.0773C325.573 57.9754 357.206 88.5139 382.588 126.982C395.277 146.212 406.425 167.458 417.264 188.764C427.773 209.422 437.987 230.124 449.055 249.186L450.129 251.025C462.976 272.914 478.254 294.881 493.361 316.984C508.457 339.071 523.378 361.287 535.456 383.614C559.42 427.913 572.303 472.857 553.022 518.335L552.56 519.41C532.001 566.665 490.209 599.762 439.801 621.245C390.177 642.395 332.117 652.33 277.481 653.429L274.882 653.475C183.628 654.846 92.6513 602.543 50.1366 526.995L49.7578 526.311Z'
          );
          break;
        case 2:
          line.setAttribute(
            'd',
            'M45.8895 536.269C37.1042 522.254 35.8163 508.231 38.8477 494.161C41.9164 479.918 49.4133 465.611 57.9798 451.171C66.5762 436.68 76.233 422.079 83.8086 407.065C91.3742 392.071 96.7857 376.805 96.9142 361.1L96.9107 359.805C96.7394 346.431 92.2535 333.43 85.8869 320.638C79.306 307.415 70.7832 294.536 63.0186 281.714C47.5801 256.222 35.0867 230.901 48.9712 205.121L49.9516 203.311C70.6702 165.269 99.6402 125.383 135.388 96.0097C171.425 66.3992 214.41 47.4271 262.789 51.8995L263.932 52.0097C314.164 57.0287 348.477 86.3113 376.609 123.795C390.669 142.531 403.207 163.343 415.424 184.227C427.269 204.475 438.805 224.78 451.167 243.411L452.365 245.209C466.703 266.596 483.583 287.967 500.291 309.481C516.986 330.978 533.506 352.613 547.059 374.47C573.949 417.835 589.304 462.295 571.072 508.552L570.635 509.646C551.149 557.718 508.894 592.452 457.165 615.909C406.236 639.003 346.025 651.215 289.019 654.457L286.307 654.604C191.095 659.552 93.8939 610.829 46.3128 536.936L45.8895 536.269Z'
          );
          break;
        case 3:
          line.setAttribute(
            'd',
            'M49.4237 546.47C39.9163 532.799 38.0265 518.82 40.524 504.624C43.052 490.255 50.0752 475.647 58.1801 460.865C66.3135 446.031 75.5192 431.046 82.5937 415.73C89.6592 400.434 94.5245 384.953 94.0045 369.243L93.9473 367.948C93.2193 354.582 88.1246 341.759 81.1266 329.217C73.893 316.252 64.7007 303.709 56.2807 291.193C39.5411 266.309 25.7927 241.469 38.8346 215.128L39.7555 213.28C59.2292 174.409 87.0091 133.37 122.109 102.578C157.493 71.5368 200.372 50.8644 249.697 53.4217L250.864 53.4866C302.093 56.5172 338.163 84.4403 368.298 120.819C383.359 139.001 396.96 159.321 410.237 179.725C423.11 199.508 435.672 219.36 449.002 237.505L450.295 239.255C465.748 260.079 483.783 280.785 501.649 301.641C519.501 322.482 537.18 343.467 551.855 364.792C580.972 407.099 598.418 450.966 581.809 497.96L581.41 499.07C563.603 547.924 522.115 584.335 470.536 609.841C419.754 634.954 359.091 649.55 301.311 655.049L298.562 655.304C202.05 664.021 101.285 619.144 49.8822 547.121L49.4237 546.47Z'
          );
          break;
      }
    }
  } else {
    menu.ariaExpanded = 'false';
    lines.style.display = 'block';

    outline.setAttribute('viewBox', '0 0 368 390');
    for (let i = 0; i <= outline.children.length; i++) {
      let line = outline.children[i];

      switch (i) {
        case 0:
          line.setAttribute(
            'd',
            'M36.7469 296.791C41.7457 207.302 255.386 191.208 205.716 95.071C156.047 -1.06573 309.004 24.7279 327.646 67.5485C346.289 110.369 307.825 106.902 317.879 150.422C329.126 199.108 318.523 286.903 259.423 311.141C200.323 335.379 31.7481 386.279 36.7469 296.791Z'
          );
          break;
        case 1:
          line.setAttribute(
            'd',
            'M31.6008 288.495C41.1247 199.388 255.296 194.537 210.561 95.9192C165.826 -2.69851 317.273 31.0952 333.722 74.8381C350.171 118.581 311.934 113.098 319.771 157.089C328.538 206.3 313.503 293.422 253.254 314.523C193.005 335.625 22.0768 377.602 31.6008 288.495Z'
          );
          break;
        case 2:
          line.setAttribute(
            'd',
            'M28.6697 283.304C40.9429 194.547 255.158 196.564 213.493 96.5613C171.828 -3.44168 322.155 35.1903 337.244 79.4388C352.333 123.687 314.285 116.981 320.758 161.201C328 210.67 310.28 297.266 249.409 316.425C188.537 335.585 16.3966 372.062 28.6697 283.304Z'
          );
          break;
        case 3:
          line.setAttribute(
            'd',
            'M34.05 292.561C41.3765 203.239 255.361 192.919 208.211 95.4746C161.062 -1.96935 313.293 27.9452 330.814 71.2541C348.336 114.563 309.976 110.058 318.893 153.835C328.869 202.807 315.985 290.285 256.274 312.919C196.564 335.553 26.7234 381.883 34.05 292.561Z'
          );
          break;
      }
    }
  }
}
