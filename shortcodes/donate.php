<script type="text/template" id="donate-landing-template">

    <form method="post" class="donate_landing">
      <div class="donate_landing__viewport">

      <div class="donate_landing__section donate_landing__section-1">
        <div class="donate_landing__section__title col-sm-12">
          <h3 class="color-red">{{texts.section1.title}}</h3>
          <p>{{texts.section1.content}}</p>
        </div>
      
        <change-amount></change-amount>

          <div class="form-group col-md-7 col-sm-8" style="float: left">
            <div class="input-group col-sm-12" >
              <div class="input-group-addon">USD</div>
              <input
                type="text"
                class="form-control"
                v-model="amount"
                v-el:amount-input
                v-on:keyup="cleanNumber('amount')"
                placeholder="<?php echo gett('Amount') ?>"
              >
            </div>
          </div>

          <div class="col-md-5">
            <a 
              href="#" 
              v-on:click="changeType('monthly', $event)"
              v-bind:class="[donation_type == 'monthly' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type' ]"
            ><?php echo gett('Monthly') ?></a>
            
            <a 
              href="#" 
              v-on:click="changeType('once', $event)"
              v-bind:class="[donation_type == 'once' ? 'donate_landing__type donate_landing__type--active' : 'donate_landing__type' ]"
            ><?php echo gett('Once') ?></a>
          </div>

        <div class="col-xs-12">
          <button class="donate_landing__submit pull-left" v-on:click.prevent="nextSection">
            <?php echo gett('Donate') ?>
          </button>

          <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>
        </div>
      </div> <!-- donate_landing__section-1 -->

      <div class="stripe-info donate_landing__section donate_landing__section-2" >
        <div class="donate_landing__section__title col-sm-12">
          <h3 class="color-red"><?php echo $at['section_title_2'] ?></h3>
          <p ><?php echo $at['section_content_2'] ?></p>
        </div>
           <div class="row">

          <div class="form-group col-sm-12 donate_landing__cards">
            <img 
              v-bind:class="{'card-type--active': card.Visa}" 
              class="card-type" 
              src="<?php echo get_template_directory_uri() ?>/public/img/cards/Visa.png" 
            >

            <img
              v-bind:class="{'card-type--active': card.MasterCard}" 
              class="card-type" 
              src="<?php echo get_template_directory_uri() ?>/public/img/cards/MasterCard.png" 
            >

            <img 
              v-bind:class="{'card-type--active': card.DinersClub}" 
              class="card-type" 
              src="<?php echo get_template_directory_uri() ?>/public/img/cards/DinersClub.png" 
            >
            
            <img 
              v-bind:class="{'card-type--active': card.AmericanExpress}" 
              class="card-type" 
              src="<?php echo get_template_directory_uri() ?>/public/img/cards/AmericanExpress.png" 
            >
            <img 
              v-bind:class="{'card-type--active': card.Discover}" 
              class="card-type" 
              src="<?php echo get_template_directory_uri() ?>/public/img/cards/Discover.png" 
            >
          </div>
        
        </div>

        <div class="form-group col-sm-12">
          <input
          type="text"
          v-on:keyup="[cleanNumber('stripe.number'), maxLength('stripe.number', 16)],showCard()"
          class="form-control form-control--outline"
          v-bind:class="{'form-group--error': errors.number}"
          id="exampleInputAmount"
          v-model="stripe.number"
          placeholder="<?php echo gett('Credit Card Number') ?>"
          >

           <span class="form-group__error" v-if="errors.number"><?php echo gett('Credit Card Number') . ' ' . gett('incorrect') ?></span>
        </div>

        <div class="form-group col-xs-4">
          <input
            type="text"
            v-on:keyup="[cleanNumber('stripe.exp_month'), maxLength('stripe.exp_month', 2)]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.exp_month}"
            style="text-align: center;"
            placeholder="<?php echo gett('MM') ?>"
            v-model="stripe.exp_month"
          >

          <span class="form-group__error" v-if="errors.exp_month"><?php echo gett('Month') . ' ' . gett('incorrect') ?></span> 
        </div>

        <div class="form-group col-xs-4" >
          <input
            type="text"
            v-on:keyup="[cleanNumber('stripe.exp_year'), maxLength('stripe.exp_year', 2)]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.exp_year}"
            style="text-align: center;"
            placeholder="<?php echo gett('YY') ?>"
            v-model="stripe.exp_year"
          >

           <span class="form-group__error" v-if="errors.exp_year"><?php echo gett('Year') . ' ' . gett('incorrect') ?></span>
        </div>

        <div class="form-group col-xs-4">
          <input
            type="text"
            v-on:keyup="[cleanNumber('stripe.cvc'), maxLength('stripe.cvc', 4)]"
            class="form-control form-control--outline"
            v-bind:class="{'form-group--error': errors.cvc}"
            style="text-align: center;"
            v-model="stripe.cvc"
            placeholder="<?php echo gett('CVC') ?>"
          >
           <span class="form-group__error" v-if="errors.cvc"><?php echo gett('CVC') . ' ' . gett('incorrect') ?></span>
        </div>

        <div class="col-md-12">
            <button 
              class="donate_landing__submit donate_landing__submit-get_token pull-left" 
              v-on:click.prevent="getToken" 
              :disabled="loading"
            >
              <?php echo getT('NEXT') ?>
            </button>

             <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>

            <button v-on:click.prevent="backSection" class="donate_landing__back pull-right"> < {{backText}}</button>
            </div>
      </div><!-- donate_landing__section-2 -->


    <div class="donate_landing__section donate_landing__section-3" >
      <div class="donate_landing__section__title col-sm-12">
        <h3 class="color-red">
          <?php echo $at['section_title_3'] ?>
        </h3>
        <p><?php echo $at['section_content_3'] ?></p>
      </div>
        <div class="col-sm-12">
          <div class="form-group ">
            <input
              type="text"
              name="name"
              class="form-control form-control--outline"
              placeholder="<?php echo getT('Name') ?>"
              v-model="contact.name"
              >
               <span class="form-group__error" v-if="errors['contact.name']"><?php echo $at['validation_name'] ?></span>
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

            <span class="form-group__error" v-if="errors['contact.email']"><?php echo $at['validation_email'] ?></span>
          </div>
        </div>

        <div class="col-sm-12">
          <div class="form-group">
            <select class="form-control form-control--outline" name="country" v-model="contact.country">
                <option value="{{country}}" v-for="country in countries">{{country}}</option>
            </select>
            <span class="form-group__error" v-if="errors['contact.country']"><?php echo $at['validation_countries'] ?></span>
          </div>
        </div>
  
      <div class="col-md-12">
        
        <button class="donate_landing__submit pull-left" v-on:click.prevent="onSubmit" :disabled="loading">
          <?php echo gett('Donate') ?>
        </button>
        <span class="donate_landing__info pull-left">{{amount}} USD {{donation_type}}</span>
        <button v-on:click.prevent="backSection" class="donate_landing__back pull-right">{{backText}}</button>
      </div>
    </div><!-- donate_landing__section-3 -->
    </div><!-- viewport -->

  </div> <!-- success -->
  <div class="form-group col-xs-12">
    <div class="pro-bar">
      <div class="pro-bar__status" v-bind:style="{width: progress}"></div>
    </div>
  </div>

   <div class="form-group col-sm-12">
      <a style="padding-top: 30px" href="<?php echo $at['link_anchor'] ?>"><h4 class="color-red"><?php echo $at['link_text'] ?></h4> <i class="ion-chevron-down color-red"></i></a>
    </div>

  </form>

  </div>

  </script>

  <donate-landing
    donation_type="monthly"
    url="<?php echo get_template_directory_uri() ?>"
    currency="usd"
    country="<?php echo getCountry() ?>"
    back-text=<?php echo $at['back_text'] ?>
    validation-messages="{
      card: <?php echo $at['validation_card'] ?>, 
      expiry: <?php echo $at['validation_expiry'] ?>, 
      cvc: <?php echo $at['validation_cvc'] ?>, 
      name: <?php echo $at['validation_name'] ?>, 
      email: <?php echo $at['validation_email'] ?>, 
      country: <?php echo $at['validation_country'] ?>
    }"
    texts="{
        section1: {
          title: <?php echo $at['section_title_1'] ?>,
          content: <?php echo $at['section_content_1'] ?>
        }
      }"
  >
  </donate-landing>
