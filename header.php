<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
 
  <title>ACN ML</title>
   <?php wp_head(); ?>

  <style>
  body {
    padding-top: 100px;
  }

    #header {
      height: 100px;
      width: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
    }

     #header img {
       float: left;
       margin: 40px 0 0 40px;
     }
  </style>

</head>
<body>

<div id="header">
  <img src="<?php echo get_template_directory_uri() ?>/public/logos/logo.png" alt="">
</div>
