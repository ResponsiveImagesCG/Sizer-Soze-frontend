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
    sass: {
        dev: {
          options: {
            unixNewlines: true,
            style: 'expanded',
            banner: '/*! SizerSoze - MIT License - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */',
            sourcemap: true
          },
          files: ['app/styles/*.scss'],
          src: 'app/styles/main.scss',
          dest: 'app/styles/main.css'
        },

        build: {
          options: {
            style: 'compressed',
            banner: '/*! SizerSoze - MIT License - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
          },
          files: ['app/styles/*.scss'],
          src: 'app/styles/main.scss',
          dest: 'app/styles/main.min.css',
        }
    },
    watch: {
      scripts: {
        files: ['app/**/*.js','app/**/*.scss'],
        tasks: ['jshint', 'sass:dev']
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

  grunt.registerTask('default', ['jshint', 'sass:dev', 'modernizr']);
  grunt.registerTask('build', ['jshint', 'sass:build', 'modernizr']);
};
