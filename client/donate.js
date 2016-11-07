'use strict';
import $ from 'jquery';

export default function() {
  let form = $('.form_steps');
  let steps = form.find('.form_steps__step');
  let maxStep = steps.length;
  let stepWidth = (100 / maxStep);
  let viewportWidth = (maxStep * 100);
  let viewport = form.find('.form_steps__viewport');
  steps.css({'width':`${stepWidth}%`});
  viewport.css({'width':`${viewportWidth}%` });
  let s = 0;
  
  form.on('submit', function(evt) {
    evt.preventDefault();
    s = s + 1;
    step();

     $(this).find('.form_steps__viewport').css({left: '-100%'});
    
  });
}
