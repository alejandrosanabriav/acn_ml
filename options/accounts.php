<?php
add_action('admin_menu', 'bs_admin_accounts_options_menu');

function bs_admin_accounts_options_menu() {
		add_menu_page(
    'Brandspa theme options',
    'Accounts info', //menu name
    'manage_options', //allow it options
    'bs-accounts', //slug
    'bs_accounts_options',
    get_template_directory_uri() . '/public/img/bs.png', //icon on menu
    111 //position on menu
  );

	//call register settings function on init admin page
	add_action( 'admin_init', 'bs_accounts_settings' );
}

function bs_accounts_settings() {
  register_setting( 'bs_accounts_info_group', 'logo' );
  register_setting( 'bs_accounts_info_group', 'donate_link' );
  register_setting( 'bs_accounts_info_group', 'infusionsoft_key' );
  register_setting( 'bs_accounts_info_group', 'infusionsoft_subdomain' );
  register_setting( 'bs_accounts_info_group', 'infusionsoft_tags' );
  register_setting( 'bs_accounts_info_group', 'mailchimp_api' );
  register_setting( 'bs_accounts_info_group', 'mailchimp_list_id' );
  register_setting( 'bs_accounts_info_group', 'stripe_key_private' );
  register_setting( 'bs_accounts_info_group', 'stripe_key_public' );
  register_setting( 'bs_accounts_info_group', 'donate_monthly_redirect' );
  register_setting( 'bs_accounts_info_group', 'donate_once_redirect' );
  register_setting( 'bs_accounts_info_group', 'subscribe_redirect' );
  register_setting( 'bs_accounts_info_group', 'analytics_id' );
  register_setting( 'bs_accounts_info_group', 'gta_id' );
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
    	<label><b>Logo url</b></label>
      <br>		
			<input
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
				class="uploader"
				placeholder="logo"
				name="logo"
				value="<?php echo esc_attr( get_option('logo') ); ?>"
			/>
    </p>
    
    <p>
    	<label><b>Donate link</b></label>
       <br>	
			<input
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
				placeholder="url"
				name="donate_link"
				value="<?php echo esc_attr( get_option('donate_link') ); ?>"
			/>
    </p>
    

    <p>
      <label for=""><b>InfusionSoft key</b></label>
      <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="infusionsoft_key"
        placeholder="Api Key" 
        value="<?php echo get_option('infusionsoft_key') ?>"
      >
    </p>

     <p>
      <label for=""><b>InfusionSoft subdomain</b></label>
      <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="infusionsoft_subdomain"
        placeholder="Subdomain" 
        value="<?php echo get_option('infusionsoft_subdomain') ?>"
      >
    </p>

    <p>
      <label for=""><b>InfusionSoft tags</b></label>
      <p>You must Insert language site tag below</p>
      <ul>
        <li>874 =  ES</li>
        <li>876 = EN</li>
        <li>878 = IT</li>
        <li>880 = DE</li>
        <li>882 = DU</li>
        <li>884 = FR</li>
        <li>886 = PT</li>
        <li>888 =  KO</li>
      </ul>
      <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="infusionsoft_tags"
        placeholder="tag1,tag2,tag3" 
        value="<?php echo get_option('infusionsoft_tags') ?>"
      >
    </p>

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
     <label for=""> <b>Donate once thanks / redirect</b>  </label>
       <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="donate_once_redirect"
        placeholder="url"
        value="<?php echo get_option('donate_once_redirect') ?>"
        >
    </p>

    <p>
     <label for=""> <b>Donate monthly thanks / redirect</b>  </label>
       <br>
      <input 
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="donate_monthly_redirect"
        placeholder="url"
        value="<?php echo get_option('donate_monthly_redirect') ?>"
        >
     </p>

    <p>

     <label for=""> <b>Subscribe thanks / redirect</b>  </label>
       <br>
      <input
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="subscribe_redirect"
        placeholder="url"
        value="<?php echo get_option('subscribe_redirect') ?>"
        >
      </p>
      
      <p>
        <label for=""> <b>Google Analytics ID</b>  </label>
         <br>
      <input
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="analytics_id"
        placeholder="ID"
        value="<?php echo get_option('analytics_id') ?>"
        >
      </p>

      <p>
        <label for=""> <b>Google Tag Manager ID</b>  </label>
         <br>
      <input
        style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
        type="text"
        name="gta_id"
        placeholder="ID"
        value="<?php echo get_option('gta_id') ?>"
        >
      </p>
      <p>
        <label for="">
          <b>It's necessary update this database once each month</b>
        </label>
        <br>
        <button class="button update-geoip">Update Geoip Database</button>
        <span class="update-geoip-message"></span>
      </p>
    <p>
      <?php submit_button(); ?>
    </p>
    	
  </form>
</div>

<?php
}