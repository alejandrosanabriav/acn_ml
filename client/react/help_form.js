import React from 'react';
import validator from 'validator';

const HelpForm = React.createClass({
	getInitialState() {
		return {
			email: '',
			name: '',
			lastname: '',
			mobile: '',
			loading: false,
			errors: {}
		}
	},

	checkEmpty(field) {
		return validator.isEmpty(this.state[field]);
	},
	
	validate() {
		let validations = ['name', 'lastname', 'email', 'mobile'].map((field) => {
			return this.checkEmpty(field);
		});

		return Promise.all(validations);
	},

	isValid() {
		let is = this.validate().then(arr => console.log(arr.every(item => item == false) ));
		return is;
},

	handleSubmit(e) {
		e.preventDefault();
		let tags = '900 419';
		let contact = this.state;
		this.setState({...contact, loading: true});

		if(this.isValid()) {
			$.ajax({
				url: '/wp-admin/admin-ajax.php',
				type: 'post',
				data: { action: 'infusion_contact', data: {...contact, tags} }
			}).then((res) => {
				this.setState({...contact, loading: false});
			});
		}
		
	},

	handleChange(field, e) {
		e.preventDefault();
		let val = e.currentTarget.value;
		this.setState({...this.state, [field]: val});
	},

	render() {
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'email')} 
						value={this.state.email} 
					/>
					<div className={this.state.errors.name ? "form-error" : "hidden" }>
						campo obligatorio
					</div>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'name')} 
						value={this.state.name} 
					/>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'lastname')} 
						value={this.state.lastname} 
					/>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'mobile')} 
						value={this.state.mobile} 
					/>
				</div>
				<button className="btn" disabled={this.state.loading}>Desea Ayudar</button>
			</form>
		)
	}
});

export default HelpForm;