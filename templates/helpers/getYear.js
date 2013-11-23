var moment = require('moment');

module.exports = function() {
	return moment(Date.now()).format('YYYY');
};
