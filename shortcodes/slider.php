<?php
add_shortcode( 'bs_slider', 'bs_slider_sc' );

function bs_slider_sc($atts, $content = null) {
  $at = shortcode_atts( array(
      "images" => "",
      "links" => "",
      "interval" => "8000",
      "image_width" => '200'
    ), $atts );

  $imagesArr = explode(',', $at['images']);
  $linksArr = explode(',', $at['links']);
  $imagesCount = count($imagesArr);
  $id = "slider-" . uniqid();
     
  ob_start();
?>

<?php if($imagesCount > 0): ?>
<div class="flexslider" id="<?php echo $id?>">
  <ul class="slides">
      <?php foreach($imagesArr as $key => $imageId): ?>
        <li>
          <a href="<?php echo $linksArr[$key] ?>" target="new">
            <img src=" <?php echo wp_get_attachment_image_src($imageId, 'full')[0] ?>" alt="">
          </a>
        </li>
      <?php endforeach; ?>
  </ul>
</div>
<?php endif; ?>
<script>
  $(function() {

    $('#<?php echo $id?>').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: <?php echo $at['image_width'] ?>,
      itemMargin: 5
    });

  });
</script>

<?php

  return ob_get_clean();
  } //close bs_slider_sc

  

  function bs_slider_vc() {
    vc_map(
      array(
        "name" =>  "BS slider",
        "base" => "bs_slider",
        "category" =>  "BS",
        "params" => array(
          array(
            "type" => "attach_images",
            "param_name" => "images"
          ),
          array(
            "type" => "exploded_textarea",
            "param_name" => "links"
          ),
           array(
            "type" => "textfield",
            "param_name" => "image_width",
            "value" => 200
          )
        )
      ) 
    );
  }

add_action( 'vc_before_init', 'bs_slider_vc' );

?>