'use strict';
import $ from 'jquery';
import validate from './validate';

function each(fn) {
  return function(arr) {
    Array.prototype.forEach.call(arr, fn);
  }
}


function showErrors(el) {
  let $input = el;
  let val = $input.getAttribute('value');
  let name = $input.getAttribute('name');
  let validations = $input.getAttribute('data-validate').split('|');
  let messages = $input.getAttribute('data-messages').split('|');
  let $err = document.querySelectorAll(`input[name="${name}"]`).parentNode.querySelectorAll('.input__errors');
  console.log($err);
  $err.innerHTML = '';

  validations.map((type, i) => {
    if(!validate(type, val)) {
      $input.data('is-valid', false);
      $err.append(messages[i]);
    } else {
      $input.data('is-valid', true);
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

    Promise.all(each(showErrors)(inputs)).then(circles => console.log(circles));
  });
}


