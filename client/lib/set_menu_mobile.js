const setMenuMobile = function() {
  $('.open-menu').on('click', () => {
    if ($('.menu--mobile').hasClass('menu--mobile--open')) {
      $(document.body).removeClass('menu-open');
      $('.menu--mobile').removeClass('menu--mobile--open');
    } else {
      $(document.body).addClass('menu-open');
      $('.menu--mobile').addClass('menu--mobile--open');
    }
  });

  $('.close-menu').on('click', (e) => {
    $(document.body).removeClass('menu-open');
    $('.menu--mobile').removeClass('menu--mobile--open');
  });

};

export default setMenuMobile;
