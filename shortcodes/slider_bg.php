<?php
 $imagesArr = explode(',', $at['images']);
 
 function getImagesSrc($imageId) {
	 return wp_get_attachment_url($imageId);
 }
 
 $images = array_map('getImagesSrc', $imagesArr);
?>

<bsslider-bg 
	:images=<?php echo json_encode($images, true) ?>
	interval="<?php echo $at['interval'] ?>" 
	height="<?php echo $at['height'] ?>" 
>
</bsslider-bg>

