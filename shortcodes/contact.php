<contact 
  :texts="{pray: 'PRAY', checkbox: 'I accept to receive updates and information from ACN'}" 
  :placeholders="{name: 'Name', email: 'Email'}" 
  country="<?php echo getCountry() ?>"
  base-uri=<?php echo get_template_directory_uri() ?>
  redirect=<?php echo get_option('subscribe_redirect') ?>
>
</contact>
