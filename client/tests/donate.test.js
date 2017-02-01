import donate from '../../client/components/donate';
import nock from 'nock';
import Vue from 'vue';
import $ from 'jquery';

describe('donate vue component', () => { 

	beforeEach(() {
    $.ajax = jest.fn(() => Promise.resolve(['colombia']) );
  })

	it('should have props', () => {
		let component = donate();
		let expectedProps = [
			'captcha_name',
			'url',
			'currency',
			'country',
			'validationMessages',
			'backText',
			'texts',
			'link',
			'cardSrc',
			'placeholders',
			'redirect',
			'monthly',
			'once',
			'vertical',
			'isBlue',
			'subtext',
			'amount-texts',
			'showAmountTexts'
		];

		expect(component.props).toEqual(expectedProps);
	})

	it('should have data', () => {
		let component = donate();

		const expectedData = {
			donation_type: 'monthly',
			progress: '33.3%',
			isBlue: false,
			declined: false,
			amount: 30,
			section: 1,
			success: false,
			loading: false,
			countries: [],
			errors: {
				stripe: {},
				contact: {},
			},
			stripe: {
				number: '',
				exp_month: '',
				exp_year: '',
				cvc: '',
				token: ''
			},

			contact: {
				name: null,
				email: null,
				country: null
			},

			card: {
				Visa: false,
				MasterCard: false,
				DinersClub: false,
				AmericanExpress: false,
				Discover: false
			}
		};

		expect(component.data()).toEqual(expectedData);
	})

	it('should get countries', () => {
		let component = donate();
		expect(component.init().then((res) => console.log(res))).toEqual(Promise.resolve(['colombia']));
	})
});
