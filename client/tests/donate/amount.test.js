import React from 'react';
import {shallow} from 'enzyme';
import Amount from '../../react/donate/amount';

describe('donate amount component', () => {

	it('should call function onChange', () => {
		const onChange = jest.fn();
		const onlyNum = jest.fn();
		const wrapper = shallow(<Amount amount={20} texts={{}} onlyNum={onlyNum} onChange={onChange} />);
		wrapper.find('a').at(0).simulate('click');
		wrapper.find('a').at(1).simulate('click');
		wrapper.find('input').at(0).simulate('change', {currentTarget: {}});
		expect(onChange).toHaveBeenCalledTimes(3);
	})

	it('should have active monthly btn', () => {
		const wrapper = shallow(<Amount texts={{}} donation_type="monthly" />);
		expect(wrapper.find('.donate_landing__type--active').length).toBe(1);
	})

	it('should have active once btn', () => {
		const wrapper = shallow(<Amount texts={{}} donation_type="once" />);
		expect(wrapper.find('.donate_landing__type--active').length).toBe(1);
	})
	
});
