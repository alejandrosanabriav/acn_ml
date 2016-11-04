'use strict';
import validate from './validate';
import {map, each, on, allOn, flatten } from './fun';

function showErrors(el) {
  let $input = el;
  let val = $input.value;
  let name = $input.getAttribute('name');
  let validations = $input.getAttribute('data-validate').split('|');
  let messages = $input.getAttribute('data-messages').split('|');
  let $err = $input.parentNode.querySelector('.input__errors');

  $err.innerHTML = '';

  return validations.map((type, i) => {
    if(!validate(type, val)) {
      $err.append(messages[i]);
      return false;
    } else {
      return true;
    }
  });
}

function requestToMailchimp(data) {
  console.log(data);
}

export default function() {

  allOn('submit', function(e) {
    e.preventDefault();
    let $form = this;
    let inputs = $form.querySelectorAll('input');
    let isValid = false;
    let results = [false];

    Promise
    .all(map(showErrors)(inputs))
    .then(res => flatten(res) )
    .then(arr => console.log(arr))
    .catch(err => console.log('err on form.js: ', err));

  })(document.querySelectorAll('form[data-validate="true"]'));
}


