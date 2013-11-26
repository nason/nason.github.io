module.exports = fullScreenHeader = {};

fullScreenHeader.handleEvent = function() {
  var header = document.querySelector('#header'),
      tag = header.querySelector('header');
  if (header && tag) {
    if (site.skel.isActive('mobile')) {
      header.style.padding = "";
    } else {
      var p = Math.max(128, (window.innerHeight - tag.clientHeight) / 2);
      header.style.padding = p + 'px 0 ' + p + 'px 0';
    }
  }
};

fullScreenHeader.init = function() {
  this.handleEvent();
  window.addEventListener("resize", this.handleEvent, false);
};