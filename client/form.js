'use strict';
import $ from 'jquery';
import validate from './validate';

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let $form = $(this);
    let inputs = $(this).find('input');
    let isValid = false;

    inputs.each(function(index) {
      let $input = $(this);
      let val = $input.val();
      let name = $input.attr('name');
      let validations = $input.data('validate').split('|');
      let messages = $input.data('messages').split('|');
      let $err = $(`input[name="${name}"]`)
          .parent()
          .find('.input__errors');
      
      $err.empty();
      isValid = true;

      validations.forEach((type, i) => {
        if(!validate(type, val)) {
          $err
          .append(messages[i]);
          isValid = false;
        }

      });

    });

    console.log('is valid: ', isValid);


  });
}
