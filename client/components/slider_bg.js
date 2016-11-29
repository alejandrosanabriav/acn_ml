'use strict';

const each = (arr, fn) => Array.prototype.forEach.call(arr, fn);

export default () => ({
	props: ['images', 'height', 'interval'],
	data() {
		return {
			slide: 1,
			lastSlide: 1,
			autoplay: null
		};
	},

	ready() {
	
		let lisCount = $(this.$el).find('li').length;
		let ulWidth = lisCount * 100;
		let w = 100 / lisCount;
		this.lastSlide = lisCount;
		$(this.$el).find('li').css({width: `${w}%`, height: this.height});
		$(this.$el).find('li span').css({height: this.height});
		$(this.$el).find('ul').css({width: `${ulWidth}%`});

		this.autoplay = setInterval(() => {
			this.next();
		}, parseInt(this.interval));
	},

	methods: {
		nextBtn() {
			clearInterval(this.autoplay);
			this.next();
		},

		prevBtn() {
			clearInterval(this.autoplay);
			this.prev();
		},

		next() {
			if(this.slide < this.lastSlide) {
				let next = this.slide * 100;
				$(this.$el).find('ul').css({left: `-${next}%`});
				this.slide = this.slide + 1;
			} else {
				$(this.$el).find('ul').css({left: 0});
				this.slide = 1;
			}
		},

		prev() {
			if(this.slide >= 1) {
				let next = this.slide * 100;
				this.$el.querySelector('ul').style.left = `-${next}%`;
				this.slide = this.slide - 1;
			}
			
		},

		getStyle(image) {
			
			let style = {
				display: 'block', 
				background: `url(${image})`, 
				backgroundSize: 'cover', 
				backgroundPosition: 'center'
			};
			console.log(style);
			return style; 
		}
	},

	template:`
		<div style="position:relative; overflow: hidden">
			<div class="navigation">
				<button v-on:click.prevent="nextBtn" style="border: none; position: absolute; top:0;bottom:0;margin: auto; right: 20px; z-index: 1010"><i class="ion-chevron-right"></i></button>
				<button v-on:click.prevent="prevBtn" style="border: none; position: absolute; top:0;bottom:0;margin: auto; left: 20px; z-index: 1010"><i class="ion-chevron-left"></i></button>
			</div>

			<ul style="position:relative; padding: 0;transition: all 300ms ease">
			 
				<li v-for="image in images" style="float:left;list-style: none">
					<span 
						v-bind:style="getStyle(image)"></span> 
				</li>
			</ul>
		</div>
	`,
});
