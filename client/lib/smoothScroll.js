import debounce from 'lodash/debounce';

export default function smoothScroll() {

  // $("a").on('click', function(event) {

  //   // Make sure this.hash has a value before overriding default behavior
  //   if (this.hash !== "") {
  //     event.preventDefault();

  //     const hash = this.hash;
  //     const less = $('.nav') ? $('.nav').height() + 20 : 0;

  //     const scrollTop = $(hash) ? ($(hash).offset().top - less) : 0;
  //     $('html, body').animate({ scrollTop }, 800, () => {});

  //   }
  // });

  window.addEventListener('scroll', debounce(function() {
     if($('.nav').offset().top > 0) {
       $('#return-to-top').css({display: 'block'})
     } else {
       $('#return-to-top').css({display: 'none'})
     }

  }, 200));
  
  $('#return-to-top').on('click', function(e) {
    e.preventDefault();
   
    $('html, body').animate({ scrollTop: 0 }, 800, () => {});
  })

}
