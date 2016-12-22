import React from 'react';
import validator from 'validator';

const Contact = React.createClass({
	validate(field, val) {
		let valid = validator.isEmpty(val);
		return {...this.props.errors, contact: {[field]: valid}};
	},

	handleChange(field, e) {
		let val = e.currentTarget.value;
		let errors = this.validate(field, val);
		console.log(errors);
		this.props.onChange({
			contact: {...this.props.contact, [field]: val}
		});
	},

	render() {
		const {texts, contact} = this.props;

		return (
			<div className="row">
				<div className="form-group col-sm-12">
					<input 
						type="text" 
						className="form-control" 
						placeholder={texts.placeholder_name}
						onChange={this.handleChange.bind(null, 'name')}
						value={contact.name}
					/>
				</div>

				<div className="form-group col-sm-12">
					<input 
						type="text" 
						className="form-control" 
						placeholder={texts.placeholder_email}
						onChange={this.handleChange.bind(null, 'email')} 
						value={contact.email}
					/>
				</div>

				<div className="form-group col-sm-12">
					<select
						type="text" 
						className="form-control" 
						placeholder={texts.placeholder_country}
						onChange={this.handleChange.bind(null, 'country')} 
						value={contact.country}
					>
					<option>nea</option>
					</select>
				</div>
				
			</div>
		)
	}
});

export default Contact;