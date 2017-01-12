import React from 'react';
import validator from 'validator';

const HelpForm = React.createClass({
	getInitialState() {
		return {
			email: '',
			name: '',
			firstName: '',
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
		let validations = ['firstName', 'lastname', 'email', 'mobile'].map((field) => {
			let val = this.checkEmpty(field);
			let errors = {...this.state.errors, [field]: val };
			console.log(errors);
			this.setState({ errors });
			return val;
		});

		return Promise.all(validations);
	},

	isValid() {
		return this.validate().then(arr => arr.every(item => item == false) );
	},

	handleSubmit(e) {
		e.preventDefault();
		let contact = this.state;
		this.setState({...contact, loading: true});
		this.isValid().then(this.storeContact);
	},

	storeContact(isValid) {
		let contact = this.state;
		let tags = '900 419';
		let data = {...contact, tags, name: `${contact.firstName} ${contact.lastname}`};

		if(isValid) {
			$.ajax({
				url: '/wp-admin/admin-ajax.php',
				type: 'post',
				data: { action: 'infusion_contact', data }
			}).then((res) => {
				this.setState({...contact, loading: false});
			});
		} else {
			this.setState({...contact, loading: false});
		}
	},

	handleChange(field, e) {
		e.preventDefault();
		let val = e.currentTarget.value;
		this.setState({...this.state, [field]: val});
	},

	render() {
		let errorStyle = {
			background: 'red',
			color: '#fff',
			padding: '10px'
		};
		console.log('errors', this.state.errors);
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'email')} 
						value={this.state.email} 
						placeholder="Correo"
					/>
					<div style={errorStyle} className={this.state.errors.firstName ? "form-error" : "hidden" }>
						campo obligatorio
					</div>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'firstName')} 
						value={this.state.firstName} 
						placeholder="Nombre"
					/>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'lastname')} 
						value={this.state.lastname} 
						placeholder="Apellido"
					/>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'mobile')} 
						value={this.state.mobile}
						placeholder="Celular"
					/>
				</div>
				<button className="btn" disabled={this.state.loading}>Desea Ayudar</button>
			</form>
		)
	}
});

export default HelpForm;