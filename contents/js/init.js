var $ = jQuery = require('./jquery.min.js'),
	skel = require('./skel.min.js');

/*
	Overflow 1.1 by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/*********************************************************************************/
/* Settings                                                                      */
/*********************************************************************************/

var _settings = {

	// Full screen header
		useFullScreenHeader: true,

	// skelJS
		skelJS: {
			prefix: '/css/main',
			resetCSS: true,
			boxModel: 'border',
			useOrientation: true,
			containers: 1140,
			grid: {
				gutters: 40
			},
			breakpoints: {
				'widest': { range: '1680-', containers: 1140, hasStyleSheet: false },
				'wide':   { range: '1081-1680', containers: 960 },
				'normal': { range: '841-1080', containers: '95%' },
				'narrow': { range: '641-840', containers: '95%', grid: { gutters: 30 } },
				'mobile': { range: '-640', lockViewport: true, containers: '95%', grid: { collapse: true } }
			}
		}

};

/*********************************************************************************/
/* jQuery Plugins                                                                */
/*********************************************************************************/

// scrolly
jQuery.fn.n33_scrolly = function(offset) {

	jQuery(this).click(function(e) {
		var h = jQuery(this).attr('href'), target;

		if (h.charAt(0) == '#' && h.length > 1 && (target = jQuery(h)).length > 0)
		{
			var pos = Math.max(target.offset().top, 0);
			e.preventDefault();

			if (offset)
			{
				if (typeof(offset) == 'function')
					pos -= (offset)();
				else
					pos -= offset;
			}

			jQuery('body,html').animate({ scrollTop: pos }, 1000, 'swing');
		}
	});
};

/*********************************************************************************/
/* Initialize                                                                    */
/*********************************************************************************/

// skelJS
skel.init(_settings.skelJS);

// jQuery
jQuery(function() {

	var $window = $(window),
		$body = $('body');

	// Scrolly links
		$('.scrolly').n33_scrolly(function() {
			return (skel.isActive('mobile') ? 70 : 190);
		});

	// Full Screen Header
		if (_settings.useFullScreenHeader)
		{
			var $header = $('#header');

			if ($header.length > 0)
			{
				var $header_header = $header.find('header');

				$window
					.on('resize.overflow_fsh', function() {
						if (skel.isActive('mobile'))
							$header.css('padding', '');
						else
						{
							var p = Math.max(128, ($window.height() - $header_header.outerHeight()) / 2);
							$header.css('padding', p + 'px 0 ' + p + 'px 0');
						}
					})
					.trigger('resize.overflow_fsh');

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
				e.preventDefault()
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
			if (window.location.pathname === "/" && window.location.hash === "#contact-error") {
				$('#contact-error').show();
				console.log('show')
			} else {
				$('#contact-error').hide();
				console.log('hide')
			}
		}


});
