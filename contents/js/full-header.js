var site = global.site;

var fullScreenHeader = function() {
  var header = document.querySelector('#header');
  var tag = header.querySelector('header');

  if (header && tag) {
    if (site.skel && site.skel.isActive('mobile')) {
      header.style.padding = "";
    } else {
      var p = Math.max(128, (window.innerHeight - tag.clientHeight) / 2);
      header.style.padding = p + 'px 0 ' + p + 'px 0';
    }
  }
};

module.exports = (function() {
  fullScreenHeader();
  window.addEventListener("resize", fullScreenHeader, false);
})();
