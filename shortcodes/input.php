<div class="input_container">
  <?php if(!empty($at['label'])): ?>
    <label for=""><?php echo $at['label'] ?></label>
  <?php endif; ?>
  <div class="input__errors"></div>
  <input
    type="text"
    class="form-control"
    placeholder="<?php echo $at['placeholder'] ?>" 
    name="<?php echo $at['id'] ?>"
    data-validate="<?php echo $at['validate'] ?>"
    data-messages="<?php echo $at['messages'] ?>"
  />
  
</div>
