<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 return wp_get_attachment_url($imageId);
 }
 
 $images = array_map('getImagesSrc', $imagesArr);
?>

<bsslider-bg interval="3000" height="<?php echo $at['height'] ?>" :images=<?php echo json_encode($images, true) ?>></bsslider-bg>

