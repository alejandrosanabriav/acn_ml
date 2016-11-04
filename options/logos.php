<?php
include_once(get_template_directory() . '/lib/offices_countries.php');

// create custom plugin settings menu
add_action('admin_menu', 'bs_admin_options_menu');

function bs_admin_options_menu() {
		add_menu_page(
    'Brandspa theme options',
    'BS Options', //menu name
    'manage_options', //allow it options
    'bs-logos', //slug
    'logos_settings_page',
    get_template_directory_uri() . '/public/img/bs_options.png', //icon on menu
    110 //position on menu
  );

	add_submenu_page(
		'bs-logos',
		'Categories options',
		'BS Categories',
		'manage_options',
		'bs-categories'
	);

	//call register settings function on init admin page
	add_action( 'admin_init', 'bs_add_country_info_settings' );
}

function bs_add_country_info_settings() {
	$options = getOfficesCountries();

  foreach ($options as $value) {
		$value = str_replace(' ', '_', $value);
    register_setting( 'bs_country_info_group', 'logo_' . $value );
    register_setting( 'bs_country_info_group', 'redirect_url_' . $value );
    register_setting( 'bs_country_info_group', 'contact_info_' . $value );
  }

}

function logos_settings_page() {
?>
  <?php
  $countries = getOfficesCountries();
   ?>

  <div style="background: #f1f1f1; background-size: contain; padding: 15px">
		<div style="text-align: center; text-shadow: 1px 1px 3px rgba(0,0,0, .1)">
			<h1>RFR Options</h1>
		</div>

  <form method="post" action="options.php" style="position: relative; width: 80%; margin: 0 auto">
      <?php settings_fields( 'bs_country_info_group' ); ?>
      <?php do_settings_sections( 'bs_country_info_group' ); ?>

        <?php foreach ($countries as $value): ?>
					<?php $value = str_replace(' ', '_', $value); ?>

          <section style="padding: 15px; margin: 15px auto;background: #fff; box-shadow: 1px 1px 5px rgba(0,0,0, .1); width: 100%">
						<h3><?php echo str_replace('_', ' ', $value) ?></h3>
						<hr>

						<h4>Logo url</h4>
						<p>
							<input
								style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
								type="text"
								class="uploader"
								placeholder="logo url"
								name="logo_<?php echo $value ?>"
								value="<?php echo esc_attr( get_option('logo_' . $value ) ); ?>"
							/>
						</p>

						<h4>Redirect url</h4>

						<input
							style="background: rgba(255,255,255,.4); width: 60%; height: 35px"
							type="text"
							placeholder="url"
							name="donate_url_<?php echo $value ?>"
							value="<?php echo esc_attr( get_option('redirect_url_' . $value ) ); ?>"
						/>

						<h4>Contact info</h4>

						<?php wp_editor( get_option('contact_info_' . $value ), 'contact_info_' . $value); ?>
					
						<script>
							
						</script>

							<?php submit_button(); ?>

          </section>


        <?php endforeach; ?>


  </form>
  </div>
<?php } ?>
