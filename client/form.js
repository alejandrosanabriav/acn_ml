'use strict';
import $ from 'jquery';

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');
    inputs.each(function(input) {
      console.log(input, input.data('validate'));
    });

    console.log('inputs: ', inputs);
  });
}
