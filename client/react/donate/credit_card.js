import React from 'react';
import Cards from './cards';

const CedritCard = React.createClass({
	handleCard(e) {
		let card = e.currentTarget.value;
		let card_type = Stripe.card.cardType(card).replace(' ', '');
		let stripe = {...this.stripe, card, card_type};
		this.props.onChange({stripe});
	},

	render() {
		const {texts, stripe} = this.props;

		return (
			<div>
			<Cards {...this.props} />
			<div className="form-group">
				<input 
					type="text" 
					placeholder={texts.creditcard_placeholder} 
					className="form-control"
					onChange={this.handleCard}
					value={stripe.number}
				/>

				<span className="form-group__error">
					{texts.validation_card}
        </span>

			</div>
			<div className="row">
			<div className="form-group col-md-4">
				<input 
					type="text" 
					placeholder={texts.month_placeholder} 
					className="form-control" 
				/>
			</div>
			
				<div className="form-group col-md-4">
					<input 
						type="text" 
						placeholder={texts.year_placeholder} 
						className="form-control" 
					/>
				</div>
				<div className="form-group col-md-4">
					<input 
						type="text" 
						placeholder={texts.cvc_placeholder} 
						className="form-control" 
				/>
			</div>
			</div>
		</div>
		)
	}
});

export default CedritCard;