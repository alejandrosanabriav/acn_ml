'use strict';
import stripeSlashes from '../stripslashes';

export default () => ({
	props: ['images'],
	
	template:`
		<ul> <li v-for="image in images"> <span style="background:{{image}}; height: 300px"></span> </li> </ul>
	`,

	ready() {
		console.log('slider-bg', stripeSlashes(this.images) );
	}
})

