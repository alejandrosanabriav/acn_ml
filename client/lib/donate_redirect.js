import request from 'axios';
import qs from 'qs';

export default () => {
  $('.bs-donate a').text(bs.donate);
  $('.bs-donate').on('click', e => {
    e.preventDefault();
    if (ga)
      ga('send', 'event', 'DONATION', 'DONATION_CLICK', 'DONATION_CLICK', 0);

    let data = qs.stringify({action: 'donate_redirect'});

    request
      .post('/wp-admin/admin-ajax.php', data)
      .then(res => window.location = res.data);

  });
};
