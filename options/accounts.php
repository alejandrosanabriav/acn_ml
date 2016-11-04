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
  register_setting( 'bs_accounts_info_group', 'mailchimp_list_id' );
  register_setting( 'bs_accounts_info_group', 'stripe_key_private' );
  register_setting( 'bs_accounts_info_group', 'stripe_key_public' );
}

function bs_accounts_options() {
?>
<div style="padding: 15px; margin: 15px; background: #fff; box-shadow: 1px 1px 5px rgba(0,0,0, .1);">

  <h1>Accounts keys</h1>
  <hr/>
  <p></p>
  <form method="post" action="options.php" style="position: relative; margin: 0 auto">
    <?php settings_fields( 'bs_accounts_info_group' ); ?>
    <?php do_settings_sections( 'bs_accounts_info_group' ); ?>

    <p>
       <label for=""> <b>Mailchimp key</b> </label>
        <br>
        <input 
          style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
          type="text"
          name="mailchimp_api"
          placeholder="Api Key" 
          value="<?php echo get_option('mailchimp_api') ?>"
          >
    </p>

     <p>
       <label for=""> <b>Mailchimp List id</b> </label>
        <br>
        <input 
          style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
          type="text"
          name="mailchimp_list_id"
          placeholder="list id"
          value="<?php echo get_option('mailchimp_list_id') ?>"
          >
    </p>

    <p>
       <label for=""> <b>Stripe Private key</b> </label>
       <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="stripe_key_private"
        placeholder="Private Api Key" 
        value="<?php echo get_option('stripe_key_private') ?>"
        >
    </p>

    <p>
      <label for=""> <b>Stripe Public Key</b>  </label>
       <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="stripe_key_public"
        placeholder="Public Api Key" 
        value="<?php echo get_option('stripe_key_public') ?>"
        >
    </p>
    <p>
      <?php submit_button(); ?>
    </p>
    	
  </form>
</div>

<?php
}