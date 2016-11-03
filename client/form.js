'use strict';
import $ from 'jquery';

export default function() {
  $('form[data-validate="true"]').on('submit', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');
    console.log('inputs: ', inputs);
  });
}
