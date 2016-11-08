<script type="text/x-template" id="steps-template">
  <div class="steps">
    <?php echo do_shortcode($content) ?>
  </div>
</script>

<script type="text/x-template" id="step-template">
  <div class="steps__step">
   
  </div>
</script>

<bs-steps>
  <bs-step step="1"> im a step 1</bs-step>
  <bs-step step="2"> im a step 2</bs-step>
  <bs-step step="1">< im a step 3</bs-step>
</bs-steps>
