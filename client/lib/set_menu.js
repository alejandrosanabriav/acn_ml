const setMenu = function() {
  const $menu = $('.menu');
  const currentLang = $('.menu .current-lang > a');
  $('.menu .current-lang').addClass('dropdown');
  $('.menu .current-lang').append('<div class="dropdown-content"></div>');
  let langs = $('.menu .lang-item').not($('.current-lang'));

  $('.menu').addClass('menu--show');

  currentLang.on('click', e => {
    e.preventDefault();
    const $dropdown = $menu.find('.dropdown-content');

    if ($dropdown.hasClass('dropdown-content--show')) {
      $dropdown.removeClass('dropdown-content--show');
      return;
    }

    $dropdown.addClass('dropdown-content--show');
  });

  langs.each(function() {
    $menu.find('.dropdown-content').append($(this).html());
    $(this).remove();
  });

  const newText = `${currentLang.text()} <i class="ion-chevron-down"></i>`;
  currentLang.html(newText);
};

export default setMenu;
