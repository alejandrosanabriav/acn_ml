<?php
  header("Access-Control-Allow-Origin: *"); 
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=0">
  
  <title><?php echo wp_title(); ?></title>
  <meta property="og:title" content="<?php echo get_the_title(); ?>" />
  <meta property="og:image" content="http://acninternational.org/wp-content/uploads/sites/4/2016/11/slider1.jpg" />
  <meta property="og:url" content="<?php echo the_permalink() ?>" />
   <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','<?php echo get_option('gta_id') ?>');</script>
  <!-- End Google Tag Manager -->
  <?php wp_head(); ?>
  
  <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/public/css/base.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css">
  <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.sidr/2.2.1/stylesheets/jquery.sidr.light.min.css">   

  <script> 

    function onLoad(cb) {
      if (window.addEventListener)
        window.addEventListener("load", cb, false);
      else if (window.attachEvent) {
        window.attachEvent("onload", cb);
      } else {
        window.onload = cb;
      } 
    }
  </script>
  <!-- Start Visual Website Optimizer Asynchronous Code -->
<script type='text/javascript'>
var _vwo_code=(function(){
var account_id=272982,
settings_tolerance=2000,
library_tolerance=2500,
use_existing_jquery=false,
/* DO NOT EDIT BELOW THIS LINE */
f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
</script>
<!-- End Visual Website Optimizer Asynchronous Code -->
</head>

<body>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo get_option('gta_id') ?>"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div id="app-ml">

<nav id="header" class="navbar navbar-fixed-top">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">

      <button type="button" class="navbar-toggle visible-sm visible-xs" >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <a href="#">
        <?php if( !empty( get_option("logo") ) ): ?>
          <img src='<?php echo get_option("logo") ?>'  alt="acn logo" class="img-responsive" width="150"  />
        <?php endif; ?>
     </a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="visible-lg visible-md" >

      <ul class="nav navbar-nav navbar-right">
        <?php
          $args = array(
            'theme_location' => 'header',
            'container' => false,
            'echo' => false
          );

          $menu = wp_nav_menu( $args);
          echo clean_menu($menu);
         ?>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

<div class="hidden country">
  <?php echo get_user_location()->names['en'] ?>
  <?php echo get_client_ip_server() ?>
</div>
