<form action="" class="bs_donate_form">
<input type="hidden" name="token" />
<input type="hidden" name="step" value="1" />

  <div class="row">
    <div class="bs_donate_form__step bs_donate_form__step-1">
      <div class="col-md-12">
        <div class="input-container">
          <button class="btn" data-amount="10">10</button>
          <button class="btn" data-amount="30">30</button>
          <button class="btn" data-amount="50">50</button>
          <button class="btn" data-amount="100">100</button>
          <button class="btn" data-amount="">Other</button>
        </div>
      </div>
      
      <div class="col-sm-6">
        <div class="input_container">
          <input type="text" name="amount" class="input" placeholder="Amount">
        </div>
      </div>

      <div class="col-sm-6">
        <a href="#" data-type="monthly">Monthly</a>
        <a href="#" data-type="once">Once</a>
        <input type="hidden" name="type" value="monthly">
      </div>
    </div>
  </div>

  <div class="bs_donate_form__step bs_donate_form__step-2">
    <div class="col-md-12">
      <div class="input_container">
        <input type="text" name="number" class="input" placeholder="Number">
      </div>
    </div>
    
    <div class="col-sm-4">
      <div class="input_container">
        <input type="text" name="exp_month" class="input" placeholder="Month">
      </div>
    </div>
    
    <div class="col-sm-4">
      <div class="input_container">
        <input type="text" name="exp_year" class="input" placeholder="Year">
      </div>
    </div>

    <div class="col-sm-4">
      <div class="input_container">
        <input type="text" name="cvc" class="input" placeholder="CVC">
      </div>
    </div>
  </div>

  <div class="bs_donate_form__step bs_donate_form__step-3">
      <div class="col-md-12">
      <div class="input_container">
        <input type="text" name="name" class="input" placeholder="Name">
      </div>
    </div>

     <div class="col-md-12">
      <div class="input_container">
        <input type="text" name="email" class="input" placeholder="Email">
      </div>
    </div>
  </div>

  <button class="btn">Donate</button>
</form>
