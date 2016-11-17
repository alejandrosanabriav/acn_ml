<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 return wp_get_attachment_url($imageId);
 }
 
 $images = array_map('getImagesSrc', $imagesArr);
?>

<bsslider-bg images="[{'nea': 'nea'}]"></bsslider-bg>
<?php echo str_replace('\\/', '/', json_encode($images, true)) ?>
