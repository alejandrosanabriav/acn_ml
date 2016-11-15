<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>ACN ML</title>
   
   <?php wp_head(); ?>

   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
   <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
   <link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/public/css/base.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css">
   
   <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PPMG5P');</script>
<!-- End Google Tag Manager -->

</head>
<body id="app-ml">

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPMG5P"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div id="header">
<div class="container">
      <a href="<?php echo $home ?>">
      <?php if( !empty( get_option("logo_" . str_replace(' ', '_', getOfficeCountry())  )) ): ?>
        <img src='<?php echo get_option("logo_" . str_replace(' ', '_', getOfficeCountry())  ) ?>'  alt="acn logo" class="img-responsive" width="200"  />
      <?php else: ?>
         <img src="<?php echo get_template_directory_uri(); ?>/public/img/logo.png" alt="acn logo" width="200" >
      <?php endif; ?>
    </a>

</div>
</div>
