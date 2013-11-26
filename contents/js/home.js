var site = require('./init.js');
var $ = require('./components/jquery');

$(function() {
  // TODO: Don't use jQuery.

  // Smooth scroll animations
  require('./vendor/smooth-scroll.js');

  // Full Page Header
  require('./full-header.js').init();

  // Homepage effects
  var $blogBox = $('#blog-box'),
      $el = $blogBox.find('header');

  if($blogBox.length && $el.length) {
    $el.mouseover(function(e) {
      e.preventDefault();
      $blogBox.addClass('visit-blog');
    }).mouseleave(function(e) {
      e.preventDefault();
      $blogBox.removeClass('visit-blog');
    }).click(function(e) {
      e.preventDefault();
      window.location=$(this).find("a").attr("href");
    });
  }

  var $aboutMeLink = $('#banner h3 a'),
      $banner = $('#banner');

  if($aboutMeLink.length && $banner.length) {
    $aboutMeLink.mouseover(function(e) {
      e.preventDefault();
      $banner.addClass('about-me-hover');
    }).mouseleave(function(e) {
      e.preventDefault();
      $banner.removeClass('about-me-hover');
    });
  }

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