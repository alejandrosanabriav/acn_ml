'use strict';

export default function sliderBg() {
	return {
		props: ['images'],
		template: `
			<ul>
				<li v-for="image in images">
					<span style="background:{{image}}; height: 300px"></span>
				</li>
			</ul>
		`,

		ready() {
			console.log('slider-bg', this.$el, images);
		}
		
	};
}