require('./vendor/signet');

var site = global.site = {};

site.skel = require('./vendor/skel.min.js');

site.settings = {
  containers: 1140,
  grid: {
    gutters: [40, 10],
    collapse: false
  },

  breakpoints: {
    'widest' : {
      media : '(min-width: 1680px)',
      containers : 1140,
      href : '/css/main-wide.css'
    },

    'wide' : {
      media : '(min-width: 1080px) and (max-width: 1679px)',
      containers : 960,
      href : '/css/main-wide.css'
    },

    'normal' : {
      media : '(min-width: 841px) and (max-width: 1079px)',
      containers : '95%',
      href : '/css/main-normal.css'
    },

    'narrow' : {
      media : '(min-width: 641px) and (max-width: 840px)',
      containers : '95%',
      grid : {
        gutters : [30, 10]
      },
      href : '/css/main-narrow.css'
    },
    'mobile' : {
      media : '(max-width: 640px)',
      containers : '95%!',
      viewport : {
        scalable : false
      },
      href : '/css/main-mobile.css'
    }
  }
};

site.skel.init(site.settings);

module.exports = site;
