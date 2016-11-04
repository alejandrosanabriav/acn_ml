'use strict';
import $ from 'jquery';
import validate from './validate';

function each(fn) {
  return function(arr) {
    return Array.prototype.forEach.call(arr, fn);
  }
}

function map(fn) {
  return function(arr) {
    return Array.prototype.map.call(arr, fn);
  }
}



function showErrors(el) {
  let $input = el;
  let val = $input.value;
  let name = $input.getAttribute('name');
  let validations = $input.getAttribute('data-validate').split('|');
  let messages = $input.getAttribute('data-messages').split('|');
  let $err = document.querySelector(`input[name="${name}"]`).parentNode.querySelector('.input__errors');

  $err.innerHTML = '';

  validations.map((type, i) => {
    if(!validate(type, val)) {
      $input.setAttribute('is-valid', false);
      $err.append(messages[i]);
    } else {
      $input.setAttribute('is-valid', true);
    }
  });
}

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let $form = $(this);
    let inputs = $(this).find('input');
    let isValid = false;
    let results = [false];

    Promise.all(map(showErrors)(inputs)).then(circles => console.log(circles));
  });
}


