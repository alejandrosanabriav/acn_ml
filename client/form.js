'use strict';
import $ from 'jquery';
import validate from './validate';
import {map, onAll, reduce, flatten } from './fun';

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
  const {email} = data;

	let mergeFields = Object.keys(data).reduce((obj, key) => {
		let newOb = {};
		let name = key.toUpperCase();
		newOb[name] = data[key];
		return {...obj, ...newOb};	
	}, {}); 

  let bounce = {
    "email_address": email,
    "status": "subscribed",
    "merge_fields": mergeFields,
    "update_existing": true
  };      

  bounce = {action: 'mailchimp_subscribe', data: bounce};

  $.ajax({
    type: 'post',
    url: '/wp-admin/admin-ajax.php',
    data: bounce
  })
  .done(res => console.log(res));

}

function serializeInput(prev, el) {
  let name = el.getAttribute('name');
  let val = el.value;
  let ob = {};
  ob[name] = val;
  return {...prev, ...ob};
}

export default function() {
  let onSubmit = function(e) {

    e.preventDefault();
    let $form = this;
    let inputs = $form.querySelectorAll('.input');
    let data = reduce(serializeInput)(inputs);

    Promise
    .all(map(showErrors)(inputs))
    .then(res => flatten(res) )
    .then(arr => arr.filter(b => b == false) == 0  )
    .then(isValid => {
      if(isValid) {
        return requestToMailchimp(data);
      }
    })
    .catch(err => console.log('err on form.js: ', err));

  };

  let $forms = document.querySelectorAll('form[data-validate="true"]');
  
  onAll('submit', onSubmit)($forms);
}


