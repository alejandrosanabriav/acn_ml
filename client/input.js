'use strict';

export default function() {
  $('input[data-validate]').on('keydown', e => {
    let val = $(this).val();
    console.log(val);
  });
}
