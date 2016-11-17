'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

export default () => ({
	props: ['images'],

	template:`
		<div style="position:relative; overflow: hidden">
			<ul> 
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
		this.$el.querySelector('ul').style.width = `${ulWidth}%`;
		let w = 100 / lisCount;
		let h = this.$el.parentNode.offsetHeight;
		
		each(lis, function(el) {
			el.style.width = `${w}%`;
			el.children.style.minHeight = '400px';
		});
	}
})

