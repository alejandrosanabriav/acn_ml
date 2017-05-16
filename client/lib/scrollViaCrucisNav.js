import debounce from 'lodash/debounce';

export default function scrollViaCrucisNav() {
	let onScroll = debounce(() => {
  
    const $nav = $('.nav');
    const $viaCrucisNav =  $('.via-crucis-nav__container');
    const $navToggle = $('.via-crucis-toggle');
    let navTop = $nav ? $nav.offset().top : 0;
    let viaCrucisToggleTop = $navToggle ? $navToggle.offset().top : 0; 
    let viaCrucisLeft = $('.via-crucis__left') ? $('.via-crucis__left').offset().top : 0;

    if(navTop > viaCrucisLeft) {
      $navToggle.addClass('via-crucis-toggle--fixed');
      $viaCrucisNav.addClass('via-crucis-nav__container--fixed');
    } else {
       $navToggle.removeClass('via-crucis-toggle--fixed');
      $viaCrucisNav.removeClass('via-crucis-nav__container--fixed');
    }

 
}, 200);

  if($('.via-crucis-toggle').length > 0 && $('.nav').length > 0 && window.outerHeight <= 767) {
    window.addEventListener('scroll', onScroll);
  }
}
