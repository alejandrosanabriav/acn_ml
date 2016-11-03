'use strict';
import $ from 'jquery';
import validator from 'validator';

function validate(type, val) {
  switch(type) {
    case 'required':
      return !validator.isEmpty(val);
    break;
    default: 
      return false;
  }
}

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');
    inputs.each(function(index) {
      let val = $(this).val();
      let validations = $(this).data('validate').split('|');
      let messages = $(this).data('messages').split('|');
      
      validations.forEach(type => {
        console.log(validate(type, val));
      });

    });

  });
}
