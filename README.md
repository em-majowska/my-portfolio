# My Portfolio — Ewa Majowska

A portfolio site showcasing my knowledge and experience with modern Front-End technologies and reflecting my learning journey and growth as a Front-End developer. This is a project I crafted from the ground up - starting from the design on Figma, all the way to the deployment to GitHub Pages.

## Overview

![Colorful collage of rounded cards showing some of the sections of my website.](/screenshots/mockup.jpg)

This project is a static portfolio website containing a homepage and a gallery page. The site demonstrates advanced CSS techniques (responsive layouts, CSS-only components, card designs with informative tags), lightweight JavaScript, and small interactive elements like an animated cat and a spotlight cursor.

Key ideas:

- Semantic HTML structure with a focus on ARIA for accessibility
- Modular SCSS architecture
- Modular use of JavaScript
- Translations handled via JSON files
- Image optimization using multiple sizes and WebP sources with <picture> elements
- Gallery with infinite scroll and **dynamic JSON data loading**
- **IntersectionObserver-based** sections providing on-demand CSS animations and JS functionalities
- SVG sprites for clean HTML code

## Design & Inspiration

Inspired by neo-brutalistic style, I created a maquette in Figma for desktop and mobile versions of my website. I used a consistent design and reusable elements to plan out all decorative elements and the **Open Graph images**.

- [Realtime Colors](https://www.realtimecolors.com) to visualize my color palette and chosen fonts.
- [SVG Repo](https://www.svgrepo.com) for icons.
- The cat element was drawn in **Krita** and animated in **Adobe AE**. The animation is loaded through Lottie files.

## Features

- Responsive navigation
- Language selector with translations loaded and persisted in `localStorage`.
- Portfolio gallery with modular cards
- Animated SVG outlines and decorative elements
- Animated cat (Lottie) loaded on-demand
- Cache API usage to prefetch/cache images for improved offline behavior

## Technologies

- Figma
- HTML5 & semantic markup
- SCSS
- Vanilla JavaScript (ES6 Modules)
- Lottie (bodymovin) for the cat animation
- IntersectionObserver and Cache API
- Gulp for build tasks
- Rollup build for JavaScript files (Babel transpilation, minification)
- Git, GitHub Pages

## Translation system

- On page load, the script reads the language set in the browser and saves it to `localStorage.language` if it exists in the files (defaults to `en`), then fetches the corresponding JSON.
- Elements to be translated include a `data-i18l` attribute matching keys in the JSON.
- The language selector toggles the UI and stores the preference.

## Accessibility

- Skip-to-main-content link, logical heading structure, and ARIA attributes.
- Language selector and menu are keyboard operable.
- The translation script changes ARIA labels and the document's `lang` attribute to help screen readers.

## Notes & Interesting bits

- The `essentials.scss` file ensures loading styles with best performance.
- Modular gallery cards can be lazy-loaded or imported individually.
- The language nav setup swaps event listeners of its elements on viewport resize.
- Image `picture` markup includes multiple formats and sizes for best performance.
- `@mixin set-color-palette($item, $color-palette, $element: null)` uses the uploaded `$color-palette` and sets the given colors to the consecutive children of an element.

## Credits

- Big thanks to @branmcconnell for the [typewriter mixin](https://github.com/brandonmcconnell/typed.css)
