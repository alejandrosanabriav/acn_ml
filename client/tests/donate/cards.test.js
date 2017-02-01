import React from 'react';
import {shallow} from 'enzyme';
import Cards from '../../react/donate/cards';

describe('donate amount component', () => {
	it("shouldn't have active card", () => {
		const wrapper = shallow(<Cards texts={{}} card_type="" stripe={{card_type: ''}} />);
		expect(wrapper.find('.card-type--active').length).toBe(0);
	})

	it('should have active card', () => {
		const wrapper = shallow(<Cards texts={{}} card_type="Visa" stripe={{card_type: 'Visa'}} />);
		expect(wrapper.find('.card-type--active').length).toBe(1);
	})
	
});