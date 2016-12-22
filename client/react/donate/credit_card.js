import React from 'react';
import Cards from './cards';

const CedritCard = React.createClass({
	validateCard(card) {
		let number = Stripe.card.validateCardNumber(card);
		return this.updateErrors({number});
	},

	validateExpiry(month, year) {
		let valid = Stripe.card.validateExpiry(month, year);
		return this.updateErrors({exp_month: valid, exp_year: valid});
	},

	validateCvc(cvc) {
		cvc = Stripe.card.validateCVC(cvc);
		return this.updateErrors({cvc});
	},

	updateErrors(field) {
		return {...this.props.errors, stripe: field};
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
		let stripe = {...this.props.stripe, number, card_type};
		this.props.onChange({stripe, errors});
	},
	
	handleExpiry(type, e) {
		let {stripe, onlyNum, maxLength} = this.props;
		let val = onlyNum(e.currentTarget.value);
		val =  maxLength(val, 2);
		let exp_month = stripe.exp_month;
		let exp_year = stripe.exp_year;
		if(type == 'exp_month') exp_month = val;
		if(type == 'exp_year') exp_year = val;
		let errors = this.validateExpiry(exp_month, exp_year);
		stripe = {...stripe, exp_month, exp_year};

		this.props.onChange({stripe, errors});
	},

	handleCvc(e) {
		let {stripe, onlyNum, maxLength} = this.props;
		let cvc = onlyNum(e.currentTarget.value);
		cvc = maxLength(cvc, 4);
		stripe = {...stripe, cvc};
		let errors = this.validateCvc(cvc);
		this.props.onChange({stripe, errors});
		
	},

	showErr(field) {
		return this.props.errors.stripe[field] == false ? 'form-group__error' : 'hidden';
	},

	allValidations(e) {
		e.preventDefault();
		const {stripe} = this.props;
		let number = this.validateCard(stripe.number);
		let exp_month = this.validateExpiry(stripe.exp_month, stripe.exp_year);
		let exp_year = this.validateExpiry(stripe.exp_month, stripe.exp_year);
		let cvc = this.validateCvc(stripe.cvc);
		let errors = {...number, ...exp_month, ...exp_year, ...cvc};
		console.log(number, exp_month);
		this.props.onChange({errors});
	},

	render() {
		const {texts, stripe, errors} = this.props;

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
					onChange={this.handleExpiry.bind(null, 'exp_month')}
					value={stripe.exp_month}
				/>
				<span className={this.showErr('exp_month')}>
					{texts.validation_month}
        </span>
			</div>
			
				<div className="form-group col-md-4">
					<input 
						type="text" 
						placeholder={texts.year_placeholder} 
						className="form-control" 
						onChange={this.handleExpiry.bind(null, 'exp_year')}
						value={stripe.exp_year}
					/>
					<span className={this.showErr('exp_year')}>
						{texts.validation_year}
					</span>
				</div>
				<div className="form-group col-md-4">
					<input
						type="text" 
						placeholder={texts.cvc_placeholder} 
						className="form-control" 
						onChange={this.handleCvc}
						value={stripe.cvc}
					/>
		
					<span className={this.showErr('cvc')}>
						{texts.validation_cvc}
					</span>
				</div>
			</div>
			<button onClick={this.allValidations}>validate</button>
		</div>
		)
	}
});

export default CedritCard;