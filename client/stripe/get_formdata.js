'use strict';
const _ = require('lodash');

let formData = ($form) => {

  return _.reduce($form.serializeArray(), (obj, field) => {

    obj[field.name] = field.value;

    return obj;
  }, {});

};

module.exports = formData;
