'use strict';
import $ from 'jquery';

export default function() {
  $('button[data-validate="true"]').on('click', function(e) {
    e.preventDefault();
    let inputs = $(this).find('input');
    console.log(inputs);
  });
}