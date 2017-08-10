
const getCookies = () => {
  let cookies = {};

  document.cookie.split(";").forEach(function(l) {
    cookies[l.split("=")[0].trim()] = l.split("=")[1];
  });

  return cookies;
}

export default getCookies;
