'use strict';
const each = fn => arr => Array.prototype.forEach.call(arr, fn);
const map = fn => arr => Array.prototype.map.call(arr, fn);

function dollar(selector) {
  
  function Dollar() {
    const els = document.querySelectorAll(selector);
    const l = els.length;

    for(var i = 0; i < l; i++ ) {
      this[i] = els[i];
    }

    this.length = l;
  }

  Dollar.prototype.on = function(event, fn) {
    each(function(el) {
      el.addEventListener(event, fn);
    })(this);

    return this;
  }
  
  Dollar.prototype.addClass = function (newClass = '') {
    each(function(el) {
      let currentClass = el.getAttribute('class');
      
      if(currentClass == null) {
        currentClass = '';
      }

      newClass = `${currentClass} ${newClass}`;

      el.setAttribute('class', newClass);
    })(this);

    return this;
  }

  Dollar.prototype.removeClass = function(clss) {
    each(function(el) {
      const currentClass = el.getAttribute('class');
      const arrClass = currentClass.split(' '); 
      const newClass = arrClass.filter(cl => cl !== clss);
      el.setAttribute('class', newClass.join(' '));
    })(this);

    return this;
  }

  Dollar.prototype.attr = function(att, val) {
    if(val) {
     each(el => el.setAttribute(att, val))(this);
     return this;
    } else {
     return map(el.getAttribute(att))(this);
    }
  }

  return new Dollar();
}
  
  




