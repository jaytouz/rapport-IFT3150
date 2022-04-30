/**
 * app.js
 * ======
 * Main file of the application. This file is used to initialize the scroller and imports the visualizations used.
 */

'use strict';

import '../assets/styles/style.scss';

const headerHeight = 40;
import stickyBits from 'stickybits'

let elements = [];
['.viz', '.full-page-section > img', '.full-page-section > video'].forEach(selector => {
  elements = elements.concat(Array.from(document.querySelectorAll(selector)));
});
stickyBits(elements, { stickyBitStickyOffset: headerHeight });

import { initialize as v1 } from './viz';
import { scroller } from './scroller';

Promise.all([v1()]).then(([callbacksV1]) => {
  scroller(callbacksV1)
    .offsetTop(headerHeight)
    .offsetBottom(0)
    .initialize();
});
