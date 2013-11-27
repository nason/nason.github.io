module.exports = (function() {
  // Contact form error handling
  var el = document.querySelector('#contact-error');

  if (window.location.hash === "#contact-error") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
})();
