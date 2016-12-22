import React from 'react';
import Cards from './cards';

const CedritCard = React.createClass({
	validateCard(number) {
		let valid = Stripe.card.validateCardNumber(number);
		return {...this.props.errors, stripe: {number: valid}};
	},

	getCardType(number) {
		return Stripe.card.cardType(number).replace(' ', '');
	},

	handleCard(e) {
		const {onlyNum, maxLength} = this.props;
		let val =  e.currentTarget.value;
		let number = onlyNum(val);
		number = maxLength(number, 16);
		let errors = this.validateCard(number);
		let card_type = this.getCardType(number);
		let stripe = {...this.stripe, number, card_type};
		this.props.onChange({stripe, errors});
	},

	showErr(field) {
		return errors.stripe[field] == false ? 'form-group__error' : 'hidden';
	},

	render() {
		const {texts, stripe, errors} = this.props;
		console.log(stripe.number);
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

				<span className={this.showErr('number')}>
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