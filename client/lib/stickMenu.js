function stickMenu(e) {
  const $nav = $('.nav');
  const $stickyMenu = $('.sticky-menu');
  const $parentSticky = $stickyMenu ? $stickyMenu.parent().offset().top : 0;
  let stickyMenuTop = $stickyMenu ? $stickyMenu.offset().top : 0;
  let navTop = $nav ? $nav.offset().top : 0;
  let $container = $('.sticky-menu__container') ? $('.sticky-menu__container') : $('.grant-right');
  let containerHeight = $container.height();
  let maxTop = containerHeight - $('.sticky-menu').innerHeight();
  let top = navTop;
  let br = document.querySelector('.sticky-menu__container') ?
    document.querySelector('.sticky-menu__container').getBoundingClientRect() :
    document.querySelector('.grant-right').getBoundingClientRect();
  let h = $('.sticky-menu').innerHeight() + 40;

  if (br.top - 110 < 0 && br.bottom - h > 0) {
    $stickyMenu.css({
      position: 'relative',
      top: top
    });
  }

}

export default function stickyMenu() {
  if ($('.sticky-menu').length > 0) {
    window.addEventListener('scroll', stickMenu);
  }
}
