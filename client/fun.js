'use strict';

export const each = fn => arr => Array.prototype.forEach.call(arr, fn);

export const map = fn => arr => Array.prototype.map.call(arr, fn);

export const on = (event, fn) => el => el.addEventListener(event, fn);

export const allOn = (event, fn) => each(on(event, fn));
