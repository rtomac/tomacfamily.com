module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    config: config,

    clean: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: '**',
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/',
          src: '**',
          dest: '<%= config.dist %>/',
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: '*.html',
          dest: '<%= config.dist %>/',
        }],
        options: {
          process: function (content, srcpath) {
            return grunt.template.process(content);
          }
        }
      }
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/styles/',
          src: '*.css',
          dest: '<%= config.dist %>/styles/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true,
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/',
          src: '*.html',
          dest: '<%= config.dist %>/'
        }]
      }
    },

    connect: {
      options: {
        hostname: 'localhost',
        port: 9000,
        open: false
      },
      app: {
        options: {base: '<%= config.app %>'}
      },
      dist: {
        options: {base: '<%= config.dist %>'}
      }
    }

  });

  grunt.registerTask('build', [
    'clean',
    'copy:dist',
    'copy:html',
    'cssmin',
    'htmlmin'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run(['connect:app:keepalive']);
  });

  grunt.registerTask('default', ['build']);

};
