/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _donate = __webpack_require__(13);

	var _donate2 = _interopRequireDefault(_donate);

	var _donate_vertical = __webpack_require__(111);

	var _donate_vertical2 = _interopRequireDefault(_donate_vertical);

	var _contact = __webpack_require__(80);

	var _contact2 = _interopRequireDefault(_contact);

	var _change_amount = __webpack_require__(82);

	var _change_amount2 = _interopRequireDefault(_change_amount);

	var _slider_bg = __webpack_require__(83);

	var _slider_bg2 = _interopRequireDefault(_slider_bg);

	var _share = __webpack_require__(84);

	var _share2 = _interopRequireDefault(_share);

	var _btn_donate = __webpack_require__(85);

	var _btn_donate2 = _interopRequireDefault(_btn_donate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(86);


	(function () {
		console.log('cache is:', new Date());

		Vue.component('change-amount', (0, _change_amount2.default)());
		Vue.component('donate-landing', (0, _donate2.default)());
		Vue.component('donate-vertical', (0, _donate_vertical2.default)());
		Vue.component('bsslider-bg', (0, _slider_bg2.default)());
		Vue.component('contact', (0, _contact2.default)());
		Vue.component('bs-share', (0, _share2.default)());

		var vm = new Vue({ el: '#app-ml' });

		(0, _btn_donate2.default)();

		$('.bs-share').on('click', function (e) {
			return ga('send', 'event', 'DONATION', 'SHARE_CLICK', 'SHARE_CLICK', 0);
		});

		$('.bs-back').on('click', function (e) {
			e.preventDefault();
			window.history.back();
		});
	})();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _validator = __webpack_require__(14);

	var _validator2 = _interopRequireDefault(_validator);

	var _validation = __webpack_require__(79);

	var _validation2 = _interopRequireDefault(_validation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentData = {
		donation_type: 'monthly',
		progress: '33.3%',
		declined: false,
		amount: 30,
		section: 1,
		success: false,
		loading: false,
		countries: [],
		errors: {
			stripe: {},
			contact: {}
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

	exports.default = function () {
		return {
			props: ['captcha_name', 'url', 'currency', 'country', 'validationMessages', 'backText', 'texts', 'link', 'cardSrc', 'placeholders', 'redirect', 'monthly', 'once', 'vertical'],

			data: function data() {
				return _extends({}, componentData);
			},
			init: function init() {
				var _this = this;

				$.ajax({
					url: '/wp-admin/admin-ajax.php',
					data: { action: 'countries' }
				}).then(function (res) {
					return _this.countries = res;
				});
			},
			ready: function ready() {
				var $el = this.$el;
				this.addStylesToNodes($el);
				this.setViewportWidth($el);
				var firstNode = $($el).find('.donate_landing__section-1');
				$($el).find('.donate_landing__viewport').css({ height: firstNode.offsetHeight + 'px' });
				this.contact.country = this.country;
			},


			computed: {
				cardType: function cardType() {
					var type = Stripe.card.cardType(this.stripe.number).replace(' ', '');
					return type;
				}
			},

			events: {
				'focus-amount': function focusAmount() {
					this.amount = 1;
					this.$els.amountInput.focus();
				}
			},

			methods: {
				addStylesToNodes: function addStylesToNodes(parent) {
					var nodes = $(parent).find('.donate_landing__section');
					var count = 100 / nodes.length;
					nodes.css({ width: count + '%', float: 'left' });
				},
				setViewportWidth: function setViewportWidth(parent) {
					$(parent).find('.donate_landing__viewport').css('width', '300%');
				},
				showCard: function showCard() {
					var _this2 = this;

					Object.keys(this.card).map(function (key) {
						if (key === _this2.cardType) {
							return _this2.card[key] = true;
						} else {
							return _this2.card[key] = false;
						}
					});
				},
				cleanNumber: function cleanNumber(keypath) {
					var val = this.$get(keypath);
					this.$set(keypath, val.replace(/[^0-9]+/, ''));
				},
				maxLength: function maxLength(keypath, length) {
					var val = this.$get(keypath);
					this.$set(keypath, val.substring(0, length));
				},
				createToken: function createToken() {
					var _this3 = this;

					var stripeData = {
						number: this.stripe.number,
						cvc: this.stripe.cvc,
						exp_month: this.stripe.exp_month,
						exp_year: this.stripe.exp_year
					};

					this.toggleLoading();

					//send wp_ajax to get token
					var data = {
						action: 'stripe_token',
						data: stripeData
					};

					$.ajax({
						type: 'post',
						url: '/wp-admin/admin-ajax.php',
						data: data
					}).done(function (res) {
						return _this3.handleToken(res);
					});
				},
				handleToken: function handleToken(response) {
					this.toggleLoading();

					if (response.id) {
						this.stripe.token = response.id;
						this.declined = false;
						this.nextSection();
					} else {
						this.declined = true;
					}
				},
				cardValidation: function cardValidation() {
					var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: '', field: '' };
					var type = action.type,
					    field = action.field;

					var isValid = Stripe.card[type](this.$get(field));
					this.$set('errors.' + field, !isValid);
				},
				expiryValidation: function expiryValidation() {
					var isValid = Stripe.card.validateExpiry(this.stripe.exp_month, this.stripe.exp_year);
					this.$set('errors.stripe.exp_month', !isValid);
					this.$set('errors.stripe.exp_year', !isValid);
				},
				validateContact: function validateContact() {
					var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

					var val = this.$get('contact.' + field) ? this.$get('contact.' + field) : '';

					if (field == 'email') {
						this.$set('errors.contact.' + field, !_validator2.default.isEmail(val));
					} else {
						this.$set('errors.contact.' + field, _validator2.default.isEmpty(val));
					}
				},
				contactValidations: function contactValidations() {
					var _this4 = this;

					var fields = ['name', 'email', 'country'];
					fields.forEach(function (key) {
						return _this4.validateContact(key);
					});
				},
				showStripeErrors: function showStripeErrors() {
					this.$set('errors.stripe', (0, _validation2.default)(this.stripe).errors);
					this.changeViewportHeight(2);
				},
				removeErrors: function removeErrors() {
					this.errors = _extends({}, componentData.errors);
				},
				toggleLoading: function toggleLoading() {
					this.loading = !this.loading;
				},
				getToken: function getToken(e) {
					if (e) e.preventDefault();

					if ((0, _validation2.default)(this.stripe).success) {
						this.removeErrors();
						this.createToken();
					} else {
						this.showStripeErrors();
					}
				},
				isValid: function isValid() {
					var contactErrs = this.errors.contact;
					var errs = Object.keys(contactErrs).filter(function (field) {
						return contactErrs[field] == true;
					});

					return errs.length == 0;
				},
				onSubmit: function onSubmit(e) {
					var _this5 = this;

					e.preventDefault();
					var contact = this.contact,
					    currency = this.currency,
					    amount = this.amount,
					    donation_type = this.donation_type,
					    token = this.stripe.token;

					var data = _extends({}, contact, { currency: currency, amount: amount, donation_type: donation_type, stripe_token: token });

					this.contactValidations();
					this.toggleLoading();

					if (this.isValid()) {

						this.stripeCharge(data).then(function (response) {
							if (response.id) {
								return _this5.infusion(contact).then(function () {
									return $.Deferred().resolve(response);
								});
							} else {
								_this5.declined = true;
								_this5.toggleLoading();
							}
						}).then(function (response) {
							var id = response.id,
							    customer = response.customer;
							var donation_type = _this5.donation_type,
							    amount = _this5.amount;


							ga('ecommerce:addTransaction', {
								'id': _this5.contact.email + '-' + id, // Transaction ID. Required.
								'affiliation': 'ACN International', // Affiliation or store name.
								'revenue': amount,
								'currency': 'USD'
							});

							ga('ecommerce:send');
							var url = _this5.redirect[donation_type] + '?customer_id=' + customer + '-' + id + '&order_revenue=' + amount + '&order_id=' + id;
							window.location = url;
						});
					} else {
						this.toggleLoading();
						this.changeViewportHeight(3);
					}
				},
				stripeCharge: function stripeCharge(data) {
					var _this6 = this;

					return $.ajax({
						url: '/wp-admin/admin-ajax.php',
						type: 'post',
						data: {
							action: 'stripe_charge',
							data: data
						},
						beforeSend: function beforeSend() {
							_this6.removeErrors();
						}
					});
				},
				infusion: function infusion(contact) {
					var tags = '';
					if (this.donation_type == 'monthly') tags = '870';
					if (this.donation_type == 'once') tags = '868';

					return $.ajax({
						url: '/wp-admin/admin-ajax.php',
						type: 'post',
						data: { action: 'infusion_contact', data: _extends({}, contact, { tags: tags }) }
					});
				},
				changeType: function changeType(type, evt) {
					evt.preventDefault();
					this.donation_type = type;
				},
				changeViewportHeight: function changeViewportHeight() {
					var section = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

					var parent = this.$el;
					var nodeSection = parent.querySelector('.donate_landing__section-' + section);
					var height = nodeSection.offsetHeight;
					var viewport = document.querySelector('.donate_landing__viewport');
					viewport.style.height = height + 'px';
				},
				nextSection: function nextSection() {
					var parent = this.$el;
					var section = this.section;
					var progress = 100 / 3 * (section + 1);
					var viewport = parent.querySelector('.donate_landing__viewport');
					var next = section * 100;
					viewport.style.left = '-' + next + '%';
					this.changeViewportHeight(section + 1);
					this.progress = progress + '%';
					this.section = section + 1;
				},
				backSection: function backSection() {
					var parent = this.$el;
					var section = this.section;
					var form = parent;
					var viewport = parent.querySelector('.donate_landing__viewport');
					var width = form.offsetWidth;
					var actual = width * (section - 1);
					var prev = actual - width;
					this.changeViewportHeight(section - 1);
					viewport.style.left = '-' + prev + 'px';
					this.section = section - 1;
					var progress = 100 / 3 * (section - 1);
					this.progress = progress + '%';
				}
			},

			handleSubmit: function handleSubmit() {
				if (this.vertical !== 'true') {
					this.onSubmit();
				} else {
					this.allSubmit();
				}
			},
			allSubmit: function allSubmit() {
				this.getToken();
				this.onSubmit();
			},


			template: '\n    <form method="post" class="donate_landing">\n      <div class="donate_landing__viewport">\n\t\t\t\n      <div class="donate_landing__section donate_landing__section-1">\n        <div class="donate_landing__section__title col-sm-12">\n          <h3 class="color-red">{{texts.sectionOne.title}}</h3>\n          <p>{{texts.sectionOne.content}}</p>\n        </div>\n      \n        <change-amount other="Other"></change-amount>\n\n          <div class="form-group col-md-7 col-sm-8" style="float: left">\n            <div class="input-group col-sm-12" >\n              <div class="input-group-addon">USD</div>\n              <input\n                type="text"\n                class="form-control"\n                v-model="amount"\n                v-el:amount-input\n                v-on:keyup="cleanNumber(\'amount\')"\n                placeholder="{{placeholders.amount}}"\n              >\n            </div>\n          </div>\n\n          <div class="col-md-5">\n            <a \n              href="#"\n              v-on:click="changeType(\'monthly\', $event)"\n              v-bind:class="[donation_type == \'monthly\' ? \'donate_landing__type donate_landing__type--active\' : \'donate_landing__type\' ]"\n            >\n              {{monthly}}\n            </a>\n            \n            <a\n              href="#" \n              v-on:click="changeType(\'once\', $event)"\n              v-bind:class="[donation_type == \'once\' ? \'donate_landing__type donate_landing__type--active\' : \'donate_landing__type\' ]"\n            >\n            {{once}}\n          </a>\n          </div>\n\n        <div class="col-xs-12 next-section-group">\n          <button class="donate_landing__submit pull-left" v-on:click.prevent="nextSection">\n            {{texts.sectionOne.btn}}\n          </button>\n\n          <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type == \'monthly\' ? monthly : once}}</span>\n        </div>\n      </div> <!-- donate_landing__section-1 -->\n\n      <div class="stripe-info donate_landing__section donate_landing__section-2" >\n        <div class="donate_landing__section__title col-sm-12">\n          <h3 class="color-red">{{texts.sectionTwo.title}}</h3>\n          <p>{{texts.sectionTwo.content}}</p>\n        </div>\n\n           <div class="row">\n\n          <div class="form-group col-sm-12 donate_landing__cards">\n            <img \n              v-bind:class="{\'card-type--active\': card.Visa}" \n              class="card-type" \n              :src="cardSrc.Visa" \n            >\n\n            <img\n              v-bind:class="{\'card-type--active\': card.MasterCard}" \n              class="card-type" \n              :src="cardSrc.MasterCard" \n            >\n\n            <img \n              v-bind:class="{\'card-type--active\': card.DinersClub}" \n              class="card-type" \n              :src="cardSrc.DinersClub" \n            >\n            \n            <img \n              v-bind:class="{\'card-type--active\': card.AmericanExpress}" \n              class="card-type" \n              :src="cardSrc.AmericanExpress" \n            >\n\n            <img \n              v-bind:class="{\'card-type--active\': card.Discover}" \n              class="card-type" \n              :src="cardSrc.Discover" \n            >\n          </div>\n        \n        </div>\n\n        <div class="form-group col-sm-12">\n          <input\n            type="text"\n            v-on:keyup="[cleanNumber(\'stripe.number\'), maxLength(\'stripe.number\', 16), showCard(), cardValidation({type: \'validateCardNumber\', field: \'stripe.number\'})]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.number}"\n            v-model="stripe.number"\n            placeholder="{{placeholders.creditCard}}"\n          >\n\n          <span class="form-group__error" v-if="errors.stripe.number">\n            {{validationMessages.card}}\n          </span>\n        </div>\n\n        <div class="form-group col-xs-4">\n          <input\n            type="text"\n            v-on:keyup="[cleanNumber(\'stripe.exp_month\'), maxLength(\'stripe.exp_month\', 2), expiryValidation(\'month\')]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.exp_month}"\n            style="text-align: center;"\n            placeholder="{{placeholders.month}}"\n            v-model="stripe.exp_month"\n          >\n\n          <span class="form-group__error" v-if="errors.stripe.exp_month">\n            {{validationMessages.month}}  \n          </span> \n        </div>\n\n        <div class="form-group col-xs-4" >\n          <input\n            type="text"\n            v-on:keyup="[expiryValidation(\'year\'), cleanNumber(\'stripe.exp_year\'), maxLength(\'stripe.exp_year\', 2)]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.exp_year}"\n            style="text-align: center;"\n            placeholder="{{placeholders.year}}"\n            v-model="stripe.exp_year"\n          >\n\n           <span class="form-group__error" v-if="errors.stripe.exp_year">\n             {{validationMessages.year}}\n           </span>\n        </div>\n\n        <div class="form-group col-xs-4">\n          <input\n            type="text"\n            v-on:keyup="[cardValidation({type: \'validateCVC\', field: \'stripe.cvc\'}), cleanNumber(\'stripe.cvc\'), maxLength(\'stripe.cvc\', 4)]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.cvc}"\n            style="text-align: center;"\n            v-model="stripe.cvc"\n            placeholder="{{placeholders.cvc}}"\n          >\n           <span class="form-group__error" v-if="errors.stripe.cvc">\n             {{validationMessages.cvc}}\n           </span>\n        </div>\n\n        <div class="col-md-12 form-group next-section-group">\n            <button \n              class="donate_landing__submit donate_landing__submit-get_token pull-left" \n              v-on:click.prevent="getToken" \n              :disabled="loading"\n            >\n            \t{{loading ? placeholders.loading : texts.sectionTwo.btn}}\n            </button>\n\n             <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type == \'monthly\' ? monthly : once}}</span>\n\n            <button v-on:click.prevent="backSection" class="donate_landing__back pull-right"> < {{backText}}</button>\n            </div>\n\n\t\t\t<div class="form-group col-sm-12">\n\t\t\t\t<div class="alert alert-danger" v-if="declined">\n\t\t\t\t\t{{validationMessages.declined}}\n\t\t\t\t</div>\n\t\t\t</div>\n      </div><!-- donate_landing__section-2 -->\n\n\n    <div class="donate_landing__section donate_landing__section-3" >\n      <div class="donate_landing__section__title col-sm-12">\n        <h3 class="color-red">{{texts.sectionThree.title}}</h3>\n        <p>{{texts.sectionThree.content}}</p>\n      </div>\n        <div class="col-sm-12">\n          <div class="form-group ">\n            <input\n\t\t\t\t\t\t\tv-on:keyup="validateContact(\'name\')"\n              type="text"\n              name="name"\n              class="form-control form-control--outline"\n\t\t\t\t\t\t\tv-bind:class="{\'form-group--error\': errors.contact.name}"\n              placeholder="{{placeholders.name}}"\n              v-model="contact.name"\n              >\n               <span class="form-group__error" v-if="errors.contact.name">\n                 {{validationMessages.name}}\n              </span>\n          </div>\n        </div>\n\n        <div class="col-sm-12">\n          <div class="form-group">\n            <input\n\t\t\t\t\t\t\tv-on:keyup="validateContact(\'email\')"\n              type="text"\n              name="email"\n              class="form-control form-control--outline"\n\t\t\t\t\t\t\tv-bind:class="{\'form-group--error\': errors.contact.email}"\n              placeholder="{{placeholders.email}}"\n              v-model="contact.email"\n            >\n\n            <span class="form-group__error" v-if="errors.contact.email">\n               {{validationMessages.email}}\n            </span>\n          </div>\n        </div>\n\n        <div class="col-sm-12">\n          <div class="form-group">\n            <select \n\t\t\t\t\t\t\tclass="form-control form-control--outline"\n\t\t\t\t\t\t\tv-bind:class="{\'form-group--error\': errors.contact.country}"\n\t\t\t\t\t\t\tname="country" \n\t\t\t\t\t\t\tv-model="contact.country"\n\t\t\t\t\t\t>\n                <option value="{{country}}" v-for="country in countries">{{country}}</option>\n            </select>\n            <span class="form-group__error" v-if="errors.contact.country">\n               {{validationMessages.country}}\n            </span>\n          </div>\n        </div>\n  \n      <div class="col-md-12">\n        \n        <button \n          class="donate_landing__submit pull-left" \n          v-on:click.prevent="onSubmit" \n          :disabled="loading"\n        >\n          {{loading ? placeholders.loading : texts.sectionThree.btn}}\n        </button>\n        <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>\n        <button v-on:click.prevent="backSection" class="donate_landing__back pull-right">{{backText}}</button>\n      </div>\n\t\t\t<div class="form-group col-sm-12">\n\t\t\t\t<div class="alert alert-danger" v-if="declined">\n\t\t\t\t\t{{validationMessages.declined}}\n\t\t\t\t</div>\n\t\t\t</div>\n    </div><!-- donate_landing__section-3 -->\n    </div><!-- viewport -->\n\n  </div> <!-- success -->\n  <div class="form-group col-xs-12">\n    <div class="pro-bar">\n      <div class="pro-bar__status" v-bind:style="{width: progress}"></div>\n    </div>\n  </div>\n\n   <div class="form-group col-sm-12" v-if="section == 1">\n      <a style="padding-top: 30px" v-bind:href="link.anchor">\n        <h4 class="color-red">{{link.text}}</h4> <i class="ion-chevron-down color-red"></i>\n      </a>\n    </div>\n\n  </form>\n\n  </div>\n\t'
		};
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toDate = __webpack_require__(15);

	var _toDate2 = _interopRequireDefault(_toDate);

	var _toFloat = __webpack_require__(17);

	var _toFloat2 = _interopRequireDefault(_toFloat);

	var _toInt = __webpack_require__(18);

	var _toInt2 = _interopRequireDefault(_toInt);

	var _toBoolean = __webpack_require__(19);

	var _toBoolean2 = _interopRequireDefault(_toBoolean);

	var _equals = __webpack_require__(20);

	var _equals2 = _interopRequireDefault(_equals);

	var _contains = __webpack_require__(21);

	var _contains2 = _interopRequireDefault(_contains);

	var _matches = __webpack_require__(23);

	var _matches2 = _interopRequireDefault(_matches);

	var _isEmail = __webpack_require__(24);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _isURL = __webpack_require__(28);

	var _isURL2 = _interopRequireDefault(_isURL);

	var _isMACAddress = __webpack_require__(30);

	var _isMACAddress2 = _interopRequireDefault(_isMACAddress);

	var _isIP = __webpack_require__(29);

	var _isIP2 = _interopRequireDefault(_isIP);

	var _isFQDN = __webpack_require__(27);

	var _isFQDN2 = _interopRequireDefault(_isFQDN);

	var _isBoolean = __webpack_require__(31);

	var _isBoolean2 = _interopRequireDefault(_isBoolean);

	var _isAlpha = __webpack_require__(32);

	var _isAlpha2 = _interopRequireDefault(_isAlpha);

	var _isAlphanumeric = __webpack_require__(34);

	var _isAlphanumeric2 = _interopRequireDefault(_isAlphanumeric);

	var _isNumeric = __webpack_require__(35);

	var _isNumeric2 = _interopRequireDefault(_isNumeric);

	var _isLowercase = __webpack_require__(36);

	var _isLowercase2 = _interopRequireDefault(_isLowercase);

	var _isUppercase = __webpack_require__(37);

	var _isUppercase2 = _interopRequireDefault(_isUppercase);

	var _isAscii = __webpack_require__(38);

	var _isAscii2 = _interopRequireDefault(_isAscii);

	var _isFullWidth = __webpack_require__(39);

	var _isFullWidth2 = _interopRequireDefault(_isFullWidth);

	var _isHalfWidth = __webpack_require__(40);

	var _isHalfWidth2 = _interopRequireDefault(_isHalfWidth);

	var _isVariableWidth = __webpack_require__(41);

	var _isVariableWidth2 = _interopRequireDefault(_isVariableWidth);

	var _isMultibyte = __webpack_require__(42);

	var _isMultibyte2 = _interopRequireDefault(_isMultibyte);

	var _isSurrogatePair = __webpack_require__(43);

	var _isSurrogatePair2 = _interopRequireDefault(_isSurrogatePair);

	var _isInt = __webpack_require__(44);

	var _isInt2 = _interopRequireDefault(_isInt);

	var _isFloat = __webpack_require__(45);

	var _isFloat2 = _interopRequireDefault(_isFloat);

	var _isDecimal = __webpack_require__(46);

	var _isDecimal2 = _interopRequireDefault(_isDecimal);

	var _isHexadecimal = __webpack_require__(47);

	var _isHexadecimal2 = _interopRequireDefault(_isHexadecimal);

	var _isDivisibleBy = __webpack_require__(48);

	var _isDivisibleBy2 = _interopRequireDefault(_isDivisibleBy);

	var _isHexColor = __webpack_require__(49);

	var _isHexColor2 = _interopRequireDefault(_isHexColor);

	var _isMD = __webpack_require__(50);

	var _isMD2 = _interopRequireDefault(_isMD);

	var _isJSON = __webpack_require__(51);

	var _isJSON2 = _interopRequireDefault(_isJSON);

	var _isEmpty = __webpack_require__(52);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	var _isLength = __webpack_require__(53);

	var _isLength2 = _interopRequireDefault(_isLength);

	var _isByteLength = __webpack_require__(26);

	var _isByteLength2 = _interopRequireDefault(_isByteLength);

	var _isUUID = __webpack_require__(54);

	var _isUUID2 = _interopRequireDefault(_isUUID);

	var _isMongoId = __webpack_require__(55);

	var _isMongoId2 = _interopRequireDefault(_isMongoId);

	var _isDate = __webpack_require__(56);

	var _isDate2 = _interopRequireDefault(_isDate);

	var _isAfter = __webpack_require__(58);

	var _isAfter2 = _interopRequireDefault(_isAfter);

	var _isBefore = __webpack_require__(59);

	var _isBefore2 = _interopRequireDefault(_isBefore);

	var _isIn = __webpack_require__(60);

	var _isIn2 = _interopRequireDefault(_isIn);

	var _isCreditCard = __webpack_require__(61);

	var _isCreditCard2 = _interopRequireDefault(_isCreditCard);

	var _isISIN = __webpack_require__(62);

	var _isISIN2 = _interopRequireDefault(_isISIN);

	var _isISBN = __webpack_require__(63);

	var _isISBN2 = _interopRequireDefault(_isISBN);

	var _isISSN = __webpack_require__(64);

	var _isISSN2 = _interopRequireDefault(_isISSN);

	var _isMobilePhone = __webpack_require__(65);

	var _isMobilePhone2 = _interopRequireDefault(_isMobilePhone);

	var _isCurrency = __webpack_require__(66);

	var _isCurrency2 = _interopRequireDefault(_isCurrency);

	var _isISO = __webpack_require__(57);

	var _isISO2 = _interopRequireDefault(_isISO);

	var _isBase = __webpack_require__(67);

	var _isBase2 = _interopRequireDefault(_isBase);

	var _isDataURI = __webpack_require__(68);

	var _isDataURI2 = _interopRequireDefault(_isDataURI);

	var _ltrim = __webpack_require__(69);

	var _ltrim2 = _interopRequireDefault(_ltrim);

	var _rtrim = __webpack_require__(70);

	var _rtrim2 = _interopRequireDefault(_rtrim);

	var _trim = __webpack_require__(71);

	var _trim2 = _interopRequireDefault(_trim);

	var _escape = __webpack_require__(72);

	var _escape2 = _interopRequireDefault(_escape);

	var _unescape = __webpack_require__(73);

	var _unescape2 = _interopRequireDefault(_unescape);

	var _stripLow = __webpack_require__(74);

	var _stripLow2 = _interopRequireDefault(_stripLow);

	var _whitelist = __webpack_require__(76);

	var _whitelist2 = _interopRequireDefault(_whitelist);

	var _blacklist = __webpack_require__(75);

	var _blacklist2 = _interopRequireDefault(_blacklist);

	var _isWhitelisted = __webpack_require__(77);

	var _isWhitelisted2 = _interopRequireDefault(_isWhitelisted);

	var _normalizeEmail = __webpack_require__(78);

	var _normalizeEmail2 = _interopRequireDefault(_normalizeEmail);

	var _toString = __webpack_require__(22);

	var _toString2 = _interopRequireDefault(_toString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var version = '6.1.0';

	var validator = {
	  version: version,
	  toDate: _toDate2.default,
	  toFloat: _toFloat2.default, toInt: _toInt2.default,
	  toBoolean: _toBoolean2.default,
	  equals: _equals2.default, contains: _contains2.default, matches: _matches2.default,
	  isEmail: _isEmail2.default, isURL: _isURL2.default, isMACAddress: _isMACAddress2.default, isIP: _isIP2.default, isFQDN: _isFQDN2.default,
	  isBoolean: _isBoolean2.default,
	  isAlpha: _isAlpha2.default, isAlphanumeric: _isAlphanumeric2.default, isNumeric: _isNumeric2.default, isLowercase: _isLowercase2.default, isUppercase: _isUppercase2.default,
	  isAscii: _isAscii2.default, isFullWidth: _isFullWidth2.default, isHalfWidth: _isHalfWidth2.default, isVariableWidth: _isVariableWidth2.default,
	  isMultibyte: _isMultibyte2.default, isSurrogatePair: _isSurrogatePair2.default,
	  isInt: _isInt2.default, isFloat: _isFloat2.default, isDecimal: _isDecimal2.default, isHexadecimal: _isHexadecimal2.default, isDivisibleBy: _isDivisibleBy2.default,
	  isHexColor: _isHexColor2.default,
	  isMD5: _isMD2.default,
	  isJSON: _isJSON2.default,
	  isEmpty: _isEmpty2.default,
	  isLength: _isLength2.default, isByteLength: _isByteLength2.default,
	  isUUID: _isUUID2.default, isMongoId: _isMongoId2.default,
	  isDate: _isDate2.default, isAfter: _isAfter2.default, isBefore: _isBefore2.default,
	  isIn: _isIn2.default,
	  isCreditCard: _isCreditCard2.default,
	  isISIN: _isISIN2.default, isISBN: _isISBN2.default, isISSN: _isISSN2.default,
	  isMobilePhone: _isMobilePhone2.default,
	  isCurrency: _isCurrency2.default,
	  isISO8601: _isISO2.default,
	  isBase64: _isBase2.default, isDataURI: _isDataURI2.default,
	  ltrim: _ltrim2.default, rtrim: _rtrim2.default, trim: _trim2.default,
	  escape: _escape2.default, unescape: _unescape2.default, stripLow: _stripLow2.default,
	  whitelist: _whitelist2.default, blacklist: _blacklist2.default,
	  isWhitelisted: _isWhitelisted2.default,
	  normalizeEmail: _normalizeEmail2.default,
	  toString: _toString2.default
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toDate;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toDate(date) {
	  (0, _assertString2.default)(date);
	  date = Date.parse(date);
	  return !isNaN(date) ? new Date(date) : null;
	}
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = assertString;
	function assertString(input) {
	  if (typeof input !== 'string') {
	    throw new TypeError('This library (validator.js) validates strings only');
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toFloat;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toFloat(str) {
	  (0, _assertString2.default)(str);
	  return parseFloat(str);
	}
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toInt;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toInt(str, radix) {
	  (0, _assertString2.default)(str);
	  return parseInt(str, radix || 10);
	}
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toBoolean;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toBoolean(str, strict) {
	  (0, _assertString2.default)(str);
	  if (strict) {
	    return str === '1' || str === 'true';
	  }
	  return str !== '0' && str !== 'false' && str !== '';
	}
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = equals;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function equals(str, comparison) {
	  (0, _assertString2.default)(str);
	  return str === comparison;
	}
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = contains;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toString = __webpack_require__(22);

	var _toString2 = _interopRequireDefault(_toString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function contains(str, elem) {
	  (0, _assertString2.default)(str);
	  return str.indexOf((0, _toString2.default)(elem)) >= 0;
	}
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = toString;
	function toString(input) {
	  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input !== null) {
	    if (typeof input.toString === 'function') {
	      input = input.toString();
	    } else {
	      input = '[object Object]';
	    }
	  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
	    input = '';
	  }
	  return String(input);
	}
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = matches;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function matches(str, pattern, modifiers) {
	  (0, _assertString2.default)(str);
	  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
	    pattern = new RegExp(pattern, modifiers);
	  }
	  return pattern.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEmail;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _merge = __webpack_require__(25);

	var _merge2 = _interopRequireDefault(_merge);

	var _isByteLength = __webpack_require__(26);

	var _isByteLength2 = _interopRequireDefault(_isByteLength);

	var _isFQDN = __webpack_require__(27);

	var _isFQDN2 = _interopRequireDefault(_isFQDN);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_email_options = {
	  allow_display_name: false,
	  allow_utf8_local_part: true,
	  require_tld: true
	};

	/* eslint-disable max-len */
	/* eslint-disable no-control-regex */
	var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
	var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
	var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
	var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
	var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
	/* eslint-enable max-len */
	/* eslint-enable no-control-regex */

	function isEmail(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_email_options);

	  if (options.allow_display_name) {
	    var display_email = str.match(displayName);
	    if (display_email) {
	      str = display_email[1];
	    }
	  }

	  var parts = str.split('@');
	  var domain = parts.pop();
	  var user = parts.join('@');

	  var lower_domain = domain.toLowerCase();
	  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
	    user = user.replace(/\./g, '').toLowerCase();
	  }

	  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 256 })) {
	    return false;
	  }

	  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
	    return false;
	  }

	  if (user[0] === '"') {
	    user = user.slice(1, user.length - 1);
	    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
	  }

	  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

	  var user_parts = user.split('.');
	  for (var i = 0; i < user_parts.length; i++) {
	    if (!pattern.test(user_parts[i])) {
	      return false;
	    }
	  }

	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = merge;
	function merge() {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var defaults = arguments[1];

	  for (var key in defaults) {
	    if (typeof obj[key] === 'undefined') {
	      obj[key] = defaults[key];
	    }
	  }
	  return obj;
	}
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = isByteLength;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable prefer-rest-params */
	function isByteLength(str, options) {
	  (0, _assertString2.default)(str);
	  var min = void 0;
	  var max = void 0;
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    min = options.min || 0;
	    max = options.max;
	  } else {
	    // backwards compatibility: isByteLength(str, min [, max])
	    min = arguments[1];
	    max = arguments[2];
	  }
	  var len = encodeURI(str).split(/%..|./).length - 1;
	  return len >= min && (typeof max === 'undefined' || len <= max);
	}
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFDQN;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _merge = __webpack_require__(25);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_fqdn_options = {
	  require_tld: true,
	  allow_underscores: false,
	  allow_trailing_dot: false
	};

	function isFDQN(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_fqdn_options);

	  /* Remove the optional trailing dot before checking validity */
	  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
	    str = str.substring(0, str.length - 1);
	  }
	  var parts = str.split('.');
	  if (options.require_tld) {
	    var tld = parts.pop();
	    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
	      return false;
	    }
	  }
	  for (var part, i = 0; i < parts.length; i++) {
	    part = parts[i];
	    if (options.allow_underscores) {
	      part = part.replace(/_/g, '');
	    }
	    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
	      return false;
	    }
	    if (/[\uff01-\uff5e]/.test(part)) {
	      // disallow full-width chars
	      return false;
	    }
	    if (part[0] === '-' || part[part.length - 1] === '-') {
	      return false;
	    }
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isURL;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isFQDN = __webpack_require__(27);

	var _isFQDN2 = _interopRequireDefault(_isFQDN);

	var _isIP = __webpack_require__(29);

	var _isIP2 = _interopRequireDefault(_isIP);

	var _merge = __webpack_require__(25);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_url_options = {
	  protocols: ['http', 'https', 'ftp'],
	  require_tld: true,
	  require_protocol: false,
	  require_host: true,
	  require_valid_protocol: true,
	  allow_underscores: false,
	  allow_trailing_dot: false,
	  allow_protocol_relative_urls: false
	};

	var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

	function isRegExp(obj) {
	  return Object.prototype.toString.call(obj) === '[object RegExp]';
	}

	function checkHost(host, matches) {
	  for (var i = 0; i < matches.length; i++) {
	    var match = matches[i];
	    if (host === match || isRegExp(match) && match.test(host)) {
	      return true;
	    }
	  }
	  return false;
	}

	function isURL(url, options) {
	  (0, _assertString2.default)(url);
	  if (!url || url.length >= 2083 || /\s/.test(url)) {
	    return false;
	  }
	  if (url.indexOf('mailto:') === 0) {
	    return false;
	  }
	  options = (0, _merge2.default)(options, default_url_options);
	  var protocol = void 0,
	      auth = void 0,
	      host = void 0,
	      hostname = void 0,
	      port = void 0,
	      port_str = void 0,
	      split = void 0,
	      ipv6 = void 0;

	  split = url.split('#');
	  url = split.shift();

	  split = url.split('?');
	  url = split.shift();

	  split = url.split('://');
	  if (split.length > 1) {
	    protocol = split.shift();
	    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
	      return false;
	    }
	  } else if (options.require_protocol) {
	    return false;
	  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
	    split[0] = url.substr(2);
	  }
	  url = split.join('://');

	  split = url.split('/');
	  url = split.shift();

	  if (url === '' && !options.require_host) {
	    return true;
	  }

	  split = url.split('@');
	  if (split.length > 1) {
	    auth = split.shift();
	    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
	      return false;
	    }
	  }
	  hostname = split.join('@');

	  port_str = ipv6 = null;
	  var ipv6_match = hostname.match(wrapped_ipv6);
	  if (ipv6_match) {
	    host = '';
	    ipv6 = ipv6_match[1];
	    port_str = ipv6_match[2] || null;
	  } else {
	    split = hostname.split(':');
	    host = split.shift();
	    if (split.length) {
	      port_str = split.join(':');
	    }
	  }

	  if (port_str !== null) {
	    port = parseInt(port_str, 10);
	    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
	      return false;
	    }
	  }

	  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6)) && host !== 'localhost') {
	    return false;
	  }

	  host = host || ipv6;

	  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
	    return false;
	  }
	  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
	    return false;
	  }

	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isIP;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipv6Block = /^[0-9A-F]{1,4}$/i;

	function isIP(str) {
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  (0, _assertString2.default)(str);
	  version = String(version);
	  if (!version) {
	    return isIP(str, 4) || isIP(str, 6);
	  } else if (version === '4') {
	    if (!ipv4Maybe.test(str)) {
	      return false;
	    }
	    var parts = str.split('.').sort(function (a, b) {
	      return a - b;
	    });
	    return parts[3] <= 255;
	  } else if (version === '6') {
	    var blocks = str.split(':');
	    var foundOmissionBlock = false; // marker to indicate ::

	    // At least some OS accept the last 32 bits of an IPv6 address
	    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
	    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
	    // and '::a.b.c.d' is deprecated, but also valid.
	    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
	    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

	    if (blocks.length > expectedNumberOfBlocks) {
	      return false;
	    }
	    // initial or final ::
	    if (str === '::') {
	      return true;
	    } else if (str.substr(0, 2) === '::') {
	      blocks.shift();
	      blocks.shift();
	      foundOmissionBlock = true;
	    } else if (str.substr(str.length - 2) === '::') {
	      blocks.pop();
	      blocks.pop();
	      foundOmissionBlock = true;
	    }

	    for (var i = 0; i < blocks.length; ++i) {
	      // test for a :: which can not be at the string start/end
	      // since those cases have been handled above
	      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
	        if (foundOmissionBlock) {
	          return false; // multiple :: in address
	        }
	        foundOmissionBlock = true;
	      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
	        // it has been checked before that the last
	        // block is a valid IPv4 address
	      } else if (!ipv6Block.test(blocks[i])) {
	        return false;
	      }
	    }
	    if (foundOmissionBlock) {
	      return blocks.length >= 1;
	    }
	    return blocks.length === expectedNumberOfBlocks;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMACAddress;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;

	function isMACAddress(str) {
	  (0, _assertString2.default)(str);
	  return macAddress.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBoolean;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isBoolean(str) {
	  (0, _assertString2.default)(str);
	  return ['true', 'false', '1', '0'].indexOf(str) >= 0;
	}
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAlpha;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _alpha = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAlpha(str) {
	  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';

	  (0, _assertString2.default)(str);
	  if (locale in _alpha.alpha) {
	    return _alpha.alpha[locale].test(str);
	  }
	  throw new Error('Invalid locale \'' + locale + '\'');
	}
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var alpha = exports.alpha = {
	  'en-US': /^[A-Z]+$/i,
	  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
	  'de-DE': /^[A-ZÄÖÜß]+$/i,
	  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
	  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
	  'nl-NL': /^[A-ZÉËÏÓÖÜ]+$/i,
	  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
	  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
	  'pt-PT': /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
	  'ru-RU': /^[А-ЯЁ]+$/i,
	  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
	  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
	  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
	  'uk-UA': /^[А-ЯЄIЇҐ]+$/i,
	  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
	};

	var alphanumeric = exports.alphanumeric = {
	  'en-US': /^[0-9A-Z]+$/i,
	  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
	  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
	  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
	  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
	  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
	  'nl-NL': /^[0-9A-ZÉËÏÓÖÜ]+$/i,
	  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
	  'pt-PT': /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
	  'ru-RU': /^[0-9А-ЯЁ]+$/i,
	  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
	  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
	  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
	  'uk-UA': /^[0-9А-ЯЄIЇҐ]+$/i,
	  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
	};

	var englishLocales = exports.englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];

	for (var locale, i = 0; i < englishLocales.length; i++) {
	  locale = 'en-' + englishLocales[i];
	  alpha[locale] = alpha['en-US'];
	  alphanumeric[locale] = alphanumeric['en-US'];
	}

	alpha['pt-BR'] = alpha['pt-PT'];
	alphanumeric['pt-BR'] = alphanumeric['pt-PT'];

	// Source: http://www.localeplanet.com/java/
	var arabicLocales = exports.arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];

	for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
	  _locale = 'ar-' + arabicLocales[_i];
	  alpha[_locale] = alpha.ar;
	  alphanumeric[_locale] = alphanumeric.ar;
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAlphanumeric;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _alpha = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAlphanumeric(str) {
	  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';

	  (0, _assertString2.default)(str);
	  if (locale in _alpha.alphanumeric) {
	    return _alpha.alphanumeric[locale].test(str);
	  }
	  throw new Error('Invalid locale \'' + locale + '\'');
	}
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isNumeric;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var numeric = /^[-+]?[0-9]+$/;

	function isNumeric(str) {
	  (0, _assertString2.default)(str);
	  return numeric.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isLowercase;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isLowercase(str) {
	  (0, _assertString2.default)(str);
	  return str === str.toLowerCase();
	}
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isUppercase;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isUppercase(str) {
	  (0, _assertString2.default)(str);
	  return str === str.toUpperCase();
	}
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAscii;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-control-regex */
	var ascii = /^[\x00-\x7F]+$/;
	/* eslint-enable no-control-regex */

	function isAscii(str) {
	  (0, _assertString2.default)(str);
	  return ascii.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fullWidth = undefined;
	exports.default = isFullWidth;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fullWidth = exports.fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

	function isFullWidth(str) {
	  (0, _assertString2.default)(str);
	  return fullWidth.test(str);
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.halfWidth = undefined;
	exports.default = isHalfWidth;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var halfWidth = exports.halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

	function isHalfWidth(str) {
	  (0, _assertString2.default)(str);
	  return halfWidth.test(str);
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isVariableWidth;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isFullWidth = __webpack_require__(39);

	var _isHalfWidth = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isVariableWidth(str) {
	  (0, _assertString2.default)(str);
	  return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMultibyte;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-control-regex */
	var multibyte = /[^\x00-\x7F]/;
	/* eslint-enable no-control-regex */

	function isMultibyte(str) {
	  (0, _assertString2.default)(str);
	  return multibyte.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isSurrogatePair;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

	function isSurrogatePair(str) {
	  (0, _assertString2.default)(str);
	  return surrogatePair.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isInt;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
	var intLeadingZeroes = /^[-+]?[0-9]+$/;

	function isInt(str, options) {
	  (0, _assertString2.default)(str);
	  options = options || {};

	  // Get the regex to use for testing, based on whether
	  // leading zeroes are allowed or not.
	  var regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes;

	  // Check min/max
	  var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
	  var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;

	  return regex.test(str) && minCheckPassed && maxCheckPassed;
	}
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isFloat;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;

	function isFloat(str, options) {
	  (0, _assertString2.default)(str);
	  options = options || {};
	  if (str === '' || str === '.') {
	    return false;
	  }
	  return float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max) && (!options.hasOwnProperty('lt') || str < options.lt) && (!options.hasOwnProperty('gt') || str > options.gt);
	}
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDecimal;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/;

	function isDecimal(str) {
	  (0, _assertString2.default)(str);
	  return str !== '' && decimal.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isHexadecimal;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hexadecimal = /^[0-9A-F]+$/i;

	function isHexadecimal(str) {
	  (0, _assertString2.default)(str);
	  return hexadecimal.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDivisibleBy;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toFloat = __webpack_require__(17);

	var _toFloat2 = _interopRequireDefault(_toFloat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isDivisibleBy(str, num) {
	  (0, _assertString2.default)(str);
	  return (0, _toFloat2.default)(str) % parseInt(num, 10) === 0;
	}
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isHexColor;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

	function isHexColor(str) {
	  (0, _assertString2.default)(str);
	  return hexcolor.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMD5;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var md5 = /^[a-f0-9]{32}$/;

	function isMD5(str) {
	  (0, _assertString2.default)(str);
	  return md5.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = isJSON;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isJSON(str) {
	  (0, _assertString2.default)(str);
	  try {
	    var obj = JSON.parse(str);
	    return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	  } catch (e) {/* ignore */}
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEmpty;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isEmpty(str) {
	  (0, _assertString2.default)(str);
	  return str.length === 0;
	}
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = isLength;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable prefer-rest-params */
	function isLength(str, options) {
	  (0, _assertString2.default)(str);
	  var min = void 0;
	  var max = void 0;
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    min = options.min || 0;
	    max = options.max;
	  } else {
	    // backwards compatibility: isLength(str, min [, max])
	    min = arguments[1];
	    max = arguments[2];
	  }
	  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
	  var len = str.length - surrogatePairs.length;
	  return len >= min && (typeof max === 'undefined' || len <= max);
	}
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isUUID;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var uuid = {
	  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
	  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
	  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
	  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
	};

	function isUUID(str) {
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';

	  (0, _assertString2.default)(str);
	  var pattern = uuid[version];
	  return pattern && pattern.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMongoId;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isHexadecimal = __webpack_require__(47);

	var _isHexadecimal2 = _interopRequireDefault(_isHexadecimal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isMongoId(str) {
	  (0, _assertString2.default)(str);
	  return (0, _isHexadecimal2.default)(str) && str.length === 24;
	}
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDate;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _isISO = __webpack_require__(57);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getTimezoneOffset(str) {
	  var iso8601Parts = str.match(_isISO.iso8601);
	  var timezone = void 0,
	      sign = void 0,
	      hours = void 0,
	      minutes = void 0;
	  if (!iso8601Parts) {
	    str = str.toLowerCase();
	    timezone = str.match(/(?:\s|gmt\s*)(-|\+)(\d{1,4})(\s|$)/);
	    if (!timezone) {
	      return str.indexOf('gmt') !== -1 ? 0 : null;
	    }
	    sign = timezone[1];
	    var offset = timezone[2];
	    if (offset.length === 3) {
	      offset = '0' + offset;
	    }
	    if (offset.length <= 2) {
	      hours = 0;
	      minutes = parseInt(offset, 10);
	    } else {
	      hours = parseInt(offset.slice(0, 2), 10);
	      minutes = parseInt(offset.slice(2, 4), 10);
	    }
	  } else {
	    timezone = iso8601Parts[21];
	    if (!timezone) {
	      // if no hour/minute was provided, the date is GMT
	      return !iso8601Parts[12] ? 0 : null;
	    }
	    if (timezone === 'z' || timezone === 'Z') {
	      return 0;
	    }
	    sign = iso8601Parts[22];
	    if (timezone.indexOf(':') !== -1) {
	      hours = parseInt(iso8601Parts[23], 10);
	      minutes = parseInt(iso8601Parts[24], 10);
	    } else {
	      hours = 0;
	      minutes = parseInt(iso8601Parts[23], 10);
	    }
	  }
	  return (hours * 60 + minutes) * (sign === '-' ? 1 : -1);
	}

	function isDate(str) {
	  (0, _assertString2.default)(str);
	  var normalizedDate = new Date(Date.parse(str));
	  if (isNaN(normalizedDate)) {
	    return false;
	  }

	  // normalizedDate is in the user's timezone. Apply the input
	  // timezone offset to the date so that the year and day match
	  // the input
	  var timezoneOffset = getTimezoneOffset(str);
	  if (timezoneOffset !== null) {
	    var timezoneDifference = normalizedDate.getTimezoneOffset() - timezoneOffset;
	    normalizedDate = new Date(normalizedDate.getTime() + 60000 * timezoneDifference);
	  }

	  var day = String(normalizedDate.getDate());
	  var dayOrYear = void 0,
	      dayOrYearMatches = void 0,
	      year = void 0;
	  // check for valid double digits that could be late days
	  // check for all matches since a string like '12/23' is a valid date
	  // ignore everything with nearby colons
	  dayOrYearMatches = str.match(/(^|[^:\d])[23]\d([^T:\d]|$)/g);
	  if (!dayOrYearMatches) {
	    return true;
	  }
	  dayOrYear = dayOrYearMatches.map(function (digitString) {
	    return digitString.match(/\d+/g)[0];
	  }).join('/');

	  year = String(normalizedDate.getFullYear()).slice(-2);
	  if (dayOrYear === day || dayOrYear === year) {
	    return true;
	  } else if (dayOrYear === '' + day / year || dayOrYear === '' + year / day) {
	    return true;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iso8601 = undefined;

	exports.default = function (str) {
	  (0, _assertString2.default)(str);
	  return iso8601.test(str);
	};

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	// from http://goo.gl/0ejHHW
	var iso8601 = exports.iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	/* eslint-enable max-len */

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isAfter;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toDate = __webpack_require__(15);

	var _toDate2 = _interopRequireDefault(_toDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAfter(str) {
	  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());

	  (0, _assertString2.default)(str);
	  var comparison = (0, _toDate2.default)(date);
	  var original = (0, _toDate2.default)(str);
	  return !!(original && comparison && original > comparison);
	}
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBefore;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toDate = __webpack_require__(15);

	var _toDate2 = _interopRequireDefault(_toDate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isBefore(str) {
	  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());

	  (0, _assertString2.default)(str);
	  var comparison = (0, _toDate2.default)(date);
	  var original = (0, _toDate2.default)(str);
	  return !!(original && comparison && original < comparison);
	}
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = isIn;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _toString = __webpack_require__(22);

	var _toString2 = _interopRequireDefault(_toString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isIn(str, options) {
	  (0, _assertString2.default)(str);
	  var i = void 0;
	  if (Object.prototype.toString.call(options) === '[object Array]') {
	    var array = [];
	    for (i in options) {
	      if ({}.hasOwnProperty.call(options, i)) {
	        array[i] = (0, _toString2.default)(options[i]);
	      }
	    }
	    return array.indexOf(str) >= 0;
	  } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    return options.hasOwnProperty(str);
	  } else if (options && typeof options.indexOf === 'function') {
	    return options.indexOf(str) >= 0;
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isCreditCard;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})|62[0-9]{14}$/;
	/* eslint-enable max-len */

	function isCreditCard(str) {
	  (0, _assertString2.default)(str);
	  var sanitized = str.replace(/[^0-9]+/g, '');
	  if (!creditCard.test(sanitized)) {
	    return false;
	  }
	  var sum = 0;
	  var digit = void 0;
	  var tmpNum = void 0;
	  var shouldDouble = void 0;
	  for (var i = sanitized.length - 1; i >= 0; i--) {
	    digit = sanitized.substring(i, i + 1);
	    tmpNum = parseInt(digit, 10);
	    if (shouldDouble) {
	      tmpNum *= 2;
	      if (tmpNum >= 10) {
	        sum += tmpNum % 10 + 1;
	      } else {
	        sum += tmpNum;
	      }
	    } else {
	      sum += tmpNum;
	    }
	    shouldDouble = !shouldDouble;
	  }
	  return !!(sum % 10 === 0 ? sanitized : false);
	}
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isISIN;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

	function isISIN(str) {
	  (0, _assertString2.default)(str);
	  if (!isin.test(str)) {
	    return false;
	  }

	  var checksumStr = str.replace(/[A-Z]/g, function (character) {
	    return parseInt(character, 36);
	  });

	  var sum = 0;
	  var digit = void 0;
	  var tmpNum = void 0;
	  var shouldDouble = true;
	  for (var i = checksumStr.length - 2; i >= 0; i--) {
	    digit = checksumStr.substring(i, i + 1);
	    tmpNum = parseInt(digit, 10);
	    if (shouldDouble) {
	      tmpNum *= 2;
	      if (tmpNum >= 10) {
	        sum += tmpNum + 1;
	      } else {
	        sum += tmpNum;
	      }
	    } else {
	      sum += tmpNum;
	    }
	    shouldDouble = !shouldDouble;
	  }

	  return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
	}
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isISBN;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
	var isbn13Maybe = /^(?:[0-9]{13})$/;
	var factor = [1, 3];

	function isISBN(str) {
	  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  (0, _assertString2.default)(str);
	  version = String(version);
	  if (!version) {
	    return isISBN(str, 10) || isISBN(str, 13);
	  }
	  var sanitized = str.replace(/[\s-]+/g, '');
	  var checksum = 0;
	  var i = void 0;
	  if (version === '10') {
	    if (!isbn10Maybe.test(sanitized)) {
	      return false;
	    }
	    for (i = 0; i < 9; i++) {
	      checksum += (i + 1) * sanitized.charAt(i);
	    }
	    if (sanitized.charAt(9) === 'X') {
	      checksum += 10 * 10;
	    } else {
	      checksum += 10 * sanitized.charAt(9);
	    }
	    if (checksum % 11 === 0) {
	      return !!sanitized;
	    }
	  } else if (version === '13') {
	    if (!isbn13Maybe.test(sanitized)) {
	      return false;
	    }
	    for (i = 0; i < 12; i++) {
	      checksum += factor[i % 2] * sanitized.charAt(i);
	    }
	    if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
	      return !!sanitized;
	    }
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isISSN;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var issn = '^\\d{4}-?\\d{3}[\\dX]$';

	function isISSN(str) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  (0, _assertString2.default)(str);
	  var testIssn = issn;
	  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
	  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');
	  if (!testIssn.test(str)) {
	    return false;
	  }
	  var issnDigits = str.replace('-', '');
	  var position = 8;
	  var checksum = 0;
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = issnDigits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var digit = _step.value;

	      var digitValue = digit.toUpperCase() === 'X' ? 10 : +digit;
	      checksum += digitValue * position;
	      --position;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return checksum % 11 === 0;
	}
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isMobilePhone;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	var phones = {
	  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
	  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
	  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
	  'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
	  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
	  'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
	  'da-DK': /^(\+?45)?(\d{8})$/,
	  'el-GR': /^(\+?30)?(69\d{8})$/,
	  'en-AU': /^(\+?61|0)4\d{8}$/,
	  'en-GB': /^(\+?44|0)7\d{9}$/,
	  'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
	  'en-IN': /^(\+?91|0)?[789]\d{9}$/,
	  'en-NZ': /^(\+?64|0)2\d{7,9}$/,
	  'en-ZA': /^(\+?27|0)\d{9}$/,
	  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
	  'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
	  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
	  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
	  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
	  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
	  'ja-JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
	  'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
	  'nb-NO': /^(\+?47)?[49]\d{7}$/,
	  'nl-BE': /^(\+?32|0)4?\d{8}$/,
	  'nn-NO': /^(\+?47)?[49]\d{7}$/,
	  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
	  'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
	  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
	  'ru-RU': /^(\+?7|8)?9\d{9}$/,
	  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
	  'tr-TR': /^(\+?90|0)?5\d{9}$/,
	  'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
	  'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
	  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
	};
	/* eslint-enable max-len */

	// aliases
	phones['en-CA'] = phones['en-US'];
	phones['fr-BE'] = phones['nl-BE'];

	function isMobilePhone(str, locale) {
	  (0, _assertString2.default)(str);
	  if (locale in phones) {
	    return phones[locale].test(str);
	  }
	  return false;
	}
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isCurrency;

	var _merge = __webpack_require__(25);

	var _merge2 = _interopRequireDefault(_merge);

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function currencyRegex(options) {
	  var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?'),
	      negative = '-?',
	      whole_dollar_amount_without_sep = '[1-9]\\d*',
	      whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*',
	      valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
	      whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?',
	      decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
	  var pattern = whole_dollar_amount + decimal_amount;

	  // default is negative sign before symbol, but there are two other options (besides parens)
	  if (options.allow_negatives && !options.parens_for_negatives) {
	    if (options.negative_sign_after_digits) {
	      pattern += negative;
	    } else if (options.negative_sign_before_digits) {
	      pattern = negative + pattern;
	    }
	  }

	  // South African Rand, for example, uses R 123 (space) and R-123 (no space)
	  if (options.allow_negative_sign_placeholder) {
	    pattern = '( (?!\\-))?' + pattern;
	  } else if (options.allow_space_after_symbol) {
	    pattern = ' ?' + pattern;
	  } else if (options.allow_space_after_digits) {
	    pattern += '( (?!$))?';
	  }

	  if (options.symbol_after_digits) {
	    pattern += symbol;
	  } else {
	    pattern = symbol + pattern;
	  }

	  if (options.allow_negatives) {
	    if (options.parens_for_negatives) {
	      pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
	    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
	      pattern = negative + pattern;
	    }
	  }

	  /* eslint-disable prefer-template */
	  return new RegExp('^' +
	  // ensure there's a dollar and/or decimal amount, and that
	  // it doesn't start with a space or a negative sign followed by a space
	  '(?!-? )(?=.*\\d)' + pattern + '$');
	  /* eslint-enable prefer-template */
	}

	var default_currency_options = {
	  symbol: '$',
	  require_symbol: false,
	  allow_space_after_symbol: false,
	  symbol_after_digits: false,
	  allow_negatives: true,
	  parens_for_negatives: false,
	  negative_sign_before_digits: false,
	  negative_sign_after_digits: false,
	  allow_negative_sign_placeholder: false,
	  thousands_separator: ',',
	  decimal_separator: '.',
	  allow_space_after_digits: false
	};

	function isCurrency(str, options) {
	  (0, _assertString2.default)(str);
	  options = (0, _merge2.default)(options, default_currency_options);
	  return currencyRegex(options).test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isBase64;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var notBase64 = /[^A-Z0-9+\/=]/i;

	function isBase64(str) {
	  (0, _assertString2.default)(str);
	  var len = str.length;
	  if (!len || len % 4 !== 0 || notBase64.test(str)) {
	    return false;
	  }
	  var firstPaddingChar = str.indexOf('=');
	  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
	}
	module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isDataURI;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dataURI = /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9!\$&',\(\)\*\+,;=\-\._~:@\/\?%\s]*\s*$/i; // eslint-disable-line max-len

	function isDataURI(str) {
	  (0, _assertString2.default)(str);
	  return dataURI.test(str);
	}
	module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ltrim;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function ltrim(str, chars) {
	  (0, _assertString2.default)(str);
	  var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
	  return str.replace(pattern, '');
	}
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rtrim;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function rtrim(str, chars) {
	  (0, _assertString2.default)(str);
	  var pattern = chars ? new RegExp('[' + chars + ']') : /\s/;

	  var idx = str.length - 1;
	  while (idx >= 0 && pattern.test(str[idx])) {
	    idx--;
	  }

	  return idx < str.length ? str.substr(0, idx + 1) : str;
	}
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = trim;

	var _rtrim = __webpack_require__(70);

	var _rtrim2 = _interopRequireDefault(_rtrim);

	var _ltrim = __webpack_require__(69);

	var _ltrim2 = _interopRequireDefault(_ltrim);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function trim(str, chars) {
	  return (0, _rtrim2.default)((0, _ltrim2.default)(str, chars), chars);
	}
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = escape;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function escape(str) {
	      (0, _assertString2.default)(str);
	      return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
	}
	module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.default = unescape;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function unescape(str) {
	      (0, _assertString2.default)(str);
	      return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#96;/g, '`');
	}
	module.exports = exports['default'];

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stripLow;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	var _blacklist = __webpack_require__(75);

	var _blacklist2 = _interopRequireDefault(_blacklist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function stripLow(str, keep_new_lines) {
	  (0, _assertString2.default)(str);
	  var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
	  return (0, _blacklist2.default)(str, chars);
	}
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = blacklist;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function blacklist(str, chars) {
	  (0, _assertString2.default)(str);
	  return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
	}
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = whitelist;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function whitelist(str, chars) {
	  (0, _assertString2.default)(str);
	  return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
	}
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isWhitelisted;

	var _assertString = __webpack_require__(16);

	var _assertString2 = _interopRequireDefault(_assertString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isWhitelisted(str, chars) {
	  (0, _assertString2.default)(str);
	  for (var i = str.length - 1; i >= 0; i--) {
	    if (chars.indexOf(str[i]) === -1) {
	      return false;
	    }
	  }
	  return true;
	}
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = normalizeEmail;

	var _isEmail = __webpack_require__(24);

	var _isEmail2 = _interopRequireDefault(_isEmail);

	var _merge = __webpack_require__(25);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var default_normalize_email_options = {
	  // The following options apply to all email addresses
	  // Lowercases the local part of the email address.
	  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
	  // The domain is always lowercased, as per RFC 1035
	  all_lowercase: true,

	  // The following conversions are specific to GMail
	  // Lowercases the local part of the GMail address (known to be case-insensitive)
	  gmail_lowercase: true,
	  // Removes dots from the local part of the email address, as that's ignored by GMail
	  gmail_remove_dots: true,
	  // Removes the subaddress (e.g. "+foo") from the email address
	  gmail_remove_subaddress: true,
	  // Conversts the googlemail.com domain to gmail.com
	  gmail_convert_googlemaildotcom: true,

	  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
	  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
	  outlookdotcom_lowercase: true,
	  // Removes the subaddress (e.g. "+foo") from the email address
	  outlookdotcom_remove_subaddress: true,

	  // The following conversions are specific to Yahoo
	  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
	  yahoo_lowercase: true,
	  // Removes the subaddress (e.g. "-foo") from the email address
	  yahoo_remove_subaddress: true,

	  // The following conversions are specific to iCloud
	  // Lowercases the local part of the iCloud address (known to be case-insensitive)
	  icloud_lowercase: true,
	  // Removes the subaddress (e.g. "+foo") from the email address
	  icloud_remove_subaddress: true
	};

	// List of domains used by iCloud
	var icloud_domains = ['icloud.com', 'me.com'];

	// List of domains used by Outlook.com and its predecessors
	// This list is likely incomplete.
	// Partial reference:
	// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
	var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com'];

	// List of domains used by Yahoo Mail
	// This list is likely incomplete
	var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com'];

	function normalizeEmail(email, options) {
	  options = (0, _merge2.default)(options, default_normalize_email_options);

	  if (!(0, _isEmail2.default)(email)) {
	    return false;
	  }

	  var raw_parts = email.split('@');
	  var domain = raw_parts.pop();
	  var user = raw_parts.join('@');
	  var parts = [user, domain];

	  // The domain is always lowercased, as it's case-insensitive per RFC 1035
	  parts[1] = parts[1].toLowerCase();

	  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
	    // Address is GMail
	    if (options.gmail_remove_subaddress) {
	      parts[0] = parts[0].split('+')[0];
	    }
	    if (options.gmail_remove_dots) {
	      parts[0] = parts[0].replace(/\./g, '');
	    }
	    if (!parts[0].length) {
	      return false;
	    }
	    if (options.all_lowercase || options.gmail_lowercase) {
	      parts[0] = parts[0].toLowerCase();
	    }
	    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
	  } else if (~icloud_domains.indexOf(parts[1])) {
	    // Address is iCloud
	    if (options.icloud_remove_subaddress) {
	      parts[0] = parts[0].split('+')[0];
	    }
	    if (!parts[0].length) {
	      return false;
	    }
	    if (options.all_lowercase || options.icloud_lowercase) {
	      parts[0] = parts[0].toLowerCase();
	    }
	  } else if (~outlookdotcom_domains.indexOf(parts[1])) {
	    // Address is Outlook.com
	    if (options.outlookdotcom_remove_subaddress) {
	      parts[0] = parts[0].split('+')[0];
	    }
	    if (!parts[0].length) {
	      return false;
	    }
	    if (options.all_lowercase || options.outlookdotcom_lowercase) {
	      parts[0] = parts[0].toLowerCase();
	    }
	  } else if (~yahoo_domains.indexOf(parts[1])) {
	    // Address is Yahoo
	    if (options.yahoo_remove_subaddress) {
	      var components = parts[0].split('-');
	      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
	    }
	    if (!parts[0].length) {
	      return false;
	    }
	    if (options.all_lowercase || options.yahoo_lowercase) {
	      parts[0] = parts[0].toLowerCase();
	    }
	  } else {
	    // Any other address
	    if (options.all_lowercase) {
	      parts[0] = parts[0].toLowerCase();
	    }
	  }
	  return parts.join('@');
	}
	module.exports = exports['default'];

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var validateStripe = function validateStripe(data) {
	  var errors = {};

	  if (!Stripe.card.validateCardNumber(data.number)) {
	    errors = _extends({}, errors, { number: true });
	  }

	  if (!Stripe.card.validateExpiry(data.exp_month, data.exp_year)) {
	    errors = _extends({}, errors, { exp_month: true, exp_year: true });
	  }

	  if (!Stripe.card.validateCVC(data.cvc)) {
	    errors = _extends({}, errors, { cvc: true });
	  }

	  if (Object.keys(errors).length == 0) {
	    return { success: true };
	  } else {
	    return { success: false, errors: errors };
	  }
	};

	module.exports = validateStripe;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _approvejs = __webpack_require__(81);

	var _approvejs2 = _interopRequireDefault(_approvejs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	exports.default = function () {

		return {
			props: ['placeholders', 'texts', 'rules', 'baseUri', 'redirect', 'type'],

			data: function data() {
				return {
					name: '',
					email: '',
					accept: false,
					prayLogo: '',
					country: '',
					countries: [],
					errors: {},
					loading: false
				};
			},
			init: function init() {
				var _this = this;

				$.ajax({
					url: '/wp-admin/admin-ajax.php',
					data: { action: 'countries' }
				}).then(function (res) {
					return _this.countries = res;
				}).then(function () {
					$.ajax({
						url: '/wp-admin/admin-ajax.php',
						data: { action: 'user_location' }
					}).then(function (res) {
						return _this.country = res.names.en;
					});
				});
			},
			ready: function ready() {
				this.prayLogo = this.baseUri.replace('http:', '') + '/public/img/pray.svg';
			},


			methods: {
				validateField: function validateField() {
					var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

					var value = this.$get(field);

					if (this.rules[field]) {
						var result = _approvejs2.default.value(value, this.rules[field]);
						var errors = result.errors;

						this.errors = _extends({}, this.errors, _defineProperty({}, field, errors));
					}
				},
				validateAll: function validateAll() {
					var _this2 = this;

					var fields = ['name', 'email', 'accept'];
					fields.forEach(function (field) {
						return _this2.validateField(field);
					});

					var _$get = this.$get('errors'),
					    name = _$get.name,
					    email = _$get.email,
					    accept = _$get.accept;

					var isValid = [name, email, accept].filter(function (err) {
						return err.length > 0;
					});
					return isValid.length == 0;
				},
				hasErrors: function hasErrors(field) {
					return this.errors[field] ? this.errors[field].length > 0 : false;
				},
				onSubmit: function onSubmit() {
					var _this3 = this;

					var name = this.name,
					    email = this.email,
					    country = this.country;


					if (this.validateAll()) {
						ga('send', 'event', 'SUBSCRIPTION', 'SUBSCRIPTION', 'SUBSCRIPTION', 0);

						var data = {};

						if (this.type == 'mailchimp') {
							var mc_data = {
								email_address: email,
								status: 'subscribed',
								merge_fields: { 'NAME': name, 'COUNTRY': country },
								update_existing: true
							};

							data = { action: 'mailchimp_subscribe', data: mc_data };
						} else {
							var infusion_data = { name: name, email: email, country: country, tags: '872' };
							data = { action: 'infusion_contact', data: infusion_data };
						}

						$.ajax({
							type: 'post',
							url: '/wp-admin/admin-ajax.php',
							data: data
						}).then(function (res) {
							return window.location = _this3.redirect;
						});
					}
				}
			},

			template: '\n\t\t\t<form >\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<input \n\t\t\t\t\t\tv-on:keyup="validateField(\'name\')" \n\t\t\t\t\t\tv-model="name"\n\t\t\t\t\t\ttype="text" \n\t\t\t\t\t\tclass="form-control"\n\t\t\t\t\t\tv-bind:class="[hasErrors(\'name\') ? \'form-group--error\' : \'\']"\n\t\t\t\t\t\tplaceholder="{{placeholders.name}}"\n\t\t\t\t\t>\n\n\t\t\t\t\t<span class="form-group__error" v-if="hasErrors(\'name\')">\n\t\t\t\t\t\t{{errors.name}}\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<input \n\t\t\t\t\t\tv-on:keyup="validateField(\'email\')" \n\t\t\t\t\t\tv-model="email"\n\t\t\t\t\t\ttype="text"\n\t\t\t\t\t\tclass="form-control"\n\t\t\t\t\t\tv-bind:class="[hasErrors(\'email\') ? \'form-group--error\' : \'\']"\n\t\t\t\t\t\tplaceholder="{{placeholders.email}}"\n\t\t\t\t\t>\n\t\t\t\t\t<span class="form-group__error" v-if="hasErrors(\'email\')">\n\t\t\t\t\t\t{{errors.email}}\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="input_container input_container__select">\n\t\t\t\t\t<select name="" class="form-control" v-model="country">\n\t\t\t\t\t\t<option value="{{country}}" v-for="country in countries">{{country}}</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="checkbox form-group">\n\t\t\t\t\t<label class="checkbox__label">\n\t\t\t\t\t\t<input type="checkbox" v-model="accept"> {{texts.checkbox}}\n\t\t\t\t\t</label>\n\t\t\t\t\t<span class="form-group__error" v-if="hasErrors(\'accept\')">\n\t\t\t\t\t\t{{errors.accept}}\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="input_container">\n\t\t\t\t\t<button \n\t\t\t\t\t\tclass="btn-pray" \n\t\t\t\t\t\tv-on:click.prevent="onSubmit" \n\t\t\t\t\t\tdisabled="{{loading}}"\n\t\t\t\t\t>\n\t\t\t\t\t\t<img v-bind:src="prayLogo" alt=""> {{texts.pray}}\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t'
		};
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.approve=t()}(this,function(){"use strict";function e(){this.scheme="",this.valid=!1}function t(e){this.strength=e,this.points=0,this.isMinimum=!1,this.hasLower=!1,this.hasUpper=!1,this.hasNumber=!1,this.hasSpecial=!1,this.isBonus=!1,this.percent=0,this.valid=!1,this.errors=[]}var s={message:"{title} is not a valid credit card number",schemes:[{regex:/^(5610|560221|560222|560223|560224|560225)/,scheme:"Australian Bank Card"},{regex:/^(2014|2149)/,scheme:"Diner's Club"},{regex:/^36/,scheme:"Diner's Club International"},{regex:/^(30[0-5]|36|38|54|55|2014|2149)/,scheme:"Diner's Club / Carte Blanche"},{regex:/^35(2[89]|[3-8][0-9])/,scheme:"Japanese Credit Bureau"},{regex:/^(5018|5020|5038|6304|6759|676[1-3])/,scheme:"Maestro"},{regex:/^5[1-5]/,scheme:"Mastercard"},{regex:/^(6304|670[69]|6771)/,scheme:"Laser"},{regex:/^(6334|6767)/,scheme:"Solo (Paymentech)"},{regex:/^(6011|622|64|65)/,scheme:"Discover"},{regex:/^3[47]/,scheme:"American Express"},{regex:/^(4026|417500|4508|4844|491(3|7))/,scheme:"Visa Electron"},{regex:/^(4)/,scheme:"Visa"}],_getScheme:function(e){e=(""+e).replace(/\D/g,"");for(var t=this.schemes.length;t--;)if(this.schemes[t].regex.test(e))return this.schemes[t].scheme},validate:function(t){t=(""+t).replace(/\D/g,"");var s,r=new e,a=t.length,i=0,n=1;if(a<12)return!1;for(;a--;)s=t.charAt(a)*n,i+=s-9*(s>9),n^=3;return r.valid=i%10===0&&i>0,r.scheme=this._getScheme(t),r}},r={minimum:8,minimumBonus:10,strengths:{0:"Very Weak",1:"Weak",2:"Better",3:"Almost",4:"Acceptable",5:"Strong",6:"Very Strong"},message:"{title} did not pass the strength test.",expects:["min","bonus"],errors:{isMinimum:"{title} must be at least {min} characters",hasLower:"{title} must have at least 1 lower case character",hasUpper:"{title} must have at least 1 upper case character",hasNumber:"{title} must have at least 1 number",hasSpecial:"{title} must have at least 1 special character"},_getScore:function(e){var s=new t(this.strengths[0]);return e.length>this.minimumBonus?(s.points+=2,s.isBonus=!0,s.isMinimum=!0):e.length>this.minimum?(s.points++,s.isMinimum=!0):(s.points=1,s.isMinimum=!1),s.hasLower=e.match(/[a-z]/),s.isMinimum&&s.points++,s.hasUpper=e.match(/[A-Z]/),s.isMinimum&&s.points++,s.hasNumber=e.match(/\d+/),s.isMinimum&&s.points++,s.hasSpecial=e.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/),s.isMinimum&&s.points++,s.percent=Math.ceil(s.points/6*100),s},_getStrength:function(e){var t=this._getScore(e);return t.strength=this.strengths[t.points],t.isMinimum||t.errors.push(this.errors.isMinimum),t.hasLower||t.errors.push(this.errors.hasLower),t.hasUpper||t.errors.push(this.errors.hasUpper),t.hasSpecial||t.errors.push(this.errors.hasSpecial),t.hasNumber||t.errors.push(this.errors.hasNumber),t.points>4&&(t.valid=!0),t},validate:function(e,t){if(this.minimum=t.min||this.minimum,this.minimumBonus=t.bonus||this.minimumBonus,t.hasOwnProperty("config")&&t.config.hasOwnProperty("messages"))for(var s in t.config.messages)t.config.messages.hasOwnProperty(s)&&(this.errors[s]=t.config.messages[s]);return this._getStrength(e)}},a={required:{validate:function(e){return!!e},message:"{title} is required",expects:!1},email:{regex:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,validate:function(e){return this.regex.test(e)},message:"{title} must be a valid email address",expects:!1},url:{regex:/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,validate:function(e){return this.regex.test(e)},message:"{title} must be a valid web address",expects:!1},alphaNumeric:{regex:/^[A-Za-z0-9]+$/i,validate:function(e){return this.regex.test(e)},message:"{title} may only contain [A-Za-z] and [0-9]",expects:!1},numeric:{regex:/^[0-9]+$/,validate:function(e){return this.regex.test(e)},message:"{title} may only contain [0-9]",expects:!1},alpha:{regex:/^[A-Za-z]+$/,validate:function(e){return this.regex.test(e)},message:"{title} may only contain [A-Za-z]",expects:!1},decimal:{regex:/^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,validate:function(e){return this.regex.test(e)},message:"{title} must be a valid decimal",expects:!1},currency:{regex:/^\s*(\+|-)?((\d+(\.\d\d)?)|(\.\d\d))\s*$/,validate:function(e){return this.regex.test(e)},message:"{title} must be a valid currency value",expects:!1},ip:{regex:{ipv4:/^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,ipv4Cidr:/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$/,ipv6:/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,ipv6Cidr:/^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/},validate:function(e){return this.regex.ipv4.test(e)||this.regex.ipv6.test(e)||this.regex.ipv4Cidr.test(e)||this.regex.ipv6Cidr.test(e)},message:"{title} must be a valid IP address",expects:!1},min:{validate:function(e,t){return"string"==typeof e&&e.length>=t.min},message:"{title} must be a minimum of {min} characters",expects:["min"]},max:{validate:function(e,t){return"string"==typeof e&&e.length<=t.max},message:"{title} must be a maximum of {max} characters",expects:["max"]},range:{validate:function(e,t){return"string"==typeof e?e.length>=t.min&&e.length<=t.max:"number"==typeof e&&(e>=t.min&&e<=t.max)},message:"{title} must be a minimum of {min} and a maximum of {max} characters",expects:["min","max"]},equal:{validate:function(e,t){return""+e==""+t.value},message:"{title} must be equal to {field}",expects:["value","field"]},format:{validate:function(e,t){if("[object RegExp]"===Object.prototype.toString.call(t.regex))return t.regex.test(e);throw"approve.value(): [format] - regex is not a valid regular expression."},message:"{title} did not pass the [{regex}] test",expects:["regex"]},time:{regex:/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,validate:function(e){return this.regex.test(e)},message:"{title} is not a valid time",expects:!1},date:{formats:{ymd:/^(?:\2)(?:[0-9]{2})?[0-9]{2}([\/-])(1[0-2]|0?[1-9])([\/-])(3[01]|[12][0-9]|0?[1-9])$/,dmy:/^(3[01]|[12][0-9]|0?[1-9])([\/-])(1[0-2]|0?[1-9])([\/-])(?:[0-9]{2})?[0-9]{2}$/},validate:function(e,t){return this.formats[t.format].test(e)},message:"{title} is not a valid date",expects:["format"]},truthy:{regex:/^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/i,validate:function(e){return this.regex.test(e)},message:"{title} is not valid",expects:!1},falsy:{regex:/^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/i,validate:function(e){return!this.regex.test(e)},message:"{title} is not valid",expects:!1},cc:s,strength:r},i=function(){this.approved=!0,this.errors=[],this.each=function(e){for(var t=e&&e.constructor&&e.call&&e.apply,s=this.errors.length;s--;)t&&e(this.errors[s])}},n={VERSION:"VERSION PROPERTY DEPRECATED",tests:a,_format:function(e,t){return t="object"==typeof t?t:Array.prototype.slice.call(arguments,1),e.replace(/\{\{|\}\}|\{(\w+)\}/g,function(e,s){return"{{"===e?"{":"}}"===e?"}":t[s]}).trim()},_start:function(e,t){var s=new i,r="";t.hasOwnProperty("title")&&(r=t.title);for(var a in t)if(t.hasOwnProperty(a)&&"title"!==a){var n=t[a];if(!this.tests.hasOwnProperty(a))throw"approve.value(): "+a+" test not defined.";var u={constraint:n,rule:a,title:r,test:this.tests[a],value:e};this._test(u,s)}return s},_test:function(e,t){var s=this._getArgs(e),r=e.test.validate(e.value,s);if("object"==typeof r){t.approved=!!r.valid&&t.approved,r.hasOwnProperty("errors")&&(t.errors=t.errors.concat(this._formatMessages(r.errors,e)));for(var a in r)r.hasOwnProperty(a)&&!t.hasOwnProperty(a)&&(t[a]=r[a])}else{if("boolean"!=typeof r)throw"approve.value(): "+e.rule+" returned an invalid value";t.approved=!!r&&t.approved}t.approved||t.errors.push(this._formatMessage(e))},_eachExpected:function(e,t){if(Array.isArray(e.test.expects))for(var s=e.test.expects.length,r=s;r--;)t(e.test.expects[r],s)},_getArgs:function(e){var t={};return this._eachExpected(e,function(s,r){if(e.constraint.hasOwnProperty(s))t[s]=e.constraint[s];else{if(!(r<=1&&/^[A-Za-z0-9]+$/i.test(e.constraint)))throw"approve.value(): "+e.rule+" expects the "+s+" parameter.";t[s]=e.constraint}}),e.constraint.hasOwnProperty("config")&&(t.config=e.constraint.config),t},_getFormat:function(e){var t={};return this._eachExpected(e,function(s){e.constraint.hasOwnProperty(s)&&(t[s]=e.constraint[s]),/^[A-Za-z0-9]+$/i.test(e.constraint)&&(t[s]=e.constraint)}),t.title=e.title,t},_formatMessages:function(e,t){for(var s=this._getFormat(t),r=e.length;r--;)e[r]=this._format(e[r],s);return e},_formatMessage:function(e){var t,s=this._getFormat(e);return e.constraint.hasOwnProperty("message")?(t=e.constraint.message,this._format(t,s)):(t=e.test.message,this._format(t,s))},value:function(e,t){if("object"!=typeof t)throw"approve.value(value, rules): rules is not a valid object.";return this._start(e,t)},addTest:function(e,t){if("object"!=typeof e)throw"approve.addTest(obj, name): obj is not a valid object.";try{this.tests.hasOwnProperty(t)||(this.tests[t]=e)}catch(s){throw"approve.addTest(): "+s.message}}};return n});
	//# sourceMappingURL=approve.min.js.map


/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return {
	    props: ['other'],

	    methods: {
	      isAmount: function isAmount(amount) {
	        this.$parent.amount == amount;
	      },
	      changeAmount: function changeAmount(amount, e) {
	        e.preventDefault();
	        if (amount == '') {
	          this.$dispatch('focus-amount');
	        } else {
	          this.$parent.amount = amount;
	        }
	      }
	    },

	    template: '\n\t\t<ul class="change-amount" style="padding: 0 15px">\n      <li class="col-md-2">\n        <a\n          href="#" \n          v-bind:class="[ $parent.amount == 10 ? \'active\' : \'\'  ]"\n          v-on:click="changeAmount(10, $event)">$ 10</a>\n      </li>\n      <li class="col-md-2">\n        <a\n          href="#"\n          v-bind:class="[ $parent.amount == 30 ? \'active\' : \'\'  ]"  \n          v-on:click="changeAmount(30, $event)"\n        >$ 30</a>\n      </li>\n      <li class="col-md-2">\n        <a \n          href="#" \n          v-bind:class="[ $parent.amount == 50 ? \'active\' : \'\'  ]" \n          v-on:click="changeAmount(50, $event)"\n        >$ 50</a>\n      </li>\n      <li class="col-md-2">\n        <a \n          href="#" \n          v-bind:class="[ $parent.amount == 100 ? \'active\' : \'\'  ]" \n          v-on:click="changeAmount(100, $event)"\n        >$ 100</a>\n      </li>\n      <li class="col-md-2">\n        <a\n          href="#" \n          v-bind:class="[ $parent.amount == 1 ? \'active\' : \'\'  ]" \n          v-on:click="changeAmount(\'\', $event)">\n\t\t\t\t\t{{other}}\n          </a>\n      </li>\n    </ul>\n\t'
	  };
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var each = function each(arr, fn) {
		return Array.prototype.forEach.call(arr, fn);
	};

	exports.default = function () {
		return {
			props: ['images', 'height', 'interval'],
			data: function data() {
				return {
					slide: 1,
					lastSlide: 1,
					autoplay: null
				};
			},
			ready: function ready() {
				var _this = this;

				var lisCount = $(this.$el).find('li').length;
				var ulWidth = lisCount * 100;
				var w = 100 / lisCount;
				this.lastSlide = lisCount;
				$(this.$el).find('li').css({ width: w + '%', height: this.height });
				$(this.$el).find('li span').css({ height: this.height });
				$(this.$el).find('ul').css({ width: ulWidth + '%' });

				this.autoplay = setInterval(function () {
					_this.next();
				}, parseInt(this.interval));
			},


			methods: {
				nextBtn: function nextBtn() {
					clearInterval(this.autoplay);
					this.next();
				},
				prevBtn: function prevBtn() {
					clearInterval(this.autoplay);
					this.prev();
				},
				next: function next() {
					if (this.slide < this.lastSlide) {
						var next = this.slide * 100;
						$(this.$el).find('ul').css({ left: '-' + next + '%' });
						this.slide = this.slide + 1;
					} else {
						$(this.$el).find('ul').css({ left: 0 });
						this.slide = 1;
					}
				},
				prev: function prev() {
					if (this.slide >= 1) {
						var next = this.slide * 100;
						this.$el.querySelector('ul').style.left = '-' + next + '%';
						this.slide = this.slide - 1;
					}
				},
				getStyle: function getStyle(image) {

					var style = {
						display: 'block',
						background: 'url(' + image + ')',
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					};

					return style;
				}
			},

			template: '\n\t\t<div style="position:relative; overflow: hidden">\n\t\t\t<div class="navigation">\n\t\t\t\t<button v-on:click.prevent="nextBtn" style="border: none; position: absolute; top:0;bottom:0;margin: auto; right: 20px; z-index: 1010"><i class="ion-chevron-right"></i></button>\n\t\t\t\t<button v-on:click.prevent="prevBtn" style="border: none; position: absolute; top:0;bottom:0;margin: auto; left: 20px; z-index: 1010"><i class="ion-chevron-left"></i></button>\n\t\t\t</div>\n\n\t\t\t<ul style="position:relative; padding: 0;transition: all 300ms ease">\n\t\t\t \n\t\t\t\t<li v-for="image in images" style="float:left;list-style: none">\n\t\t\t\t\t<span \n\t\t\t\t\t\tv-bind:style="getStyle(image)"></span> \n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t'
		};
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		return {
			props: ['url'],
			methods: {
				onClick: function onClick(e) {
					e.preventDefault();
					console.log('share');
					ga('send', 'event', 'SHARE', 'SHARE', 'SHARE', 0);
					window.location = e.currentTarget.getAttribute('href');
				}
			},

			template: '\n\t\t\t<div class="bs_share" >\n\t\t\t\t<div class="bs_share__fb">\n\t\t\t\t\t<a href="https://www.facebook.com/sharer/sharer.php?u={{url}}" target="blank" v-on:click="onClick">\n\t\t\t\t\t\t<svg width="10px" height="18px" viewBox="14 10 10 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t<path d="M22.5905382,13.5853299 C22.7059896,13.6084201 22.8329861,13.5853299 22.9368924,13.516059 C23.0407986,13.4467882 23.1100694,13.3313368 23.1216146,13.2158854 L23.4333333,10.9645833 C23.4564236,10.7567708 23.3294271,10.5374132 23.1100694,10.4796875 C22.3019097,10.2487847 21.4244792,10.1333333 20.5124132,10.1333333 C17.753125,10.1333333 16.4138889,11.4494792 16.4138889,14.1741319 L16.4138889,15.3632812 L15.0053819,15.3632812 C14.762934,15.3632812 14.5666667,15.5595486 14.5666667,15.8019965 L14.5666667,18.1110243 C14.5666667,18.3650174 14.762934,18.5612847 15.0053819,18.5612847 L16.4138889,18.5612847 L16.4138889,27.4279514 C16.4138889,27.6703993 16.6101562,27.8666667 16.8526042,27.8666667 L19.7388889,27.8666667 C19.9697917,27.8666667 20.166059,27.6703993 20.166059,27.4279514 L20.166059,18.5612847 L22.4981771,18.5612847 C22.7290799,18.5612847 22.9138021,18.3765625 22.9368924,18.1456597 L23.0985243,15.8366319 C23.1100694,15.7096354 23.0638889,15.594184 22.9830729,15.5018229 C22.9022569,15.4094618 22.7868056,15.3632812 22.6713542,15.3632812 L20.166059,15.3632812 L20.166059,14.347309 C20.166059,13.5853299 20.246875,13.4006076 21.0319444,13.4006076 C21.4822049,13.4006076 22.0940972,13.4814236 22.5905382,13.5853299 Z" id="facebook-ico" stroke="none" fill="#FFFFFF" fill-rule="evenodd"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="bs_share__tw">\n\t\t\t\t\t<a href="https://twitter.com/intent/tweet?text={{url}}" target="blank" v-on:click="onClick">\n\t\t\t\t\t\t<svg width="22px" height="18px" viewBox="8 50 22 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\t\t\t\t\t\t\t\t<path d="M29.2768472,52.9090652 C29.2768472,52.7240129 29.1244512,52.5607314 28.9285135,52.5607314 C28.8196592,52.5607314 28.0685646,52.8764089 27.8726268,52.930836 C28.1338771,52.626044 28.7325758,51.7007825 28.7325758,51.308907 C28.7325758,51.1238547 28.5801798,50.9605733 28.384242,50.9605733 C28.3298149,50.9605733 28.2645023,50.9823441 28.2100751,51.0150004 C27.4698659,51.4177613 26.762313,51.7334388 25.9350203,51.9076056 C25.1186131,51.1238547 24.0082993,50.6666667 22.8653292,50.6666667 C20.4487638,50.6666667 18.4676156,52.6369294 18.4676156,55.0643802 C18.4676156,55.2385471 18.478501,55.4235994 18.5111573,55.5977663 C16.1163628,55.3909431 13.841308,54.3894836 12.0560976,52.7893254 C11.6206804,52.39745 11.2505758,51.9729182 10.8587003,51.537501 C10.7716169,51.4395322 10.6954188,51.4068759 10.5647937,51.4068759 C10.445054,51.4068759 10.3470851,51.4939593 10.2926579,51.5810428 C9.90078248,52.1579705 9.69395932,53.0941175 9.69395932,53.790785 C9.69395932,54.8031299 10.0422931,55.793704 10.6954188,56.577455 C10.4885957,56.5121424 10.1729182,56.3053192 9.98786592,56.3053192 C9.7592719,56.3053192 9.56333416,56.4686007 9.56333416,56.6971947 C9.56333416,58.2211548 10.4015122,59.6362607 11.6859929,60.4308971 C11.5880241,60.4200116 11.5009406,60.3873553 11.4029718,60.3873553 C11.2179195,60.3873553 11.0655235,60.5506368 11.0655235,60.7248037 C11.0655235,60.7683454 11.0764089,60.8010017 11.0872943,60.8445434 C11.5662532,62.3140764 12.7636505,63.4243902 14.2658398,63.772724 C13.0357862,64.534704 11.6206804,64.9265795 10.1838037,64.9265795 C9.85724076,64.9265795 9.53067787,64.8721524 9.21500042,64.8721524 C9.01906268,64.8721524 8.86666667,65.0354338 8.86666667,65.2204861 C8.86666667,65.3402258 8.93197924,65.4381947 9.02994811,65.5143927 C9.31296928,65.7212159 9.66130303,65.8953827 9.97698049,66.0586642 C11.6533367,66.9294986 13.5256306,67.3866866 15.4196953,67.3866866 C20.1657426,67.3866866 24.2260079,64.8394961 26.1853852,60.5070951 C26.8929382,58.9504786 27.3065845,57.2414662 27.2739282,55.5324537 L27.2739282,55.1732345 C28.0141374,54.6180776 28.7325758,53.8996393 29.2224201,53.1050029 C29.2550764,53.0505758 29.2768472,52.9852632 29.2768472,52.9090652 L29.2768472,52.9090652 Z" id="twiiter-ico" stroke="none" fill="#1A2127" fill-rule="evenodd"></path>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'
		};
	};

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		$('.bs-donate').on('click', function (e) {
			e.preventDefault();
			ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATION_CLICK', 0);

			$.ajax({
				url: '/wp-admin/admin-ajax.php',
				data: { action: 'donate_redirect' }
			}).done(function (res) {
				return window.location = res;
			});
		});
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var define = __webpack_require__(87);

	var implementation = __webpack_require__(91);
	var getPolyfill = __webpack_require__(109);
	var shim = __webpack_require__(110);

	// eslint-disable-next-line no-unused-vars
	var boundFromShim = function from(array) {
	    // eslint-disable-next-line no-invalid-this
		return implementation.apply(this || Array, arguments);
	};

	define(boundFromShim, {
		'getPolyfill': getPolyfill,
		'implementation': implementation,
		'shim': shim
	});

	module.exports = boundFromShim;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(88);
	var foreach = __webpack_require__(90);
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

	var toStr = Object.prototype.toString;

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	        /* eslint-disable no-unused-vars, no-restricted-syntax */
	        for (var _ in obj) { return false; }
	        /* eslint-enable no-unused-vars, no-restricted-syntax */
			return obj.x === obj;
		} catch (e) { /* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function (object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = props.concat(Object.getOwnPropertySymbols(map));
		}
		foreach(props, function (name) {
			defineProperty(object, name, map[name], predicates[name]);
		});
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	module.exports = defineProperties;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(89);
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2));
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;


/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ },
/* 90 */
/***/ function(module, exports) {

	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	module.exports = function forEach (obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};



/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ES = __webpack_require__(92);
	var supportsDescriptors = __webpack_require__(87).supportsDescriptors;

	/*! https://mths.be/array-from v0.2.0 by @mathias */
	module.exports = function from(arrayLike) {
		var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
			object[key] = descriptor.value;
		};
		var C = this;
		if (arrayLike === null || typeof arrayLike === 'undefined') {
			throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
		}
		var items = ES.ToObject(arrayLike);

		var mapFn, T;
		if (typeof arguments[1] !== 'undefined') {
			mapFn = arguments[1];
			if (!ES.IsCallable(mapFn)) {
				throw new TypeError('When provided, the second argument to `Array.from` must be a function');
			}
			if (arguments.length > 2) {
				T = arguments[2];
			}
		}

		var len = ES.ToLength(items.length);
		var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
		var k = 0;
		var kValue, mappedValue;
		while (k < len) {
			kValue = items[k];
			if (mapFn) {
				mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
			} else {
				mappedValue = kValue;
			}
			defineProperty(A, k, {
				'configurable': true,
				'enumerable': true,
				'value': mappedValue,
				'writable': true
			});
			k += 1;
		}
		A.length = len;
		return A;
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;

	var $isNaN = __webpack_require__(93);
	var $isFinite = __webpack_require__(94);
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

	var assign = __webpack_require__(95);
	var sign = __webpack_require__(96);
	var mod = __webpack_require__(97);
	var isPrimitive = __webpack_require__(98);
	var toPrimitive = __webpack_require__(99);
	var parseInteger = parseInt;
	var bind = __webpack_require__(104);
	var strSlice = bind.call(Function.call, String.prototype.slice);
	var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
	var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
	var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
	var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
	var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
	var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
	var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

	// whitespace from: http://es5.github.io/#x15.5.4.20
	// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
	var ws = [
		'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
		'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
		'\u2029\uFEFF'
	].join('');
	var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
	var replace = bind.call(Function.call, String.prototype.replace);
	var trim = function (value) {
		return replace(value, trimRegex, '');
	};

	var ES5 = __webpack_require__(106);

	var hasRegExpMatcher = __webpack_require__(108);

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
	var ES6 = assign(assign({}, ES5), {

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
		Call: function Call(F, V) {
			var args = arguments.length > 2 ? arguments[2] : [];
			if (!this.IsCallable(F)) {
				throw new TypeError(F + ' is not a function');
			}
			return F.apply(V, args);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
		ToPrimitive: toPrimitive,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
		// ToBoolean: ES5.ToBoolean,

		// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
		ToNumber: function ToNumber(argument) {
			var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
			if (typeof value === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a number');
			}
			if (typeof value === 'string') {
				if (isBinary(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 2));
				} else if (isOctal(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 8));
				} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
					return NaN;
				} else {
					var trimmed = trim(value);
					if (trimmed !== value) {
						return this.ToNumber(trimmed);
					}
				}
			}
			return Number(value);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
		// ToInteger: ES5.ToNumber,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
		// ToInt32: ES5.ToInt32,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
		// ToUint32: ES5.ToUint32,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
		ToInt16: function ToInt16(argument) {
			var int16bit = this.ToUint16(argument);
			return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
		// ToUint16: ES5.ToUint16,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
		ToInt8: function ToInt8(argument) {
			var int8bit = this.ToUint8(argument);
			return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
		ToUint8: function ToUint8(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x100);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
		ToUint8Clamp: function ToUint8Clamp(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number <= 0) { return 0; }
			if (number >= 0xFF) { return 0xFF; }
			var f = Math.floor(argument);
			if (f + 0.5 < number) { return f + 1; }
			if (number < f + 0.5) { return f; }
			if (f % 2 !== 0) { return f + 1; }
			return f;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
		ToString: function ToString(argument) {
			if (typeof argument === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a string');
			}
			return String(argument);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
		ToObject: function ToObject(value) {
			this.RequireObjectCoercible(value);
			return Object(value);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
		ToPropertyKey: function ToPropertyKey(argument) {
			var key = this.ToPrimitive(argument, String);
			return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
		ToLength: function ToLength(argument) {
			var len = this.ToInteger(argument);
			if (len <= 0) { return 0; } // includes converting -0 to +0
			if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
			return len;
		},

		// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
		CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
			if (toStr.call(argument) !== '[object String]') {
				throw new TypeError('must be a string');
			}
			if (argument === '-0') { return -0; }
			var n = this.ToNumber(argument);
			if (this.SameValue(this.ToString(n), argument)) { return n; }
			return void 0;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
		RequireObjectCoercible: ES5.CheckObjectCoercible,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
		IsArray: Array.isArray || function IsArray(argument) {
			return toStr.call(argument) === '[object Array]';
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
		// IsCallable: ES5.IsCallable,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
		IsConstructor: function IsConstructor(argument) {
			return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
		IsExtensible: function IsExtensible(obj) {
			if (!Object.preventExtensions) { return true; }
			if (isPrimitive(obj)) {
				return false;
			}
			return Object.isExtensible(obj);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
		IsInteger: function IsInteger(argument) {
			if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
				return false;
			}
			var abs = Math.abs(argument);
			return Math.floor(abs) === abs;
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
		IsPropertyKey: function IsPropertyKey(argument) {
			return typeof argument === 'string' || typeof argument === 'symbol';
		},

		// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
		IsRegExp: function IsRegExp(argument) {
			if (!argument || typeof argument !== 'object') {
				return false;
			}
			if (hasSymbols) {
				var isRegExp = argument[Symbol.match];
				if (typeof isRegExp !== 'undefined') {
					return ES5.ToBoolean(isRegExp);
				}
			}
			return hasRegExpMatcher(argument);
		},

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
		// SameValue: ES5.SameValue,

		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
		SameValueZero: function SameValueZero(x, y) {
			return (x === y) || ($isNaN(x) && $isNaN(y));
		},

		Type: function Type(x) {
			if (typeof x === 'symbol') {
				return 'Symbol';
			}
			return ES5.Type(x);
		},

		// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
		SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
			if (this.Type(O) !== 'Object') {
				throw new TypeError('Assertion failed: Type(O) is not Object');
			}
			var C = O.constructor;
			if (typeof C === 'undefined') {
				return defaultConstructor;
			}
			if (this.Type(C) !== 'Object') {
				throw new TypeError('O.constructor is not an Object');
			}
			var S = hasSymbols && Symbol.species ? C[Symbol.species] : undefined;
			if (S == null) {
				return defaultConstructor;
			}
			if (this.IsConstructor(S)) {
				return S;
			}
			throw new TypeError('no constructor found');
		}
	});

	delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

	module.exports = ES6;


/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};


/***/ },
/* 94 */
/***/ function(module, exports) {

	var $isNaN = Number.isNaN || function (a) { return a !== a; };

	module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ },
/* 95 */
/***/ function(module, exports) {

	var has = Object.prototype.hasOwnProperty;
	module.exports = Object.assign || function assign(target, source) {
		for (var key in source) {
			if (has.call(source, key)) {
				target[key] = source[key];
			}
		}
		return target;
	};


/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};


/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};


/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

	var isPrimitive = __webpack_require__(100);
	var isCallable = __webpack_require__(101);
	var isDate = __webpack_require__(102);
	var isSymbol = __webpack_require__(103);

	var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
		if (typeof O === 'undefined' || O === null) {
			throw new TypeError('Cannot call method on ' + O);
		}
		if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
			throw new TypeError('hint must be "string" or "number"');
		}
		var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
		var method, result, i;
		for (i = 0; i < methodNames.length; ++i) {
			method = O[methodNames[i]];
			if (isCallable(method)) {
				result = method.call(O);
				if (isPrimitive(result)) {
					return result;
				}
			}
		}
		throw new TypeError('No default value');
	};

	var GetMethod = function GetMethod(O, P) {
		var func = O[P];
		if (func !== null && typeof func !== 'undefined') {
			if (!isCallable(func)) {
				throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
			}
			return func;
		}
	};

	// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		var hint = 'default';
		if (arguments.length > 1) {
			if (PreferredType === String) {
				hint = 'string';
			} else if (PreferredType === Number) {
				hint = 'number';
			}
		}

		var exoticToPrim;
		if (hasSymbols) {
			if (Symbol.toPrimitive) {
				exoticToPrim = GetMethod(input, Symbol.toPrimitive);
			} else if (isSymbol(input)) {
				exoticToPrim = Symbol.prototype.valueOf;
			}
		}
		if (typeof exoticToPrim !== 'undefined') {
			var result = exoticToPrim.call(input, hint);
			if (isPrimitive(result)) {
				return result;
			}
			throw new TypeError('unable to convert exotic object to primitive');
		}
		if (hint === 'default' && (isDate(input) || isSymbol(input))) {
			hint = 'string';
		}
		return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
	};


/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	var fnToStr = Function.prototype.toString;

	var constructorRegex = /^\s*class /;
	var isES6ClassFn = function isES6ClassFn(value) {
		try {
			var fnStr = fnToStr.call(value);
			var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
			var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
			var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
			return constructorRegex.test(spaceStripped);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';

	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateObject(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) { return false; }
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};


/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') { return false; }
			return symStringRegex.test(symToStr.call(value));
		};
		module.exports = function isSymbol(value) {
			if (typeof value === 'symbol') { return true; }
			if (toStr.call(value) !== '[object Symbol]') { return false; }
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {
		module.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false;
		};
	}


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var implementation = __webpack_require__(105);

	module.exports = Function.prototype.bind || implementation;


/***/ },
/* 105 */
/***/ function(module, exports) {

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $isNaN = __webpack_require__(93);
	var $isFinite = __webpack_require__(94);

	var sign = __webpack_require__(96);
	var mod = __webpack_require__(97);

	var IsCallable = __webpack_require__(101);
	var toPrimitive = __webpack_require__(107);

	// https://es5.github.io/#x9
	var ES5 = {
		ToPrimitive: toPrimitive,

		ToBoolean: function ToBoolean(value) {
			return Boolean(value);
		},
		ToNumber: function ToNumber(value) {
			return Number(value);
		},
		ToInteger: function ToInteger(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number)) { return 0; }
			if (number === 0 || !$isFinite(number)) { return number; }
			return sign(number) * Math.floor(Math.abs(number));
		},
		ToInt32: function ToInt32(x) {
			return this.ToNumber(x) >> 0;
		},
		ToUint32: function ToUint32(x) {
			return this.ToNumber(x) >>> 0;
		},
		ToUint16: function ToUint16(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x10000);
		},
		ToString: function ToString(value) {
			return String(value);
		},
		ToObject: function ToObject(value) {
			this.CheckObjectCoercible(value);
			return Object(value);
		},
		CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
			/* jshint eqnull:true */
			if (value == null) {
				throw new TypeError(optMessage || 'Cannot call method on ' + value);
			}
			return value;
		},
		IsCallable: IsCallable,
		SameValue: function SameValue(x, y) {
			if (x === y) { // 0 === -0, but they are not identical.
				if (x === 0) { return 1 / x === 1 / y; }
				return true;
			}
			return $isNaN(x) && $isNaN(y);
		},

		// http://www.ecma-international.org/ecma-262/5.1/#sec-8
		Type: function Type(x) {
			if (x === null) {
				return 'Null';
			}
			if (typeof x === 'undefined') {
				return 'Undefined';
			}
			if (typeof x === 'function' || typeof x === 'object') {
				return 'Object';
			}
			if (typeof x === 'number') {
				return 'Number';
			}
			if (typeof x === 'boolean') {
				return 'Boolean';
			}
			if (typeof x === 'string') {
				return 'String';
			}
		}
	};

	module.exports = ES5;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toStr = Object.prototype.toString;

	var isPrimitive = __webpack_require__(100);

	var isCallable = __webpack_require__(101);

	// https://es5.github.io/#x8.12
	var ES5internalSlots = {
		'[[DefaultValue]]': function (O, hint) {
			var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};

	// https://es5.github.io/#x9
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
	};


/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';

	var regexExec = RegExp.prototype.exec;
	var tryRegexExec = function tryRegexExec(value) {
		try {
			regexExec.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var regexClass = '[object RegExp]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isRegex(value) {
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ES = __webpack_require__(92);
	var implementation = __webpack_require__(91);

	var tryCall = function (fn) {
		try {
			fn();
			return true;
		} catch (e) {
			return false;
		}
	};

	module.exports = function getPolyfill() {
		var implemented = ES.IsCallable(Array.from)
			&& tryCall(function () { Array.from({ 'length': -Infinity }); })
			&& !tryCall(function () { Array.from([], undefined); });

		return implemented ? Array.from : implementation;
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var define = __webpack_require__(87);
	var getPolyfill = __webpack_require__(109);

	module.exports = function shimArrayFrom() {
		var polyfill = getPolyfill();

		define(Array, { 'from': polyfill }, {
			'from': function () {
				return Array.from !== polyfill;
			}
		});

		return polyfill;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _validator = __webpack_require__(14);

	var _validator2 = _interopRequireDefault(_validator);

	var _validation = __webpack_require__(79);

	var _validation2 = _interopRequireDefault(_validation);

	var _infusion_contact = __webpack_require__(113);

	var _infusion_contact2 = _interopRequireDefault(_infusion_contact);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentData = {
		donation_type: 'monthly',
		progress: '33.3%',
		declined: false,
		amount: 30,
		section: 1,
		success: false,
		loading: false,
		countries: [],
		errors: {
			stripe: {},
			contact: {}
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

	exports.default = function () {
		return {
			props: ['captcha_name', 'url', 'currency', 'country', 'validationMessages', 'backText', 'texts', 'link', 'cardSrc', 'placeholders', 'redirect', 'monthly', 'once', 'vertical'],

			data: function data() {
				return _extends({}, componentData);
			},
			init: function init() {
				var _this = this;

				$.ajax({
					url: '/wp-admin/admin-ajax.php',
					data: { action: 'countries' }
				}).then(function (res) {
					return _this.countries = res;
				});
			},
			ready: function ready() {
				$(this.$el).find('.donate_landing__viewport').css({ 'display': 'block' });
				this.contact.country = this.country;
			},


			computed: {
				cardType: function cardType() {
					var type = Stripe.card.cardType(this.stripe.number).replace(' ', '');
					return type;
				}
			},

			events: {
				'focus-amount': function focusAmount() {
					this.amount = 1;
					this.$els.amountInput.focus();
				}
			},

			methods: {
				showCard: function showCard() {
					var _this2 = this;

					Object.keys(this.card).map(function (key) {
						if (key === _this2.cardType) {
							return _this2.card[key] = true;
						} else {
							return _this2.card[key] = false;
						}
					});
				},
				cleanNumber: function cleanNumber(keypath) {
					var val = this.$get(keypath);
					this.$set(keypath, val.replace(/[^0-9]+/, ''));
				},
				maxLength: function maxLength(keypath, length) {
					var val = this.$get(keypath);
					this.$set(keypath, val.substring(0, length));
				},
				createToken: function createToken() {
					var _this3 = this;

					var stripeData = {
						number: this.stripe.number,
						cvc: this.stripe.cvc,
						exp_month: this.stripe.exp_month,
						exp_year: this.stripe.exp_year
					};

					this.toggleLoading();

					//send wp_ajax to get token
					var data = {
						action: 'stripe_token',
						data: stripeData
					};

					$.ajax({
						type: 'post',
						url: '/wp-admin/admin-ajax.php',
						data: data
					}).done(function (res) {
						return _this3.handleToken(res);
					});
				},
				handleToken: function handleToken(response) {
					this.toggleLoading();

					if (response.id) {
						this.stripe.token = response.id;
						this.declined = false;
					} else {
						this.declined = true;
					}
				},
				cardValidation: function cardValidation() {
					var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: '', field: '' };
					var type = action.type,
					    field = action.field;

					var isValid = Stripe.card[type](this.$get(field));
					this.$set('errors.' + field, !isValid);
				},
				expiryValidation: function expiryValidation() {
					var isValid = Stripe.card.validateExpiry(this.stripe.exp_month, this.stripe.exp_year);
					this.$set('errors.stripe.exp_month', !isValid);
					this.$set('errors.stripe.exp_year', !isValid);
				},
				validateContact: function validateContact() {
					var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

					var val = this.$get('contact.' + field) ? this.$get('contact.' + field) : '';

					if (field == 'email') {
						this.$set('errors.contact.' + field, !_validator2.default.isEmail(val));
					} else {
						this.$set('errors.contact.' + field, _validator2.default.isEmpty(val));
					}
				},
				contactValidations: function contactValidations() {
					var _this4 = this;

					var fields = ['name', 'email', 'country'];
					fields.forEach(function (key) {
						return _this4.validateContact(key);
					});
				},
				showStripeErrors: function showStripeErrors() {
					this.$set('errors.stripe', (0, _validation2.default)(this.stripe).errors);
				},
				removeErrors: function removeErrors() {
					this.errors = _extends({}, componentData.errors);
				},
				toggleLoading: function toggleLoading() {
					this.loading = !this.loading;
				},
				getToken: function getToken(e) {
					if (e) e.preventDefault();

					if ((0, _validation2.default)(this.stripe).success) {
						this.removeErrors();
						this.createToken();
						return $.Deferred().resolve();
					} else {
						this.showStripeErrors();
						return $.Deferred().reject();
					}
				},
				isValid: function isValid() {
					var contactErrs = this.errors.contact;
					var errs = Object.keys(contactErrs).filter(function (field) {
						return contactErrs[field] == true;
					});
					return errs.length == 0;
				},
				onSubmit: function onSubmit(e) {
					if (e) e.preventDefault();
					var contact = this.contact,
					    currency = this.currency,
					    amount = this.amount,
					    donation_type = this.donation_type,
					    token = this.stripe.token;

					var data = _extends({}, contact, { currency: currency, amount: amount, donation_type: donation_type, stripe_token: token });
					console.log(this.stripe);
					this.contactValidations();
					this.toggleLoading();

					if (this.isValid()) {

						this.stripeCharge(data).then(this.handleChargeResponse).then(this.handleCharge);
					} else {
						this.toggleLoading();
					}
				},
				handleChargeResponse: function handleChargeResponse(response) {
					var contact = this.contact;

					if (response.id) {
						return this.infusion(contact).then(function () {
							return $.Deferred().resolve(response);
						});
					} else {
						this.declined = true;
						this.toggleLoading();
						return $.Deferred().reject(response);
					}
				},
				handleCharge: function handleCharge(response) {
					var id = response.id,
					    customer = response.customer;
					var donation_type = this.donation_type,
					    amount = this.amount;


					ga('ecommerce:addTransaction', {
						'id': this.contact.email + '-' + id, // Transaction ID. Required.
						'affiliation': 'ACN International', // Affiliation or store name.
						'revenue': amount,
						'currency': 'USD'
					});

					ga('ecommerce:send');
					var url = this.redirect[donation_type] + '?customer_id=' + customer + '-' + id + '&order_revenue=' + amount + '&order_id=' + id;
					window.location = url;
				},
				stripeCharge: function stripeCharge(data) {
					var _this5 = this;

					return $.ajax({
						url: '/wp-admin/admin-ajax.php',
						type: 'post',
						data: {
							action: 'stripe_charge',
							data: data
						},
						beforeSend: function beforeSend() {
							_this5.removeErrors();
						}
					});
				},
				infusion: function infusion(contact) {
					var tags = '';
					if (this.donation_type == 'monthly') tags = '870';
					if (this.donation_type == 'once') tags = '868';

					(0, _infusion_contact2.default)(contact, tags);
				},
				changeType: function changeType(type, evt) {
					evt.preventDefault();
					this.donation_type = type;
				},
				handleSubmit: function handleSubmit(e) {
					e.preventDefault();
					this.getToken().then(this.onSubmit).fail(function (err) {
						return console.log('err validation');
					});
				}
			},

			template: '\n    <form method="post" class="donate_landing">\n      <div class="donate_landing__viewport">\n\t\t\t\n      <div class="donate_landing__section donate_landing__section-1">\n        <div class="donate_landing__section__title col-sm-12">\n          <h3 class="color-red">{{texts.sectionOne.title}}</h3>\n          <p>{{texts.sectionOne.content}}</p>\n        </div>\n      \n        <change-amount other="Other"></change-amount>\n\n          <div class="form-group col-md-7 col-sm-8" style="float: left">\n            <div class="input-group col-sm-12" >\n              <div class="input-group-addon">USD</div>\n              <input\n                type="text"\n                class="form-control"\n                v-model="amount"\n                v-el:amount-input\n                v-on:keyup="cleanNumber(\'amount\')"\n                placeholder="{{placeholders.amount}}"\n              >\n            </div>\n          </div>\n\n          <div class="col-md-5">\n            <a \n              href="#"\n              v-on:click="changeType(\'monthly\', $event)"\n              v-bind:class="[donation_type == \'monthly\' ? \'donate_landing__type donate_landing__type--active\' : \'donate_landing__type\' ]"\n            >\n              {{monthly}}\n            </a>\n            \n            <a\n              href="#" \n              v-on:click="changeType(\'once\', $event)"\n              v-bind:class="[donation_type == \'once\' ? \'donate_landing__type donate_landing__type--active\' : \'donate_landing__type\' ]"\n            >\n            {{once}}\n          </a>\n          </div>\n\n\n      </div> <!-- donate_landing__section-1 -->\n\n      <div class="stripe-info donate_landing__section donate_landing__section-2" >\n        <div class="donate_landing__section__title col-sm-12">\n          <h3 class="color-red">{{texts.sectionTwo.title}}</h3>\n          <p>{{texts.sectionTwo.content}}</p>\n        </div>\n\n           <div class="row">\n\n          <div class="form-group col-sm-12 donate_landing__cards">\n            <img \n              v-bind:class="{\'card-type--active\': card.Visa}" \n              class="card-type" \n              :src="cardSrc.Visa" \n            >\n\n            <img\n              v-bind:class="{\'card-type--active\': card.MasterCard}" \n              class="card-type" \n              :src="cardSrc.MasterCard" \n            >\n\n            <img \n              v-bind:class="{\'card-type--active\': card.DinersClub}" \n              class="card-type" \n              :src="cardSrc.DinersClub" \n            >\n            \n            <img \n              v-bind:class="{\'card-type--active\': card.AmericanExpress}" \n              class="card-type" \n              :src="cardSrc.AmericanExpress" \n            >\n\n            <img \n              v-bind:class="{\'card-type--active\': card.Discover}" \n              class="card-type" \n              :src="cardSrc.Discover" \n            >\n          </div>\n        \n        </div>\n\n        <div class="form-group col-sm-12">\n          <input\n            type="text"\n            v-on:keyup="[cleanNumber(\'stripe.number\'), maxLength(\'stripe.number\', 16), showCard(), cardValidation({type: \'validateCardNumber\', field: \'stripe.number\'})]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.number}"\n            v-model="stripe.number"\n            placeholder="{{placeholders.creditCard}}"\n          >\n\n          <span class="form-group__error" v-if="errors.stripe.number">\n            {{validationMessages.card}}\n          </span>\n        </div>\n\n        <div class="form-group col-xs-4">\n          <input\n            type="text"\n            v-on:keyup="[cleanNumber(\'stripe.exp_month\'), maxLength(\'stripe.exp_month\', 2), expiryValidation(\'month\')]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.exp_month}"\n            style="text-align: center;"\n            placeholder="{{placeholders.month}}"\n            v-model="stripe.exp_month"\n          >\n\n          <span class="form-group__error" v-if="errors.stripe.exp_month">\n            {{validationMessages.month}}  \n          </span> \n        </div>\n\n        <div class="form-group col-xs-4" >\n          <input\n            type="text"\n            v-on:keyup="[expiryValidation(\'year\'), cleanNumber(\'stripe.exp_year\'), maxLength(\'stripe.exp_year\', 2)]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.exp_year}"\n            style="text-align: center;"\n            placeholder="{{placeholders.year}}"\n            v-model="stripe.exp_year"\n          >\n\n           <span class="form-group__error" v-if="errors.stripe.exp_year">\n             {{validationMessages.year}}\n           </span>\n        </div>\n\n        <div class="form-group col-xs-4">\n          <input\n            type="text"\n            v-on:keyup="[cardValidation({type: \'validateCVC\', field: \'stripe.cvc\'}), cleanNumber(\'stripe.cvc\'), maxLength(\'stripe.cvc\', 4)]"\n            class="form-control form-control--outline"\n            v-bind:class="{\'form-group--error\': errors.stripe.cvc}"\n            style="text-align: center;"\n            v-model="stripe.cvc"\n            placeholder="{{placeholders.cvc}}"\n          >\n           <span class="form-group__error" v-if="errors.stripe.cvc">\n             {{validationMessages.cvc}}\n           </span>\n        </div>\n      </div><!-- donate_landing__section-2 -->\n\n\n    <div class="donate_landing__section donate_landing__section-3" >\n      <div class="donate_landing__section__title col-sm-12">\n        <h3 class="color-red">{{texts.sectionThree.title}}</h3>\n        <p>{{texts.sectionThree.content}}</p>\n      </div>\n        <div class="col-sm-12">\n          <div class="form-group ">\n            <input\n\t\t\t\t\t\t\tv-on:keyup="validateContact(\'name\')"\n              type="text"\n              name="name"\n              class="form-control form-control--outline"\n\t\t\t\t\t\t\tv-bind:class="{\'form-group--error\': errors.contact.name}"\n              placeholder="{{placeholders.name}}"\n              v-model="contact.name"\n              >\n               <span class="form-group__error" v-if="errors.contact.name">\n                 {{validationMessages.name}}\n              </span>\n          </div>\n        </div>\n\n        <div class="col-sm-12">\n          <div class="form-group">\n            <input\n\t\t\t\t\t\t\tv-on:keyup="validateContact(\'email\')"\n              type="text"\n              name="email"\n              class="form-control form-control--outline"\n\t\t\t\t\t\t\tv-bind:class="{\'form-group--error\': errors.contact.email}"\n              placeholder="{{placeholders.email}}"\n              v-model="contact.email"\n            >\n\n            <span class="form-group__error" v-if="errors.contact.email">\n               {{validationMessages.email}}\n            </span>\n          </div>\n        </div>\n\n        <div class="col-sm-12">\n          <div class="form-group">\n            <select \n\t\t\t\t\t\t\tclass="form-control form-control--outline"\n\t\t\t\t\t\t\tv-bind:class="{\'form-group--error\': errors.contact.country}"\n\t\t\t\t\t\t\tname="country" \n\t\t\t\t\t\t\tv-model="contact.country"\n\t\t\t\t\t\t>\n                <option value="{{country}}" v-for="country in countries">{{country}}</option>\n            </select>\n            <span class="form-group__error" v-if="errors.contact.country">\n               {{validationMessages.country}}\n            </span>\n          </div>\n        </div>\n  \n      <div class="col-md-12 form-group">\n        \n        <button \n          class="donate_landing__submit pull-left" \n          v-on:click.prevent="handleSubmit" \n          :disabled="loading"\n        >\n          {{loading ? placeholders.loading : texts.sectionThree.btn}}\n        </button>\n        <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>\n      </div>\n\n\t\t\t<div class="form-group col-sm-12">\n\t\t\t\t<div class="alert alert-danger" v-if="declined">\n\t\t\t\t\t{{validationMessages.declined}}\n\t\t\t\t</div>\n\t\t\t</div>\n    </div><!-- donate_landing__section-3 -->\n    </div><!-- viewport -->\n\n  </div> <!-- success -->\n\n   <div class="form-group col-sm-12" v-if="section == 1">\n      <a style="padding-top: 30px" v-bind:href="link.anchor">\n        <h4 class="color-red">{{link.text}}</h4> <i class="ion-chevron-down color-red"></i>\n      </a>\n    </div>\n\n  </form>\n\n  </div>\n\t'
		};
	};

/***/ },
/* 112 */,
/* 113 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createInfusionContact;
	function createInfusionContact(contact, tags) {
		return $.ajax({
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: { action: 'infusion_contact', data: _extends({}, contact, { tags: tags }) }
		});
	}

/***/ }
/******/ ]);