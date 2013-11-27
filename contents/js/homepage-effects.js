module.exports = (function() {

	'use strict';

	// Feature Test
	if ( 'querySelector' in document && 'addEventListener' in window ) {

		var hoverTransparency = function(targetSelector, elSelector, classToToggle, click) {
			var target = document.querySelector(targetSelector),
					el = document.querySelector(elSelector);

			if (target && el) {
				var transMouseOver = function(event) {
					target.classList.add(classToToggle);
				};
				var transMouseOut = function(event) {
					target.classList.remove(classToToggle);
				};

				el.addEventListener("mouseover", transMouseOver, false);
				el.addEventListener("mouseout", transMouseOut, false);
			}

			if (click) {
				// make the target a click zone for the el
				var targetClick = function(event) {
					var link = target.querySelector('a');
					window.location = link.href;
				};
				target.addEventListener("click", targetClick, false);
			}
		};

		// Setup effects
		hoverTransparency('#banner', '#banner h3 a', 'about-me-hover', false);
		hoverTransparency('#blog-box', '#blog-box header', 'visit-blog', true);
	}

})();