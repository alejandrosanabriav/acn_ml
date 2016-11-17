<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 $arr = [];
	 $arr[$imageId] = wp_get_attachment_url($imageId);
	 return $arr;
 }
 
 $images = array_map('getImagesSrc', $imagesArr);
?>

<bsslider-bg images="<?php echo json_encode($images, true) ?>"></bsslider-bg>
<?php echo str_replace('\\/', '/', json_encode($images, true)) ?>
