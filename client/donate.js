'use strict';
import $ from 'jquery';

export default function donate() {
  let form = $('.form_steps');
  let steps = form.find('.form_steps__step');
  let maxStep = steps.length;
  let stepWidth = (100 / maxStep);
  let viewportWidth = (maxStep * 100);
  let viewport = form.find('.form_steps__viewport');
  let s = 0;

  steps.css({'width':`${stepWidth}%`});
  viewport.css({'width':`${viewportWidth}%` });
  
  $('.form_steps__back').on('click', function(evt) {
    evt.preventDefault();
  });

  form.on('submit', function(evt) {
    evt.preventDefault();
    let $this = $(this);
    let step = 0;
    $this
  });

  $('.form_steps__next').on('click', function(evt) {
    evt.preventDefault();
    let $this = $(this);
    let step = $this.data('step');
    let next = step * 100;
    step = step + 1;
    $this.data('step', step);
    $this.parent().find('.form_steps__viewport').css({left: '-${next}%'});
  });
  
}