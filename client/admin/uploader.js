'use strict';
import $ from 'jquery';
import Promise from 'promise';

const open_media_uploader_image = () => {
  let media_uploader = wp.media({
      frame:    "post",
      state:    "insert",
      multiple: false
    });

  let promise = new Promise((resolve, reject) => {
    media_uploader.on("insert", () => {
      let json = media_uploader.state().get("selection").first().toJSON();
      return resolve(json);
    })
  });

  media_uploader.open();

  return promise;
}

const section = () => {

  $('.uploader').on('click', (e) => {

    open_media_uploader_image()
    .then(res => {
      $(e.currentTarget).val(res.url);
    });
  });
}

export default section;
