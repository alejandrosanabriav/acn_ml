<form action="" class="bs_donate_form">
<input type="hidden" name="token" />
<input type="hidden" name="step" value="1" />

  <div class="row">
    <button class="button" data-amount="30">10</button>
    <button class="button" data-amount="30">30</button>
    <button class="button" data-amount="30">50</button>
    <button class="button" data-amount="100">100</button>
    <button class="button" data-amount="">Other</button>
  </div>

  <div class="row">
    <div class="bs_donate_form__step-1">
      <div class="col-sm-6">
        <div class="input-container">
          <input type="text" name="amout" class="input">
        </div>
      </div>

      <div class="col-sm-6">
        <a href="#" data-type="monthly">Monthly</a>
        <a href="#" data-type="once">Once</a>
        <input type="hidden" name="type" value="monthly">
      </div>
    </div>
  </div>
  <button>Donate</button>
</form>
