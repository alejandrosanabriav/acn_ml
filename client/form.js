'use strict';
import $ from 'jquery';
import validate from './validate';

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');
    let isValid = false;
    inputs.each(function(index) {
      let $form = $(this);
      let val = $form.val();
      let name = $form.attr('name');
      let validations = $form.data('validate').split('|');
      let messages = $form.data('messages').split('|');
      let $err = $(`input[name="${name}"]`)
          .parent()
          .find('.input__errors');
      
      $err.empty();

      validations.forEach((type, i) => {
        if(!validate(type, val)) {
          $err
          .append(messages[i]);
        } else {
          isValid = true;
        }

      });



    });
”
    console.log('is valid: ', isValid);


  });
}
