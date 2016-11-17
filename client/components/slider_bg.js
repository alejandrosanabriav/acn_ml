'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

export default () => ({
	props: ['images', 'height'],

	template:`
		<div style="position:relative; overflow: hidden">
			<ul style="padding: 0"> 
				<li v-for="image in images" style="float:left;list-style: none"> 
					<span style="display: block;background:url({{image}}); background-size: cover; background-position: center;"></span> 
				</li> 
			</ul>
		</div>
	`,

	ready() {
		let lis = this.$el.querySelectorAll('li');
		let lisCount = lis.length;
		let ulWidth = lisCount * 100;
		let w = 100 / lisCount;
		this.$el.querySelector('ul').style.width = `${ulWidth}%`;
		
		each(lis, function(el) {
			el.style.width = `${w}%`;
			el.children[0].style.minHeight = this.height;
		});
	}
});
