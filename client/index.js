'use strict';
require('babel-polyfill');
import Vue from 'vue';
import React from 'react';
import {render} from 'react-dom';
import multipleRender from "react-multiple-render";
import donate from './components/donate';
import donateVertical from './components/donate_vertical';
import contact from './components/contact';
import changeAmount from './components/change_amount';
import sliderBg from './components/slider_bg';
import share from './components/share';
import btnDonate from './lib/btn_donate';
import HelpForm from './components/help_form';
import DonateReact from './components/donate';

(function() {
	Vue.component('change-amount', changeAmount());
	Vue.component('donate-landing', donate());
	Vue.component('donate-vertical', donateVertical());
	Vue.component('bsslider-bg', sliderBg());
	Vue.component('contact', contact());
	Vue.component('bs-share', share());

	const vm = new Vue({ el: '#app-ml' });

	multipleRender(HelpForm, '.bs-help-form');
	multipleRender(DonateReact, '.bs-donate-react');
	
	btnDonate();

	$('.bs-share').on('click', e => ga('send', 'event', 'DONATION', 'SHARE_CLICK', 'SHARE_CLICK', 0));

	$('.bs-back').on('click', e => {
		 e.preventDefault(); 
		 window.history.back();
	});

	function throttle(fn, delay) {
		let wait = false;

		return () => {
			if (!wait) {
				fn.call();
				wait = true;
				setTimeout(() => {
					wait = false;
				}, delay);
			}
		}

	}

function showAfterScroll() {
	let scrollTop = $(window).scrollTop();
	let elScrollTop = $('.donate_landing').length ? $('.donate_landing').offset().top : 0;
	console.count(scrollTop > elScrollTop);

	if(scrollTop > elScrollTop) {
		$('.after_donate').removeClass('hidden');
	} else {
		$('.after_donate').addClass('hidden');
	}
}	

	const smViewportMax = 991;
	const smViewportMin = 768;
	const xsViewport = 767;

	if($('.hide_nav_mobile').length ) {
		if($(window).width() <= 991) {
			$('.navbar-toggle').attr('style', 'display:none!important');
		} else {
			$('.navbar-toggle').attr('style', '');
		}
	}

	if($('.after_donate').length ) {
		$(window).on('scroll', throttle(showAfterScroll, 100));
	}

})();
