'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

export default () => ({
	props: ['images'],

	template:`
		<div style="position:relative; overflow: hidden">
			<ul> 
				<li v-for="image in images" style="float:left"> 
					<span style="display: block;background:url({{image}}); background-size: cover; height: 300px"></span> 
				</li> 
			</ul>
		</div>
	`,

	ready() {
		this.$el.querySelector('ul').style.width = '300%';

		each(this.$el.querySelectorAll('li'), function(el) {
			el.style.width = '100%';
		});
	}
})

