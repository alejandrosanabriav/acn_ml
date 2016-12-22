import React from 'react';

const Cards = React.createClass({
	cardType(type) {
		return this.props.stripe.card_type == type ? 'card-type card-type--active' : 'card-type';
	},

	render() {
		const {card_type, texts} = this.props;

		return (
			 <div className="form-group col-sm-12 donate_landing__cards">
        	<img 
            className={this.cardType('Visa')}  
						src={`${texts.template_uri}/public/img/cards/Visa.png`}
          />
					<img 
            className={this.cardType('MasterCard')}  
						src={`${texts.template_uri}/public/img/cards/MasterCard.png`}
          />
					<img 
            className={this.cardType('DinersClub')}  
						src={`${texts.template_uri}/public/img/cards/DinersClub.png`}
          />
					<img 
            className={this.cardType('AmericanExpress')}  
						src={`${texts.template_uri}/public/img/cards/AmericanExpress.png`}
          />
					<img 
            className={this.cardType('Discover')}  
						src={`${texts.template_uri}/public/img/cards/Discover.png`}
          />
					
			</div>
		)
	}
});

export default Cards;
