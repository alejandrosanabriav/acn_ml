'use strict';

export function each(fn) {
  return function(arr) {
    return Array.prototype.forEach.call(arr, fn);
  }
}

export function map(fn) {
  return function(arr) {
    return Array.prototype.map.call(arr, fn);
  }
}
