<?php
function bs_donate_react_sc($atts, $content = null) {
	 $at = shortcode_atts([
		 "other" => "Otro",
		 "monthly" => "Mensual",
		 "once" => "Una vez"
	 ], $atts);

	ob_start();
?>

<div id="bs-donate-react" data-props="{other: <?php echo $at['other'] ?>}"></div>

<?php
return ob_get_clean();
}

add_shortcode('bs_donate_react', 'bs_donate_react_sc');