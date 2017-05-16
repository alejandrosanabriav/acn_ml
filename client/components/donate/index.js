import React from "react";
import qs from "qs";
import request from "axios";
import Amount from "./amount";
import CreditCard from "./creditCard";
import Contact from "./contact";
const endpoint = "/wp-admin/admin-ajax.php";

class Donate extends React.Component {
  static defaultProps = { texts: {}, redirect: {} };

  state = {
    section: 0,
    left: 0,
    loading: false,
    donation_type: "monthly",
    amount: 30,
    currency: "usd",
    countries: [],
    contact: { name: "", email: "", country: "" },
    stripe: {
      card_type: "",
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
      token: ""
    },
    errors: { stripe: {}, contact: {} }
  };

  componentWillMount() {
    this.fetchCountries();
  }

  componentDidMount() {
    this.donateForm.addEventListener("keydown", e => {
      if (e.which == 9) {
        e.preventDefault();
        this.nextSection();
      }
    });
  }

  fetchCountries = () => {
    const data = qs.stringify({ action: "countries" });

    return request
      .post(endpoint, data)
      .then(res => {
        this.setState({ countries: res.data });
        return res.data;
      })
      .catch(err => err);
  };

  handleChange = field => {
    this.setState({ ...this.state, ...field });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.nextSection();
  };

  stripeToken = () => {
    let data = qs.stringify({
      action: "stripe_token",
      data: this.state.stripe
    });

    return request.post(endpoint, data).then(res => {
      if (res.data.id) {
        const stripe = { ...this.state.stripe, token: res.data.id };
        this.setState({ loading: false, stripe });
      }

      if (res.data.stripeCode) {
        this.setState({ loading: false, declined: true });
      }
    });
  };

  stripeCharge = () => {
    const {
      contact,
      currency,
      amount,
      donation_type,
      stripe: { token }
    } = this.state;

    const data = {
      ...contact,
      currency,
      amount,
      donation_type,
      stripe_token: token
    };

    const dataAjax = qs.stringify({ action: "stripe_charge", data });

    return request.post(endpoint, dataAjax);
  };

  storeConvertLoop = () => {
    const data = qs.stringify({
      data: this.state.contact,
      action: "convertloop_contact"
    });
    return request.post(endpoint, data);
  };

  storeEventConvertLoop = () => {
    const { email, country } = this.state.contact;
    const metadata = {
      amount: this.state.amount,
      type: this.state.donation_type
    };

    const event = {
      name: `Donation-${this.state.donation_type}`,
      person: { email },
      country,
      metadata
    };

    const data = qs.stringify({ data: event, action: "convertloop_event" });
    return request.post(endpoint, data);
  };

  storeInfusion = () => {
    let tags = "";
    if (this.state.donation_type == "monthly") tags = ["870", "924"];
    if (this.state.donation_type == "once") tags = ["868", "926"];
    const data = qs.stringify({
      data: { ...this.state.contact, tags },
      action: "infusion_contact"
    });
    return request.post(endpoint, data);
  };

  completeTransaction = (stripeResponse = {}) => {
    const { amount, donation_type } = this.state;
    const base = this.props.redirect[donation_type];
    const { customer, id } = stripeResponse;
    this.storeConvertLoop()
      .then(this.storeEventConvertLoop)
      .then(this.storeInfusion)
      .then(res => {
        const url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
        window.location = url;
      });
  };

  creditCardIsValid = () => {
    let errs = this.creditCard.allValidations();
    return Object.keys(errs.stripe).every(key => errs.stripe[key] == true);
  };

  contactIsValid = () => {
    let errs = this.contact.validateAll();
    return Object.keys(errs.contact).every(key => errs.contact[key] == true);
  };

  nextSection = () => {
    let section = this.state.section < 2 ? this.state.section + 1 : 2;

    if (this.state.section == 1) {
      if (!this.creditCardIsValid()) return false;
      this.stripeToken();
    }

    if (this.state.section == 2) {
      if (!this.contactIsValid()) return false;
      this.stripeCharge().then(res => this.completeTransaction(res.data));
    }

    let left = `-${section * 100}%`;

    if (this.state.section == 0) {
      this.setState({ section, left, loading: false });
    } else {
      this.setState({ section, left });
    }
  };

  prevSection = e => {
    e.preventDefault();
    let section = this.state.section >= 0 ? this.state.section - 1 : 0;
    let left = `-${section * 100}%`;
    this.setState({ section, left });
  };

  render() {
    let sectionWidth = `${100 / 3}%`;
    let viewPortStyle = { width: "300%", left: this.state.left };
    let donationTypeStyle = {
      display: "inline",
      marginLeft: "15px",
      color: "#fff"
    };

    let backBtnStyle = {
      float: "right",
      background: "transparent",
      border: "none"
    };

    return (
      <form
        onSubmit={this.handleSubmit}
        className="donate_react"
        ref={donate => (this.donateForm = donate)}
      >
        <div className="donate_react__viewport" style={viewPortStyle}>
          <Amount
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />

          <CreditCard
            ref={creditCard => (this.creditCard = creditCard)}
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />

          <Contact
            ref={contact => (this.contact = contact)}
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <button
            className="donate_react__submit pull-left"
            onClick={this.handleSubmit}
            disabled={this.state.loading}
          >
            {this.state.section == 1
              ? this.props.texts.next
              : this.props.texts.donate}
          </button>
          <span style={donationTypeStyle}>
            {`${this.state.amount} USD ${this.props.texts[this.state.donation_type]}`}
          </span>
          {this.state.section > 0
            ? <button style={backBtnStyle} onClick={this.prevSection}>
                {this.props.texts.back}
              </button>
            : ""}
        </div>
      </form>
    );
  }
}

export default Donate;
