
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.min.js"></script>
<script src="https://js.stripe.com/v2/"></script>
<script src="https://cdn.jsdelivr.net/flexslider/2.6.3/jquery.flexslider.js"></script>

<script type="text/javascript">
function downloadJSAtOnload() {
	var element = document.createElement("script");
	element.src = <?php echo get_template_directory_uri() . '/public/js/app.js' ?>;
	document.body.appendChild(element);
}

if (window.addEventListener)
	window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent) {
	window.attachEvent("onload", downloadJSAtOnload);
} else {
	window.onload = downloadJSAtOnload;
} 
</script>

<!--wordpress scripts insertion-->
<?php wp_footer() ?>

</body>
</html>
