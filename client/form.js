'use strict';
import $ from 'jquery';
import validator from 'validator';

function validate(type, val) {
  switch(type) {
    case 'required':
      return !validator.isEmpty(val);
    break;
    case 'email':
      return validator.isEmail(val);
    break;
    case 'alpha':
      return validator.isAlpha(val);
    break;
    default: 
      return false;
  }
}

function cleanErrors(name) {
  return $(`input[name="${name}"]`)
          .parent()
          .find('.input__errors')
          .empty();
}

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');

    inputs.each(function(index) {
      let val = $(this).val();
      let name = $(this).attr('name');
      let validations = $(this).data('validate').split('|');
      let messages = $(this).data('messages').split('|');

      validations.forEach((type, i) => {
        if(!validate(type, val)) {
          cleanErrors(name)
          .append(messages[i]);
        } else {
          cleanErrors(name);
        }

      });

    });

  });
}
