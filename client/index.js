'use strict';
import input from './input';
import form from './form';
import donate from './components/donate';
import contact from './components/contact';
import changeAmount from './components/change_amount';
import sliderBg from './components/slider_bg';

(function() {
	Vue.component('change-amount', changeAmount());
	Vue.component('donate-landing', donate());
	Vue.component('bsslider-bg', sliderBg());
	Vue.component('contact', contact());

	const vm = new Vue({
		el: '#app-ml'
	});

	input();
	form();
	donate();

	$('.bs-donate').on('click', e => {
		e.preventDefault();
		ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATIONS', 1);
		
		$.ajax({
			url: '/wp-admin/admin-ajax.php',
			data: {action: 'donate_redirect'}
		})
		.done(res => window.location = res);

	});
  
	$('.bs-share').on('click', e => ga('send', 'event', 'DONATION', 'SHARE_CLICK', 'SHARE_CLICK', 1));

})();
