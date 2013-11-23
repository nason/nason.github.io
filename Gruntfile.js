module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ["build/"],
      dist: ["dist/"],
      extraCSS: ["dist/css/elements/", "dist/css/pages/"]
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
        ignores: ['**/*.min.js']
      },
      src: ['Gruntfile.js', 'templates/helpers/*.js', 'contents/js/*.js']
    },

    wintersmith: {
      production: {
        options: {
          action: "build",
          config: './config-production.json'
        }
      },
      preview: {
        options: {
          action: "preview",
          config: './config.json'
        }
      }
    },

    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min',    //'gzip' is nice too but slows task performance by 5-10x
        preserveComments: false
      },
      dist: {
        files: {
          'dist/js/home.min.js': ['build/js/home.js'],
          'dist/js/init.min.js': ['build/js/init.js'],
          'dist/js/vendor/liga.min.js': ['build/js/vendor/liga.js']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true
        },
        expand: true,
        cwd: 'build/',
        src: '**/index.html',
        dest: 'dist/'   // TODO: Create a deploy-preparation phase in the dist folder
      }
    },

    cssmin: {
      dist: {
        options: {
          // banner: '/* My minified css file */'
          report: 'gzip'
        },
        expand: true,
        cwd: 'build/css/',
        src: '**/*.css',
        dest: 'dist/css/'
        // ext: '.min.css'
      }
    },

    copy: {
      'svg-images': {
        expand: true,
        cwd: 'build/images/',
        src: ['*.svg'],
        dest: 'dist/images/'

      },
      fonts: {
        expand: true,
        cwd: 'build/fonts/',
        src: ['*'],
        dest: 'dist/fonts/'
      }
    },

    git_deploy: {
      gh_pages: {
        options: {
          url: 'git@github.com:nason/nason.github.io.git',
          message: 'Auto deploy pages'
        },
        src: 'dist/'
      },
    },


  });

  // Load Grunt Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wintersmith');
  grunt.loadNpmTasks('grunt-git-deploy');

  // Default task(s).
  grunt.registerTask('default', ['preview']);
  grunt.registerTask('preview', ['jshint:src', 'wintersmith:preview']);
  grunt.registerTask('build', ['clean:build', 'jshint:src', 'wintersmith:production']);
  grunt.registerTask('dist', ['build', 'uglify:dist', 'cssmin:dist', 'htmlmin:dist', 'imagemin:dist', 'copy', 'clean:build', 'clean:extraCSS']);
  grunt.registerTask('deploy', ['build', 'dist', 'git_deploy:gh_pages']);

};