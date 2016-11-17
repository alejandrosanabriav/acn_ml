<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 return  wp_get_attachment_image_src($imageId, 'full')[0];
 }

 $images = array_map('getImagesSrc', $imagesArr);
?>

<bs-slider-bg images="<?php echo json_encode($images) ?>"></bs-slider-bg>
<?php var_dump($at); ?>
