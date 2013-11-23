// page contents helper
// page content markdown lives in the 'copy' folder

var typogr = require('./typogr.js');

module.exports = function() {
  return typogr(this.contents.copy[this.page.metadata.content].html);
};
