'use strict';

export default () => ({
	props: ['images'],

	template:`
		<ul> <li v-for="image in images"> <span style="background:{{image}}; height: 300px"></span> </li> </ul>
	`,

	ready() {
		this.images = JSON.parse(this.images);
		console.log('slider-bg', this.images);
	}
})

