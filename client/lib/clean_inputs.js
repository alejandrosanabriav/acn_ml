export function maxLength(val = '', length) {
  return val.substring(0, length);
}

export function onlyNum(val = '') {
  if (typeof val == 'string') {
    return val.replace(/[^0-9]+/, '');
  }

  if (typeof val == 'number') {
    return val.toString().replace(/[^0-9]+/, '');
  }

  console.error('onlyNum val is not a string or number: ', val);
}
