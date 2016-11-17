'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

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
		this.$el.style.width = '300%';
		console.log(this.$el.children);
		each(this.$el.children, function(el) {
			console.log(el);
			el.style.width = '100%';
		});
	}
})

