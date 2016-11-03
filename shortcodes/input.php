<div class="input-container">
  <?php if(!empty($atts['label'])): ?>
    <label for=""><?php echo $atts['label'] ?></label>
  <?php endif; ?>
  <input 
    type="text" 
    placeholder="<?php echo $atts['placeholder'] ?>" 
    name="<?php echo $atts['id'] ?>" 
  />
  
</div>
