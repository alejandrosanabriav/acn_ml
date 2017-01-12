<?php

function bs_form_help_sc($atts, $content = null) {
	$at = shortcode_atts( array());

	  ob_start();
?>
	<div id="bs-help-form"></div>
<?php
	return ob_get_clean();
}


add_shortcode('bs_form_help', 'bs_form_help_sc');