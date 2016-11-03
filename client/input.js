'use strict';
import $ from 'jquery';

export default function() {
  $('input[data-validate]').on('keydown', function(e) {
    let val = $(this).val();
    console.log(val);
  });
}
