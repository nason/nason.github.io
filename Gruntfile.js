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
          pngquant: true,
          cache: false
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
        ignores: ['**/*.min.js']
      },
      src: ['Gruntfile.js', 'templates/helpers/*.js', 'contents/js/*.js']
    },

    uglify: {
      options: {
        // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min',    //'gzip' is nice too but slows task performance by 5-10x
        preserveComments: false
      },
      dist: {
        files : [{
          expand: true,
          cwd: 'build/js',
          src: '**/*.js',
          dest: 'dist/js'
        }]
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
        dest: 'dist/'
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
      },
      feed: {
        src: 'build/feed.xml',
        dest: 'dist/feed.xml'
      },
      cname: {
        src: 'CNAME',
        dest: 'dist/CNAME'
      },
      readme: {
        src: 'Readme.md',
        dest: 'dist/Readme.md'
      }
    },

    git_deploy: {
      gh_pages: {
        options: {
          url: 'git@github.com:nason/nason.github.io.git',
          message: "Auto deploy pages, see 'source' branch",
          branch: 'master' // Careful with this one!!!
        },
        src: 'dist/'
      },
    },

    hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      // This wont work because of SkelJS stylesheet loading
      // css: {
      //   src: 'dist/**/*.css',
      //   dest: 'dist/**/*.html'
      // },
      js: {
        src: 'dist/**/*.js',
        dest: [
          'dist/**/*.html',
          'dist/**/*.js'
        ]
      },
      images: {
        src: [
          'dist/**/*.png',
          'dist/**/*.jpg',
          'dist/**/*.gif',
          'dist/**/*.svg'
        ],
        dest: [
          'dist/**/*.html',
          'dist/**/*.xml',
          'dist/**/*.js',
          'dist/**/*.css',
          'dist/**/*.md'
        ]
      },
      fonts: {
        src: [
          'dist/**/*.eot',
          'dist/**/*.ttf',
          'dist/**/*.woff'
        ],
        dest: [
          'dist/**/*.html',
          'dist/**/*.css'
        ]
      }
    },

    shell : {
      wintersmith : {
        command : function (env) {
          if (env === 'local') {
            return 'wintersmith preview --config config.json';
          }

          if (env === 'prod') {
            return 'wintersmith build --config config-production.json';
          }

          return 'echo "invalid environment argument"';
        }
      }
    }

  });

  // Load Grunt Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-git-deploy');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['preview']);
  grunt.registerTask('preview', ['jshint:src', 'shell:wintersmith:local']);
  grunt.registerTask('build', ['clean:build', 'jshint:src', 'shell:wintersmith:prod']);
  grunt.registerTask('dist', ['uglify:dist', 'cssmin:dist', 'htmlmin:dist', 'imagemin:dist', 'copy', 'clean:extraCSS']);
  grunt.registerTask('deploy', ['clean', 'build', 'dist', 'hashres', 'git_deploy:gh_pages']);
};
