<?php
 $imagesArr = explode(',', $at['images']);
 $images = array_map('getImageSrc', $imagesArr);
?>

<bsslider-bg 
	:images=<?php echo json_encode($images, true) ?>
	interval="<?php echo $at['interval'] ?>" 
	height="<?php echo $at['height'] ?>" 
>
</bsslider-bg>
