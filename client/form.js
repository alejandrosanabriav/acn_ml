'use strict';
import $ from 'jquery';
import validate from './validate';

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');

    inputs.each(function(index) {
      let val = $(this).val();
      let name = $(this).attr('name');
      let validations = $(this).data('validate').split('|');
      let messages = $(this).data('messages').split('|');
      let $err = $(`input[name="${name}"]`)
          .parent()
          .find('.input__errors');
      
      $err.empty();

      validations.forEach((type, i) => {
        if(!validate(type, val)) {
          $err
          .append(messages[i]);
        }

      });

    });

  });
}
