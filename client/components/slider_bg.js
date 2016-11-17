'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

export default () => ({
	props: ['images', 'height'],

	template:`
		<div style="position:relative; overflow: hidden">
			<ul style="position:relative; padding: 0;transition: all 300ms ease"> 
				<li v-for="image in images" style="float:left;list-style: none"> 
					<span style="display: block; background:url({{image}}); background-size: cover; background-position: center;"></span> 
				</li> 
			</ul>
		</div>
	`,

	data() {
		return {
			slide: 1,
			lastSlide: 1
		};
	},

	ready() {
		let lis = this.$el.querySelectorAll('li');
		let lisCount = lis.length;
		let ulWidth = lisCount * 100;
		let w = 100 / lisCount;
		this.lastSlide = lisCount;
		this.$el.querySelector('ul').style.width = `${ulWidth}%`;
		
		each(lis, el => {
			el.style.width = `${w}%`;
			el.children[0].style.minHeight = this.height;
		});

		setInterval(() => {
			this.next();
		}, this.interval);
	},

	methods: {
		next() {
			if(this.slide < this.lastSlide) {
				let next = this.slide * 100;
				this.$el.querySelector('ul').style.left = `-${next}%`;
				this.slide = this.slide + 1;
			} else {
				this.$el.querySelector('ul').style.left = '0';
				this.slide = 1;
			}
		},

		prev() {
			if(this.slide >= 1) {
				let next = this.slide * 100;
				this.$el.querySelector('ul').style.left = `-${next}%`;
				this.slide = this.slide - 1;
			}
			
		}
	}
});
