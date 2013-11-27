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
  var $form = $('form#email');
  if ($form.length) {
    var $button = $form.find('.button');
    $button.on('click', function(e) {
      e.preventDefault();
      $form.submit();
    });

    // Contact form error handling
    if (window.location.hash === "#contact-error") {
      $('#contact-error').show();
    } else {
      $('#contact-error').hide();
    }
  }

});