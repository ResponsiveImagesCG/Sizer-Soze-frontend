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
    pkg: grunt.file.readJSON('package.json')

  }); // initConfig

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};
