head.load('/js/vendor/signet.js');

var site = {};

site.skel = require('./vendor/skel.min.js');

site.settings = {
  containers: 1140,
  grid: {
    gutters: {
      vertical: 40,
      horizontal: 10
    },
    collapse: false
  },

  breakpoints: {
    'widest' : {
      range : '1680-',
      containers : 1140,
      href : false
    },

    'wide' : {
      range : '1081-1680',
      containers : 960,
      href : '/css/main-wide.css'
    },

    'normal' : {
      range : '841-1080',
      containers : '95%',
      href : '/css/main-normal.css'
    },

    'narrow' : {
      range : '641-840',
      containers : '95%',
      grid : {
        gutters : 30
      },
      href : '/css/main-narrow.css'
    },
    'mobile' : {
      range : '-640',
      containers : '95%',
      grid : {
        collapse : true
      },
      viewport : {
        scalable : false
      },
      href : '/css/main-mobile.css'
    }
  }
};

site.skel.init(site.settings);

module.exports = site;