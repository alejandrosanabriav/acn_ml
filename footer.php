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

<script src="<?php echo get_template_directory_uri() . '/public/js/vendor.js' ?>"></script>

<!--wordpress scripts -->
<?php wp_footer() ?>
<!-- End wordpress scripts -->

<!--theme scripts -->

<script>
	if (!document.querySelectorAll) {
  document.querySelectorAll = function (selectors) {
    var style = document.createElement('style'), elements = [], element;
    document.documentElement.firstChild.appendChild(style);
    document._qsa = [];

    style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
    window.scrollBy(0, 0);
    style.parentNode.removeChild(style);

    while (document._qsa.length) {
      element = document._qsa.shift();
      element.style.removeAttribute('x-qsa');
      elements.push(element);
    }
    document._qsa = null;
    return elements;
  };
}

if (!document.querySelector) {
  document.querySelector = function (selectors) {
    var elements = document.querySelectorAll(selectors);
    return (elements.length) ? elements[0] : null;
  };
}
</script>

<script src="https://js.stripe.com/v2/"></script>
<!--<script src="https://cdn.jsdelivr.net/flexslider/2.6.3/jquery.flexslider.js"></script>-->
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sidr/2.2.1/jquery.sidr.min.js"></script>
	<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.1/es6-shim.js"></script>-->
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

<script>
onLoad(function() {
 $('.navbar-toggle').sidr({
    name: 'sidr',
    source: '#sidr',
    side: 'right',
    displace: false,
    renaming: false,
    onOpen: function() {
      $('.navbar-toggle').addClass('navbar-toggle--active');
    },
    onClose: function() {
      $('.navbar-toggle').removeClass('navbar-toggle--active');
    }
  });

	$(document).find('#sidr .sidr-class-close').on('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $.sidr('close', 'sidr');
  });
})

</script>
</div><!-- #app-ml -->
</body>
</html>
