<?php
 $imagesArr = explode(',', $at['imagess']);  
 
 function getImageSrc($imageId) {
	 return  wp_get_attachment_image_src($imageId, 'full')[0];
 }

 $images = array_map('getImagesSrc', $imagesArr);
 print_r($images);
 ?>

<bs-slider-bs image="<?php echo json_encode($images) ?>"></bs-slider-bs>
