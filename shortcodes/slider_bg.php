<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 return  urldecode(wp_get_attachment_image_src($imageId, 'full')[0]);
 }

 $images = array_map('getImagesSrc', $imagesArr);
?>

<bsslider-bg images="<?php echo json_encode($images) ?>"></bsslider-bg>
<?php var_dump(json_encode($images)); ?>
