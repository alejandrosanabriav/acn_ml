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
<div style="padding: 15px; margin: 15px; background: #fff; box-shadow: 1px 1px 5px rgba(0,0,0, .1);">

  <h1>Accounts keys</h1>
    
  <form method="post" action="options.php" style="position: relative; margin: 0 auto">
    <p>
        <input type="text" placeholder="Mailchimp Api Key" style="width: 50%">
    </p>
    <p>
      <input type="text" placeholder="Stripe Private Api Key" style="width: 50%">
    </p>

    <p>
      <input type="text" placeholder="Stripe Public Api Key" style="width: 50%">
    </p>
    <p>
      <?php submit_button(); ?>
    </p>
    	
  </form>
</div>

<?php
}