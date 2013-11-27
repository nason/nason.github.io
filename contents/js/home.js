var site = require('./init.js');
var domready = require('./components/domready');

domready(function() {
  // Smooth scroll animations
  require('./vendor/smooth-scroll.js');

  // Full Page Header
  require('./full-header.js').init();

  // Homepage effects
  require('./homepage-effects.js');

  // Contact Form
  require('./contact-form.js');
});