module.exports = function (grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var siteConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    site: siteConfig,
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      options: {
        sassDir: '<%= site.app %>/styles',
        cssDir: '<%= site.app %>/styles',
        imagesDir: '<%= site.app %>/images',
        javascriptsDir: '<%= site.app %>/scripts',
        fontsDir: '<%= site.app %>/styles/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['app/**/*.js','app/**/*.scss'],
        tasks: ['jshint', 'compass'],
        options: {
          spawn: false,
        },
      },
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'test.js',
        'app/scripts/*.js'
      ]
    },
    modernizr: {
      dist: {
        devFile: 'app/components/modernizr/modernizr.js',
        outputFile: 'app/scripts/libs/modernizr.custom.min.js',

        extra: {
          shiv: true,
          mq: true
        },

        // Minify
        uglify: true,
      }
    }
  }); // initConfig

  grunt.registerTask('default', ['jshint', 'compass:server', 'modernizr']);
};
