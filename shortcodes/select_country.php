<?php
  include_once str_replace('shortcodes', '',  __DIR__) . 'lib/countries.php';
?>

<div class="input_container">
  <?php if(!empty($at['label'])): ?>
    <label for=""><?php echo $at['label'] ?></label>
  <?php endif; ?>
  <div class="input__errors"></div>

  <select
    class="form-control"
    name="<?php echo $at['id'] ?>"
    data-validate="<?php echo $at['validate'] ?>"
    data-messages="<?php echo $at['messages'] ?>"
  >

    <option value=""><?php echo $at['placeholder'] ?></option>
    <?php foreach(getCountries() as $country): ?>
      <option value="<?php echo $country ?>"><?php echo $country ?></option>
    <?php endforeach; ?>
  </select>

</div>
