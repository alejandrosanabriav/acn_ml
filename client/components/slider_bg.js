'use strict';

export default () => ({
	props: ['images'],

	template:`
		<ul> 
			<li v-for="image in images"> 
				<span style="display: block;background:url({{image}}); background-size: cover; height: 300px"></span> 
			</li> 
		</ul>
	`,

	ready() {
		this.images = JSON.parse(this.images);
		this.$el.style.width = '300%';
	}
})

