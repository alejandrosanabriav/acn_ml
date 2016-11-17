'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

export default () => ({
	props: ['images'],

	template:`
		<div>
			<ul style="overflow: hidden"> 
				<li v-for="image in images" style="float:left"> 
					<span style="display: block;background:url({{image}}); background-size: cover; height: 300px"></span> 
				</li> 
			</ul>
		</div>
	`,

	ready() {
		this.$el.style.width = '300%';
		this.$el.children.style = '100%';
		each(this.$el.querySelectorAll('li'), function(el) {
			console.log(el);
			el.style.width = '100%';
		});
	}
})

