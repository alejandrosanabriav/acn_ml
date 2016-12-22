<?php
function bs_donate_react_sc($atts, $content = null) {
	 $at = shortcode_atts([
		 "other" => "Otro",
		 "monthly" => "Mensual",
		 "once" => "Una vez",
		 "placeholder_amount" => "Amount",
    "placeholder_credit_card" => "Credit Card Number",
    "placeholder_month" => "MM",
    "placeholder_year" => "YY",
    "placeholder_cvc" => "CVC",
    "placeholder_name" => "Name",
    "placeholder_email" => "Email",
    "placeholder_country" => "Country",
		"template_uri" => str_replace("http:", "", get_template_directory_uri())
	 ], $atts);

	ob_start();
?>

<div 
	id="bs-donate-react" 
	data-props='<?php echo json_encode($at) ?>'
>
</div>

<?php
return ob_get_clean();
}

add_shortcode('bs_donate_react', 'bs_donate_react_sc');