'use strict';
import $ from 'jquery';
import uploader from './uploader';

$(function() {
	uploader();
	$('.update-geoip').on('click', function(e){
		e.preventDefault();

		$.ajax({
			type: 'post',
			url: '/wp-admin/admin-ajax.php',
			data: {action: 'geoip_update', data: {update: true}}
		})
		.then(res => if(res) $('.update-geoip-message').append('GeoIP updated'));
	}); 
});



