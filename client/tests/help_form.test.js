import React from 'react';
import {shallow} from 'enzyme';
import HelpForm from '../react/help_form';

describe('help form component', () => {
	it('should change state', () => {
		let wrapper = shallow(<HelpForm />);
		
		wrapper.find('input').at(0).simulate('change', {
			currentTarget: {value: 'nea@gmail.com'}, 
			preventDefault: () => {}
		});

		wrapper.find('input').at(1).simulate('change', {
			currentTarget: {value: 'ale'}, 
			preventDefault: () => {}
		});

		wrapper.find('input').at(2).simulate('change', {
			currentTarget: {value: 'san'}, 
			preventDefault: () => {}
		});

		wrapper.find('input').at(3).simulate('change', {
			currentTarget: {value: '123456789'}, 
			preventDefault: () => {}
		});

		let expectedState = {
			email: 'nea@gmail.com', 
			firstName: 'ale', 
			lastName: 'san', 
			name: '', 
			phone: '123456789',
			errors: {},
			loading: false
		};

		expect(wrapper.state()).toEqual(expectedState);
	})

	it('should validate', () => {
		let wrapper = shallow(<HelpForm />);
		wrapper.simulate('submit', {preventDefault: () => {}});

		let expectedState = {
			email: true, 
			firstName: true, 
			lastName: true, 
			phone: true,
		};

		expect(wrapper.state().errors).toEqual(expectedState);
	})

	it('sould show errors', () => {
		let wrapper = shallow(<HelpForm />);
		wrapper.simulate('submit', {preventDefault: () => {}});
		expect(wrapper.find('.form-error').length).toBe(4);
	})
});
