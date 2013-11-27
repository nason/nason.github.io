var site = require('./init.js');
var $ = require('./components/jquery');

$(function() {
  // TODO: Don't use jQuery.

  // Smooth scroll animations
  require('./vendor/smooth-scroll.js');

  // Full Page Header
  require('./full-header.js').init();

  // Homepage effects
  require('./homepage-effects.js');

  // Contact Form
  require('./contact-form.js');

});