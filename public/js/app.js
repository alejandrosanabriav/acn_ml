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

	var _donate = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/donate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _donate2 = _interopRequireDefault(_donate);

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
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
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


/***/ }
/******/ ]);