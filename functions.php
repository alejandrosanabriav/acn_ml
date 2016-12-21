<?php
/*
 * BrandSpa (http://brandspa.com)
 * Alejandro Sanabria <alejandro@brandspa.com>
 * Copyright 2016 BrandSpa
 */

register_nav_menus(
  array(
    'header' => __('Header nav'),
  )
);

include_once 'shortcodes/index.php';
include_once 'shortcodes/slider.php';
include_once 'shortcodes/donate.php';
include_once 'shortcodes/donate_vertical.php';
include_once 'shortcodes/contact.php';
include_once 'options/index.php';
include_once 'apis/index.php';
include_once 'lib/index.php';
include_once 'lib/infusionsoft.php';

function enqueue_scripts()
{
  wp_enqueue_media();
  wp_enqueue_script( 'app_script', get_template_directory_uri() . '/public/js/admin.js',array(), '4', true  );
}

add_action('admin_enqueue_scripts', 'enqueue_scripts');

function my_mce4_options( $init ) {
$default_colours = '
	"000000", "Black",
	"993300", "Burnt orange",
	"333300", "Dark olive",
	"003300", "Dark green",
	"003366", "Dark azure",
	"000080", "Navy Blue",
	"333399", "Indigo",
	"333333", "Very dark gray",
	"800000", "Maroon",
	"FF6600", "Orange",
	"808000", "Olive",
	"008000", "Green",
	"008080", "Teal",
	"0000FF", "Blue",
	"666699", "Grayish blue",
	"808080", "Gray",
	"FF0000", "Red",
	"FF9900", "Amber",
	"99CC00", "Yellow green",
	"339966", "Sea green",
	"33CCCC", "Turquoise",
	"3366FF", "Royal blue",
	"800080", "Purple",
	"999999", "Medium gray",
	"FF00FF", "Magenta",
	"FFCC00", "Gold",
	"FFFF00", "Yellow",
	"00FF00", "Lime",
	"00FFFF", "Aqua",
	"00CCFF", "Sky blue",
	"993366", "Brown",
	"C0C0C0", "Silver",
	"FF99CC", "Pink",
	"FFCC99", "Peach",
	"FFFF99", "Light yellow",
	"CCFFCC", "Pale green",
	"CCFFFF", "Pale cyan",
	"99CCFF", "Light sky blue",
	"CC99FF", "Plum",
	"FFFFFF", "White"
	';
  
$custom_colours = '
	"f1364e", "red Orange",
	"3c515f", "Oxford",
	"6b7c82", "Gray",
	"1a2127", "Dark",
';

$init['textcolor_map'] = '['.$default_colours.','.$custom_colours.']';
$init['textcolor_rows'] = 6; // expand colour grid to 6 rows
return $init;
}

function gett($str) {
	return $str;
}

function getCountry() {

	if(function_exists('user_location')) {
    $geo = get_user_location();
    return $geo->names['en'];
  }

  return '';
}

add_filter('tiny_mce_before_init', 'my_mce4_options');

function clean_menu($nav) {
  $menu = preg_replace( array( '#^<div[^>]*>#', '#</div>$#' ), '', $nav );
  return preg_replace( array( '#^<ul[^>]*>#', '#</ul>$#' ), '', $menu );
}

function modify_jquery() {
	if (!is_admin()) {
		// comment out the next two lines to load the local copy of jQuery
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js', false, '1.12.4', true);
		wp_enqueue_script('jquery');
	}
}

add_action('init', 'modify_jquery');

function getImageSrc($imageId) {
	return wp_get_attachment_url($imageId);
}

function change_frontend_editor_iframe_url($url) {
    return str_replace("http:", "", $url);
}

add_filter('vc_frontend_editor_iframe_url', 'change_frontend_editor_iframe_url');


function disable_srcset( $sources ) {
	return false;
}
add_filter( 'wp_calculate_image_srcset', 'disable_srcset' );