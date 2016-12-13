<?php
add_shortcode( 'bs_slider', 'bs_slider_sc' );

function bs_slider_sc($atts, $content = null) {
  $at = shortcode_atts( array(
      "images" => "",
      "links" => "",
      "interval" => "8000",
      "image_width" => '200',
      "item_margin" => 5,
      "slider_style" => '',
      "control_nav" => true
    ), $atts );

  $imagesArr = explode(',', $at['images']);
  $linksArr = explode(',', $at['links']);
  $imagesCount = count($imagesArr);

  $id = "slider-" . uniqid();

  ob_start();
?>

<?php if($imagesCount > 0): ?>
<div class="flexslider" id="<?php echo $id?>" style="<?php echo $at['slider_style'] ?>">
  <ul class="slides">
      <?php foreach($imagesArr as $key => $imageId): ?>
        <li>
          <a href="<?php echo $linksArr[$key] ? $linksArr[$key] : '#' ?>" target="new">
            <img src=" <?php echo str_replace('http:', '', wp_get_attachment_image_src($imageId, 'full')[0]); ?>" alt="">
          </a>
        </li>
      <?php endforeach; ?>
  </ul>
</div>
<?php endif; ?>
<script>
function loadSlider() {

    $('#<?php echo $id?>').flexslider({
      animation: "slide",
      animationLoop: true,
      smoothHeight: true,
      itemWidth: <?php echo $at['image_width'] ?>,
      itemMargin: <?php echo $at['item_margin'] ?>,
      controlNav: <?php echo $at['control_nav'] ?>
    });

}

onLoad(loadSlider);
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
            "heading" => "Image width",
            "param_name" => "image_width",
            "value" => 200
          ),
          array(
            "type" => "textfield",
            "heading" => "Image margin",
            "param_name" => "item_margin",
            "value" => 5
          ),

           array(
            "type" => "textfield",
            "heading" => "Slider style",
            "param_name" => "slider_style",
            "value" => ''
          ),

          array(
            "type" => "dropdown",
            "heading" => "Control nav",
            "param_name" => "control_nav",
            "value" => array(
              "true" => 1,
              "false" => 0
            ),
            "std" => true,
          )


        )
      ) 
    );
  }

add_action( 'vc_before_init', 'bs_slider_vc' );

?>