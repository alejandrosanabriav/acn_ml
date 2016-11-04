'use strict';

export const each = fn => arr => Array.prototype.forEach.call(arr, fn);

export const map = fn => arr => Array.prototype.map.call(arr, fn);

export const on = (event, fn) => el => el.addEventListener(event, fn);

export const allOn = function(event, fn) {
  return each(on(event, fn));
}
