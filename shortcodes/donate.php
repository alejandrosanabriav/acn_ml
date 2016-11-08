
  <donate-landing
    donation_type="monthly"
    url="<?php echo get_template_directory_uri() ?>"
    captcha_name="recaptcha-monthly"
    >
  </donate-landing>

  <template id="change-amount-template">
    <ul class="change-amount" style="padding: 0 15px">
      <li><a href="#" @click="changeAmount(10, $event)">$10</a></li>
      <li><a href="#" @click="changeAmount(30, $event)">$30</a></li>
      <li><a href="#" @click="changeAmount(50, $event)">$50</a></li>
      <li><a href="#" @click="changeAmount(100, $event)">$100</a></li>
      <li><a href="#" @click="changeAmount('', $event)"><?php echo gett('Other') ?></a></li>
    </ul>
  </template>

  <template id="donate-landing-template">
    <div v-if="!success">

    <form method="post" class="donate_landing">


      <div class="donate_landing__viewport">
      <div class="donate_landing__section donate_landing__section-1">
        <change-amount></change-amount>

          <div class="form-group col-sm-8" style="float: left">
            <div class="input-group col-sm-12" >
              <div class="input-group-addon" style="font-weight: 700; font-size: 30px">USD</div>
              <input
              type="text"
              class="form-control"
              style="font-size: 30px"
              v-model="amount"
              v-el:amount-input
              @keyup="cleanNumber('amount')"
              placeholder="<?php echo gett('Amount') ?>"
              >
            </div>
          </div>

          <div class="col-md-2">
            <div class="radio">
              <label>
                <input type="radio" value="monthly" v-model="donation_type"> <?php echo gett('Monthly') ?>
              </label>
            </div>

            <div class="radio">
              <label>
                <input type="radio" value="once" v-model="donation_type"> <?php echo gett('Once') ?>
              </label>
            </div>

          </div>

        <button class="donate_landing__submit" @click.prevent="nextSection">

          <svg width="47px" height="42px" viewBox="-3 12 47 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M36.9462953,18.3948561 C35.920883,17.3453321 34.6973083,16.4970205 33.3463434,15.9110899 C31.9890876,15.326769 30.5012962,15 28.9348689,15 C27.3747325,15 25.8885138,15.4024249 24.5296853,16.1123023 C23.1787204,16.8173507 21.9567184,17.8298516 20.9297334,19.0371262 C20.6482169,19.3719437 20.3824275,19.7260776 20.1307926,20.0882599 C19.8791577,19.7244679 19.614941,19.3719437 19.3334245,19.0371262 C18.3080122,17.8298516 17.0844375,16.8173507 15.7334726,16.1123023 C14.3762168,15.4024249 12.8884254,15 11.3219981,15 C9.76186169,15 8.26935214,15.326769 6.91681452,15.9110899 C5.55955873,16.4970205 4.34384759,17.3453321 3.31686262,18.3948561 C2.29145038,19.4459898 1.4626279,20.6902875 0.890158485,22.0794581 C0.319261789,23.4637996 0,24.9914044 0,26.5882263 C0,28.1914869 0.319261789,29.7142626 0.890158485,31.1034332 C1.4626279,32.486165 2.29145038,33.7385112 3.31686262,34.7880352 C4.34384759,35.8311204 18.7751095,49.1803579 20.1323653,49.7727273 C21.4833302,49.1803579 35.920883,35.8311204 36.9462953,34.7880352 C37.9654166,33.7385112 38.7958118,32.486165 39.3729994,31.1034332 C39.9438961,29.7142626 40.2631579,28.1914869 40.2631579,26.5882263 C40.2631579,24.9914044 39.9438961,23.4637996 39.3729994,22.0794581 C38.7958118,20.6902875 37.9654166,19.4459898 36.9462953,18.3948561 Z" id="Page-1" stroke="#FC3938" stroke-width="6" fill="none"></path>
          </svg>
          <?php echo gett('Donate') ?>
        </button>

      </div> <!-- donate_landing__section-1 -->

      <div class="stripe-info donate_landing__section donate_landing__section-2" >
        <h6 style="text-transform: uppercase; text-align: left; margin-left:15px"> USD ${{amount}} • {{donation_type}}</h6>

        <div class="form-group col-sm-12">
          <input
          type="text"
          @keyup="[cleanNumber('stripe.number'), maxLength('stripe.number', 16)],showCard()"
          class="form-control form-control--outline"
          style="font-size: 30px"
          id="exampleInputAmount"
          v-model="stripe.number"
          placeholder="<?php echo gett('Credit Card Number') ?>"
          >
        </div>

        <div class="row">

        <div class="form-group col-sm-6 donate_landing__cards">
          <img v-bind:class="{'card-type--active': card.Visa}" class="card-type" src="<?php echo get_template_directory_uri() ?>/public/img/cards/Visa.png" alt="">
          <img v-bind:class="{'card-type--active': card.MasterCard}" class="card-type" src="<?php echo get_template_directory_uri() ?>/public/img/cards/MasterCard.png" alt="">
          <img v-bind:class="{'card-type--active': card.DinersClub}" class="card-type" src="<?php echo get_template_directory_uri() ?>/public/img/cards/DinersClub.png" alt="">
          <img v-bind:class="{'card-type--active': card.AmericanExpress}" class="card-type" src="<?php echo get_template_directory_uri() ?>/public/img/cards/AmericanExpress.png" alt="">
          <img v-bind:class="{'card-type--active': card.Discover}" class="card-type" src="<?php echo get_template_directory_uri() ?>/public/img/cards/Discover.png" alt="">
        </div>
        <div class="form-group col-sm-6">

        </div>
          </div>
        <div class="form-group col-xs-4">
          <input
          type="text"
          @keyup="[cleanNumber('stripe.exp_month'), maxLength('stripe.exp_month', 2)]"
          class="form-control form-control--outline"
          style="text-align: center; font-size: 30px"
          placeholder="<?php echo gett('MM') ?>"
          v-model="stripe.exp_month"
          >
        </div>

        <div class="form-group col-xs-4" >
          <input
          type="text"
          @keyup="[cleanNumber('stripe.exp_year'), maxLength('stripe.exp_year', 2)]"
          class="form-control form-control--outline"
          style="text-align: center; font-size: 30px"
          placeholder="<?php echo gett('YY') ?>"
          v-model="stripe.exp_year"
          >
        </div>

        <div class="form-group col-xs-4">
          <input
          type="text"
          @keyup="[cleanNumber('stripe.cvc'), maxLength('stripe.cvc', 4)]"
          class="form-control form-control--outline"
          style="text-align: center; font-size: 30px"
          v-model="stripe.cvc"
          placeholder="<?php echo gett('CVC') ?>"
          >
        </div>
        <div class="col-md-12">
          <div class="donate_landing__alert-danger alert alert-danger" v-if="errors">
            <span v-if="errors.amount"><?php echo gett('Amount') . ' ' . gett('required') ?>, </span>
            <span v-if="errors.number"><?php echo gett('Credit Card Number') . ' ' . gett('incorrect') ?>, </span>
            <span v-if="errors.exp_month"><?php echo gett('Month') . ' ' . gett('incorrect') ?>, </span>
            <span v-if="errors.exp_year"><?php echo gett('Year') . ' ' . gett('incorrect') ?>, </span>
            <span v-if="errors.cvc"><?php echo gett('CVC') . ' ' . gett('incorrect') ?></span>
            <span v-if="errors.captcha"><?php echo gett('Captcha') . ' ' . getT('required') ?></span>
            <span v-if="errors.stripe">{{errors.stripe}}</span>
          </div>
        </div>
        
        <div class="col-md-12">

            <button class="donate_landing__submit donate_landing__submit-get_token" @click.prevent="getToken" :disabled="loading">
              <?php echo getT('PAYMENT INFO >') ?>
            </button>
            <button @click.prevent="backSection" class="donate_landing__back"><?php echo getT('Back') ?></button>
            </div>
      </div><!-- donate_landing__section-2 -->


    <div class="donate_landing__section donate_landing__section-3" >
      <h6 style="text-transform: uppercase; text-align: left; margin-left:15px"> USD ${{amount}} • {{donation_type}}</h6>
        <div class="col-sm-12">
          <div class="form-group ">
            <input
              type="text"
              name="name"
              class="form-control form-control--outline"
              placeholder="<?php echo getT('Name') ?>"
              v-model="contact.name"
              >
          </div>
        </div>

        <div class="col-sm-12">
          <div class="form-group">
            <input
              type="text"
              name="email"
              class="form-control form-control--outline"
              placeholder="<?php echo getT('Email') ?>"
              v-model="contact.email"
            >
          </div>
        </div>


        <div class="col-sm-12">
          <div class="form-group">
            <select class="form-control form-control--outline" name="country" v-model="contact.country">
              <?php if(getCountry() != "default"): ?>
                <option value="<?php echo getCountry() ?>" selected><?php echo getCountry() ?></option>
              <?php else: ?>
                <option value="" selected><?php echo getT("Country") ?></option>
              <?php endif; ?>

              <option value="" selected><?php echo getT('Country') ?></option>
                <?php foreach(getCountries() as $country): ?>
                  <option value="<?php echo $country; ?>"><?php echo $country; ?></option>
                <?php endforeach; ?>
            </select>
          </div>
        </div>


          <div class="col-md-12">
            <div class="donate_landing__alert-danger alert alert-danger" v-if="errors">
              <span v-if="errors.name"><?php echo gett('Name') . ' ' . gett('required') ?>, </span>
              <span v-if="errors.email"><?php echo gett('Email') . ' ' . gett('required') ?>, </span>
              <span v-if="errors.country"><?php echo gett('Country') . ' ' . gett('required') ?>, </span>
            </div>
          </div>

    

      <div class="col-md-12">
        <button @click.prevent="backSection" class="donate_landing__back"><?php echo gett('Back') ?></button>
        <button class="donate_landing__submit" @click.prevent="onSubmit" :disabled="loading">
          <?php echo gett('Donate') ?>
        </button>
      </div>
    </div><!-- donate_landing__section-3 -->
    </div><!-- viewport -->

      </div> <!-- success -->
  </form>

  </div>

  <div class="alert alert-success" style="text-align: center" v-if="success">
    <h2><?php echo gett('Thanks for your support; your donation enable us to continue helping those in need !. For any information regarding your gift, you may contact us to info@acnmercy.org') ?></h2>
  </div>

  </template>

  <script>
   var BS = {};

     BS['trans'] = {
       'stripeErrors': {
         'card': "<?php echo gett('card number incorrect') ?>",
         'expiry': "<?php echo gett('expiry incorrect') ?>",
         'cvc': "<?php echo gett('cvc incorrect') ?>",
       }
     };

  </script>
