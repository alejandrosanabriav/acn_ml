export const openMediaUploader = () => {
	let media_uploader = wp.media({
		frame: 'post',
		state:    'insert',
		multiple: false
	});

	let promise = new Promise((resolve) => {
		media_uploader.on('insert', () => {
			let json = media_uploader.state().get('selection').first().toJSON();
			return resolve(json);
		});
	});

	media_uploader.open();

	return promise;
};

export const section = () => {

	$('.uploader').on('click', (e) => {

		openMediaUploader()
		.then(res => {
			$(e.currentTarget).val(res.url);
		});
	});
};

