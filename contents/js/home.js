var $ = require('./components/jquery');
var site = require('./init.js');

$(function() {
  // Needs to happen after document ready
  require('./vendor/smooth-scroll.js');

  var $window = $(window),
      $body = $('body');


  // Full Screen Header
  /*
    Based on Overflow 1.1 by HTML5 UP
    html5up.net | @n33co
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
  */
  if (site.settings.useFullScreenHeader) {
    var $header = $('#header');

    if ($header.length > 0) {
      var $header_header = $header.find('header');

      $window.on('resize.overflow_fsh', function() {
        if (site.skel.isActive('mobile')) {
          $header.css('padding', '');
        } else {
          var p = Math.max(128, ($window.height() - $header_header.outerHeight()) / 2);
          $header.css('padding', p + 'px 0 ' + p + 'px 0');
        }
      }).trigger('resize.overflow_fsh');

      $window.load(function() {
        $window.trigger('resize.overflow_fsh');
      });
    }
  }

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