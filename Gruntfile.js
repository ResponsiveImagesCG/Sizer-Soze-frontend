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
    }

  }); // initConfig

  grunt.registerTask('default', ['compass:server']);
};
