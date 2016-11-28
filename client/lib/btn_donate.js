'use strict';

export default () => {
	$('.bs-donate').on('click', e => {
		e.preventDefault();
		ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATION_CLICK', 0);
		
		$.ajax({
			url: '/wp-admin/admin-ajax.php',
			data: {action: 'donate_redirect'}
		})
		.done(res => window.location = res);

	});
};