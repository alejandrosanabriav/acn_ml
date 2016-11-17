<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 $arr = [];

	 return $arr[$imageId] = wp_get_attachment_image_src($imageId, 'full')[0];
 }

 $images = array_map('getImagesSrc', $imagesArr);
?>

<bsslider-bg :images="{{ <?php echo str_replace('\\/', '/', json_encode($images, true))?> }}"></bsslider-bg>
<?php echo str_replace('\\/', '/', json_encode($images, true)) ?>
