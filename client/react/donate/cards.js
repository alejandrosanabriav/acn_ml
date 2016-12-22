import React from 'react';

const Cards = React.createClass({
	cardType(type) {
		return this.props.card_type == type ? 'card-type card-type--active' : 'card-type';
	},

	render() {
		const {card_type, texts} = this.props;

		return (
			 <div class="form-group col-sm-12 donate_landing__cards">
        	<img 
            className={this.cardType('visa')}  
						src={`${texts.template_uri}/public/img/cards/Visa.png`}
          />
			</div>
		)
	}
});

export default Cards;
