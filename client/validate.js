'use strict';
import validator from 'validator';

export default function validate(type, val) {
  switch(type) {
    case 'required':
      return !validator.isEmpty(val);
    break;
    case 'email':
      return validator.isEmail(val);
    break;
    case 'alpha':
      return validator.isAlpha(val);
    break;
    default: 
      return false;
  }
}
