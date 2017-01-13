import React from 'react';
import validator from 'validator';

const HelpForm = React.createClass({
	getInitialState() {
		return {
			email: '',
			name: '',
			firstName: '',
			lastName: '',
			phone: '',
			loading: false,
			errors: {}
		}
	},

	checkEmpty(field) {
		return validator.isEmpty(this.state[field]);
	},
	
	validate() {
		let errors = {};
		let validations = ['firstName', 'lastName', 'email', 'phone'].map((field) => {
			let val = this.checkEmpty(field);
			errors = {...errors, [field]: val };
			return val;
		});

		this.setState({ errors });
		
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
		let tags = '900,419';
		let data = {...contact, tags, name: `${contact.firstName} ${contact.lastName}`};

		if(isValid) {
			$.ajax({
				url: '/wp-admin/admin-ajax.php',
				type: 'post',
				data: { action: 'infusion_contact', data }
			}).then((res) => {
				const {firstName, lastName, email, phone} = contact;
				let url = `https://campaigns.acncolombia.org/medioriente/?nombre=${firstName}&apellido=${lastName}&email=${email}&celular=${phone}`;
				window.location = url;
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
			padding: '10px',
			borderRadius: '5px'
		};

		let btnStyle = {
			border: '4px solid #fff',
			background: 'transparent'
		};

		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input 
						type="text"
						className="form-control input-email" 
						onChange={this.handleChange.bind(null, 'email')} 
						value={this.state.email} 
						placeholder="Correo"
					/>
					<div style={errorStyle} className={this.state.errors.email ? "form-error" : "hidden" }>
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
					<div style={errorStyle} className={this.state.errors.firstName ? "form-error" : "hidden" }>
						campo obligatorio
					</div>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'lastName')} 
						value={this.state.lastName} 
						placeholder="Apellido"
					/>
					<div style={errorStyle} className={this.state.errors.lastName ? "form-error" : "hidden" }>
						campo obligatorio
					</div>
				</div>
				<div className="form-group">
					<input 
						type="text"
						className="form-control" 
						onChange={this.handleChange.bind(null, 'phone')} 
						value={this.state.phone}
						placeholder="Celular"
					/>
					<div style={errorStyle} className={this.state.errors.phone ? "form-error" : "hidden" }>
						campo obligatorio
					</div>
				</div>
				<button disabled={this.state.loading} onClick={this.handleSubmit}>Deseo Ayudar</button>
			</form>
		)
	}
});

export default HelpForm;