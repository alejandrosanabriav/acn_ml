'use strict';

export const each = fn => arr => Array.prototype.forEach.call(arr, fn);

export const map = fn => arr => Array.prototype.map.call(arr, fn);

export const reduce = fn => arr => Array.prototype.reduce.call(arr, fn);

export const on = (event, fn) => el => el.addEventListener(event, fn);

export const allOn = (event, fn) => each(on(event, fn));

export const flatten = arr => reduce((a, b) => a.concat(b))(arr);
