<?php
function bs_donate_react_sc($atts, $content = null) {
	ob_start();
?>

<div id="bs-donate-react" ></div>

<?php
return ob_get_clean();
}

add_shortcode('bs_donate_react', 'bs_donate_react_sc');