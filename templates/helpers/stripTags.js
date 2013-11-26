module.exports = function(html) {
  return html.replace(/(<([^>]+)>)/ig,"");
};
