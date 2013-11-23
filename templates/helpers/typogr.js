// typogr helper for handlebars

var typogr = require('typogr');

module.exports = function(html) {
  return typogr.typogrify(html);
};
