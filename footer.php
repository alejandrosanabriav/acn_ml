
<bs-share url="<?php echo esc_url($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']); ?>"></bs-share>

<div id="sidr">
  <!-- Your content -->
  <button class="sidr-class-close"><i class="ion-close"></i></button>

  <ul>
    <?php
      $args = array(
        'theme_location' => 'header',
        'container' => false,
        'echo' => false
      );
      $menu = wp_nav_menu($args);
      echo clean_menu($menu);
     ?>
  </ul>
</div>

<!--wordpress scripts -->
<?php wp_footer() ?>
<!-- End wordpress scripts -->

<!--theme scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<script src="https://js.stripe.com/v2/"></script>
<script src="https://cdn.jsdelivr.net/flexslider/2.6.3/jquery.flexslider.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sidr/2.2.1/jquery.sidr.min.js"></script>
<script src="<?php echo get_template_directory_uri() . '/public/js/app.js' ?>"></script>
<!-- End theme scripts -->

 <!-- Google Analytics -->
  <script src='https://www.google-analytics.com/analytics.js'></script>

  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;

  ga('create', '<?php echo get_option('analytics_id') ?>', 'auto');
  ga('send', 'pageview');
  ga('require', 'ecommerce');

  </script>
<!-- End Google Analytics -->

<!-- Start Visual Website Optimizer Asynchronous Code -->
<script type='text/javascript'>
var _vwo_code=(function(){
var account_id=272982,
settings_tolerance=2000,
library_tolerance=2500,
use_existing_jquery=false,
/* DO NOT EDIT BELOW THIS LINE */
f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
</script>
<!-- End Visual Website Optimizer Asynchronous Code -->

<!--
<script type="text/javascript">

deferScript("<?php echo get_template_directory_uri() . '/public/js/app.js' ?>");

function deferScript(src) {
	function downloadJSAtOnload() {
    var element = document.createElement("script");
    element.src = src;
    document.body.appendChild(element);
  }

  onLoad(downloadJSAtOnload);	
}

onLoad(() => {
    $('.navbar-toggle').sidr({
    name: 'sidr',
    source: '#sidr',
    side: 'right',
    displace: false,
    renaming: false,
    onOpen() {
      $('.navbar-toggle').addClass('navbar-toggle--active');
    },
    onClose() {
      $('.navbar-toggle').removeClass('navbar-toggle--active');
    }
  });

	$(document).find('#sidr .sidr-class-close').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $.sidr('close', 'sidr');
  });
})
</script>-->
</div><!-- #app-ml -->
</body>
</html>
