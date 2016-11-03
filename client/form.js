'use strict';
import $ from 'jquery';

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');
    inputs.each(function(index) {
      console.log($(this).data('validate').split('|'));
      console.log($(this).data('messages').split('|'));
    });

  });
}
