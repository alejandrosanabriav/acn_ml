'use strict';
import _ from'lodash';
import moment from 'moment';
import gaEvents from '../ga_events';
import gaEcommerce from '../ga_ecommerce';
import validateStripe from '../stripe/validation.js';

// pk_test_kORhSnXY5TPJMXXY5Wwiugzy
// pk_live_VAx77ruuR7UJpxfSDzStBbm7

function debounce(fn, delay) {
    var delayed;

    return function(e) {
        clearTimeout(delayed);
        delayed = setTimeout(function() {
            fn(e);
        }, delay);
    };
}

function addStylesToNodes() {
  let nodes = document.querySelectorAll('.donate_landing__section');
  let count = 100 / nodes.length;
  if(nodes.length) {
    Array.prototype.slice.call(nodes).forEach(node => {
      node.style.width = count + '%';
      node.style.float = 'left';
    });
  }
}

function showFirstNode() {
  let firstNode = document.querySelector('.donate_landing__section');
  firstNode.style.display = 'block';
}

function setViewportWidth() {
  let nodes = document.querySelectorAll('.donate_landing__section');
  let form = document.querySelector('.donate_landing');
  let viewport = document.querySelector('.donate_landing__viewport');
  let num = nodes.length;
  let width = form.offsetWidth;

  // viewport.style.width = `${num * width}px`;
  viewport.style.width = `300%`;
}

function configForm() {
  addStylesToNodes();
  showFirstNode();
  setViewportWidth();
}


let componentData = {
  donation_type: 'monthly',
  errors: null,
  success: false,
  loading: false,
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
    country: null,
    stripe_token: null
  },
  card: {
    Visa: false,
    MasterCard: false,
    DinersClub: false,
    AmericanExpress: false,
    Discover: false
  },

  captcha: null,
  created_at: moment().format(),
  amount: 30,
  section: 1
};

export default {
  template: "#donate-landing-template",

  props: [
    'captcha_name',
    'url'
  ],

  data() {
    return $.extend(true, {}, componentData);
  },

  ready() {
    configForm();
    document.addEventListener('resize', e => console.log(e));
  },

  computed: {
    cardType() {
      let type = Stripe.card.cardType(this.stripe.number).replace(" ", "");
      return type;
    }
  },

  events: {
    'focus-amount': function () {
      this.amount = 1;
      this.$els.amountInput.focus();
    }
  },

  methods: {
    showCard() {
      Object.keys(this.card).map(key => {
        if(key === this.cardType) {
          return this.card[key] = true;
        } else {
          return this.card[key] = false;
        }
      });
    },

    cleanNumber(keypath) {
      let val = this.$get(keypath);
      this.$set(keypath, val.replace(/[^0-9]+/, ''));
    },

    maxLength(keypath, length) {
      let val = this.$get(keypath);
      this.$set(keypath, val.substring(0, length));
    },

    isRequired(keypath) {
      let error = {};
      let val = this.$get(keypath) ? this.$get(keypath) : '';

      if(val === "") {
         error[keypath] = true;
      } else {
        error[keypath] = false;
      }

      return error;
    },

    createToken() {
      let stripeData = {
        number: this.stripe.number,
        cvc: this.stripe.cvc,
        exp_month: this.stripe.exp_month,
        exp_year: this.stripe.exp_year
      };

      this.toggleLoading();

      //send wp_ajax to get token
    },

    handleToken(status, response) {
      this.toggleLoading();

      if(response.id) {
        this.stripe.token = response.id;
        this.nextSection();
      }

      if(response.error) {
        this.errors = {stripe: response.error.message};
      }
    },

    contactValidations() {
      let fields = [
        'contact.name',
        'contact.email',
        'contact.country'
      ];

      let errors = {};

      fields.forEach((key) => {
        errors = _.extend(errors, this.isRequired(key));
      });

      this.errors = errors;

    },

    showErrors() {
      let errorAmount = this.isRequired('amount');
      this.errors = _.extend(validateStripe(this.stripe).errors, errorAmount);
    },

    removeErrors() {
      this.errors = null;
    },

    toggleLoading() {
      this.loading = !this.loading;
    },

    cleanData() {
      this.stripe = _.extend(this.stripe, componentData.stripe);
      this.contact = _.extend(this.contact, componentData.contact);

    },

    getToken(e) {
      e.preventDefault();

      if(validateStripe(this.stripe).success) {
        this.removeErrors();
        this.createToken();
      } else {
        this.showErrors();
      }
    },

    onSubmit(e) {
      e.preventDefault();

      this.contactValidations();

      let data = _.extend(this.contact, {
        amount: this.amount,
        donation_type: this.donation_type,
        stripe_token: this.stripe.token,
      });

      this.toggleLoading();

      $.ajax({
        url: this.url,
        type: 'POST',
        data: data,
        beforeSend: () => {
          this.removeErrors();
        }
      })
      .then(this.handleSubmitResponse);

    },

    sendEccomerceData(response) {
      if(this.donation_type == 'monthly') {
        gaEvents.donateMonthly();
        if(gaEcommerce) gaEcommerce(response.stripe.id, null, this.amount);
        if(fbq) fbq('track', 'Purchase', {value: this.amount, currency: 'EUR'});

      }

      if(this.donation_type == 'once') {
        gaEvents.donateUnique();
        if(gaEcommerce) gaEcommerce(response.stripe.id, null, this.amount);
        if(fbq) fbq('track', 'Purchase', {value: this.amount, currency: 'EUR'});
      }
    },

    handleSubmitResponse(res) {
      let response = {};

      try {
        response = JSON.parse(res);
      } catch (e) {
        this.removeErrors();
        console.log('donate response err: ', res);
      }

      this.toggleLoading();

      if(response.success) {
        this.removeErrors();
        this.success = true;
        this.sendEccomerceData(response);

        let subdata = `?customer_id=${response.stripe.customer}&order_revenue=${this.amount}&order_id=${response.stripe.id}&landing_thanks=true&landing_revenue=${this.amount}`;

        window.location = '/landing-thanks/' + subdata;

      } else if(response.errors) {
        this.errors = response.errors;
      }
    },

    nextSection() {
      let nodes = document.querySelectorAll('.donate_landing__section');

      let section = this.section;
      let nodeSection = document.querySelector(`.donate_landing__section-${section + 1}`);
      let height = nodeSection.offsetHeight;
      let form = document.querySelector('.donate_landing');


      let viewport = document.querySelector('.donate_landing__viewport');
      let width = form.offsetWidth;
      let next = section * 100;

      viewport.style.left = `-${next}%`;
      this.section = section + 1;
    },

    backSection() {
      let section = this.section;
      let nodeSection = document.querySelector(`.donate_landing__section-${section - 1}`);
      let height =  nodeSection.offsetHeight;
      let form = document.querySelector('.donate_landing');

      let viewport = document.querySelector('.donate_landing__viewport');
      let width = form.offsetWidth;
      let actual = width * (section - 1);
      let prev = actual - width;
        viewport.style.left = `-${prev}px`;
      this.section = section - 1;
    }
  }
};
