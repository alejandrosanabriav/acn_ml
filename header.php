<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>ACN ML</title>
   
   <?php wp_head(); ?>

   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
   <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
   <link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/public/css/base.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css">
   <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
   <link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.sidr/2.2.1/stylesheets/jquery.sidr.light.min.css">
   
   <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PPMG5P');</script>
<!-- End Google Tag Manager -->

</head>
<body>
<div 
  id="app-ml" 
  countries=<?php echo json_encode(getCountries()) ?>
>

<?php echo json_encode(getCountries()) ?>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPMG5P"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<?php
  $home = '/';
  if(function_exists('pll_home_url')) {
    $home = pll_home_url();
  }
?>

  <nav id="header" class="navbar navbar-fixed-top">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">

      <button type="button" class="navbar-toggle visible-sm visible-xs" >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <?php
      $home = '/';
        if(function_exists('pll_home_url')) {
          $home = pll_home_url();
        }
       ?>

      <a href="<?php echo $home ?>">
        <?php if( !empty( get_option("logo_" . str_replace(' ', '_', getOfficeCountry())  )) ): ?>
          <img src='<?php echo get_option("logo_" . str_replace(' ', '_', getOfficeCountry())  ) ?>'  alt="acn logo" class="img-responsive" width="150"  />
        <?php else: ?>
          <img src="<?php echo get_template_directory_uri(); ?>/public/img/logo.png" alt="acn logo" width="150" >
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

