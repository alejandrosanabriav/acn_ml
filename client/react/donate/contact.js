import React from 'react';

const Contact = React.createClass({
	handleChange(field, e) {
		this.props.onChange({contact: {...this.props.contact, [field]: e.currentTarget.value}});
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
				
			</div>
		)
	}
});

export default Contact;