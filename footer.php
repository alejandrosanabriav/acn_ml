<div id="sidr">

  <!-- Your content -->
  <button class="close"><?php echo getT('Close') ?></button>

  <ul>
    <?php
      $args = array(
        'theme_location' => 'header',
        'container' => false,
        'echo' => false
      );
      $menu = wp_nav_menu($args);
      echo clean_menu($menu);
     ?>
  </ul>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<script src="https://js.stripe.com/v2/"></script>
<script src="https://cdn.jsdelivr.net/flexslider/2.6.3/jquery.flexslider.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sidr/2.2.1/jquery.sidr.min.js"></script>

<script type="text/javascript">

deferScript("<?php echo get_template_directory_uri() . '/public/js/app.js' ?>");

function deferScript(src) {
	function downloadJSAtOnload() {
	var element = document.createElement("script");
	element.src = src;
	document.body.appendChild(element);
}

	if (window.addEventListener)
		window.addEventListener("load", downloadJSAtOnload, false);
	else if (window.attachEvent) {
		window.attachEvent("onload", downloadJSAtOnload);
	} else {
		window.onload = downloadJSAtOnload;
	} 
}

</script>

<!--wordpress scripts insertion-->
<?php wp_footer() ?>

</body>
</html>
