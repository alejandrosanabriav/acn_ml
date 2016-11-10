
  <donate-land
    donation_type="monthly"
    url="<?php echo get_template_directory_uri() ?>"
    captcha_name="recaptcha-monthly"
    currency="usd"
    >
  </donate-land>

  <template id="donate-land-template">


    <form method="post" class="donate_landing">

      <div class="donate_landing__viewport">
      <div class="donate_landing__section donate_landing__section-1">

          <div class="form-group col-sm-7" style="float: left">
            <button v-on:click="setFamilies('less', $event)" clas="pull-left">-</button>
              <h2 clas="pull-left">{{families}}</h2>
              <button v-on:click="setFamilies('more', $event)" clas="pull-left">+</button>
          </div>

          <div class="col-md-5">
            <a href="" 
              v-on:click="changeType('monthly', $event)"
              v-bind:class="[donation_type == 'monthly' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type' ]"
            ><?php echo gett('Monthly') ?></a>
            
            <a href="" 
              v-on:click="changeType('once', $event)"
              v-bind:class="[donation_type == 'once' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type' ]"
            ><?php echo gett('Once') ?></a>
          </div>
        <div class="col-md-12">
          <button class="donate_landing__submit pull-left" v-on:click.prevent="nextSection">
            <?php echo gett('Donate') ?>
          </button>

          <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>
        </div>

      </div> <!-- donate_landing__section-1 -->

      <div class="stripe-info donate_landing__section donate_landing__section-2" >
        <h6 style="text-transform: uppercase; text-align: left; margin-left:15px"> USD ${{amount}} • {{donation_type}}</h6>

        <div class="form-group col-sm-12">
          <input
          type="text"
          v-on:keyup="[cleanNumber('stripe.number'), maxLength('stripe.number', 16)],showCard()"
          class="form-control form-control--outline"
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
          v-on:keyup="[cleanNumber('stripe.exp_month'), maxLength('stripe.exp_month', 2)]"
          class="form-control form-control--outline"
          style="text-align: center;"
          placeholder="<?php echo gett('MM') ?>"
          v-model="stripe.exp_month"
          >
        </div>

        <div class="form-group col-xs-4" >
          <input
          type="text"
          v-on:keyup="[cleanNumber('stripe.exp_year'), maxLength('stripe.exp_year', 2)]"
          class="form-control form-control--outline"
          style="text-align: center;"
          placeholder="<?php echo gett('YY') ?>"
          v-model="stripe.exp_year"
          >
        </div>

        <div class="form-group col-xs-4">
          <input
          type="text"
          v-on:keyup="[cleanNumber('stripe.cvc'), maxLength('stripe.cvc', 4)]"
          class="form-control form-control--outline"
          style="text-align: center;"
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

            <button class="donate_landing__submit donate_landing__submit-get_token pull-left" v-on:click.prevent="getToken" :disabled="loading">
              <?php echo getT('PAYMENT INFO >') ?>
            </button>

            <button v-on:click.prevent="backSection" class="donate_landing__back pull-right"><?php echo getT('Back') ?></button>
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
        <button v-on:click.prevent="backSection" class="donate_landing__back pull-right"><?php echo gett('Back') ?></button>
        <button class="donate_landing__submit" v-on:click.prevent="onSubmit" :disabled="loading">
          <?php echo gett('Donate') ?>
        </button>
      </div>
    </div><!-- donate_landing__section-3 -->
    </div><!-- viewport -->

      </div> <!-- success -->
  </form>

 
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
