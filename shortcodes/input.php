<div class="input-container">
  <?php if(!empty($at['label'])): ?>
    <label for=""><?php echo $at['label'] ?></label>
  <?php endif; ?>

  <input 
    type="text"
    placeholder="<?php echo $at['placeholder'] ?>" 
    name="<?php echo $at['id'] ?>"
    data-validate="required|email"
  />
  
</div>
