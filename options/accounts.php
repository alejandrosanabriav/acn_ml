<?php
add_action('admin_menu', 'bs_admin_accounts_options_menu');

function bs_admin_accounts_options_menu() {
		add_menu_page(
    'Brandspa theme options',
    'Accounts info', //menu name
    'manage_options', //allow it options
    'bs-accounts', //slug
    'bs_accounts_options',
    get_template_directory_uri() . '/public/img/bs_options.png', //icon on menu
    111 //position on menu
  );

	//call register settings function on init admin page
	add_action( 'admin_init', 'bs_accounts_settings' );
}

function bs_accounts_settings() {
  register_setting( 'bs_accounts_info_group', 'mailchimp_api' );
  register_setting( 'bs_accounts_info_group', 'stripe_key_private' );
  register_setting( 'bs_accounts_info_group', 'stripe_key_public' );
}

function bs_accounts_options() {
?>
<div style="background: #f1f1f1; background-size: contain; padding: 15px">

<div style="text-align: center; text-shadow: 1px 1px 3px rgba(0,0,0, .1)"><h1>Offices</h1></div>
    
  <form method="post" action="options.php" style="position: relative; width: 80%; margin: 0 auto">
    <input type="text" placeholder="api key">
  </form>
</div>


<?php
}