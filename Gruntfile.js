(function() {

  module.exports = function (grunt) {
    grunt.config.init({
      pkg: grunt.file.readJSON('package.json'),
      srcPath: './src',
      destPath: './public',
      sass: {
        css: {
          options: {
            sourcemap: 'none',
            style: 'expanded'
          },
          files: [{
            expand: true,
            cwd: '<%= srcPath %>/scss',
            src: ['*.scss'],
            dest: '<%= destPath %>/css',
            ext: '.css'
          }]
        },
      },
      ect: {
        options: {
          root:'<%= srcPath %>',
        },
        render: {
          expand: true,
          cwd:'<%= srcPath %>/html',
          src: ['**/*.html', '!partials/**/*.html'],
          ext: '.html',
          dest:'<%= srcPath %>/_temp'
        }
      },
      concat: {
        js: {
          files: [
            {
              src: [
                '<%= srcPath %>/js/vendor/jquery-1.12.4.min.js',
                '<%= srcPath %>/js/vendor/underscore.min.js',
              ],
              dest: '<%= destPath %>/js/vendor.js'
            },
            
            {
              src: [
                '<%= srcPath %>/js/index.js',
                '<%= srcPath %>/js/post.js'
              ],
              dest: '<%= destPath %>/js/main.js'
            }
          ]
        }
      },
      uglify: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        js: {
          files: [{
            expand: true,
            cwd: '<%= destPath %>/js',
            src: ['main.js'],
            dest: '<%= destPath %>/js',
            ext: '.js',
            extDot: 'last'
          }]
        }
      },
      copy: {
        html: {
          options: {
            encoding: 'utf8',
            process: function(content) {
              return content.replace(/\r\n|\n\r|\n|\r/g, "\n");
            }
          },
          expand: true,
          cwd: '<%= srcPath %>/_temp',
          src: ['**/*.html'],
          dest: '<%= destPath %>'
        }
      },
      clean: {
        ect: ['<%= srcPath %>/_temp', '<%= destPath %>/_temp']
      },
      watch: {
        html: {
          files: ['<%= srcPath %>/html/**/*.html'],
          tasks:  ['html']
        },
        js: {
          files: ['<%= srcPath %>/js/**/*.js'],
          tasks: ['js']
        },
        css: {
          files: ['<%= srcPath %>/scss/**/*.scss'],
          tasks: ['css']
        }
      }
    });

    // Load Grunt Plugins
    var PACKAGE_JSON = grunt.file.readJSON('package.json');
    Object.keys(PACKAGE_JSON.devDependencies).map(function(name){
      if(name.match('grunt-')){
        grunt.loadNpmTasks(name);
      }
    });


    /* Grunt tasks */

    grunt.registerTask('default',         ['build']);
    grunt.registerTask('build',           ['css', 'js', 'html']);
    grunt.registerTask('css',             ['sass:css']);
    grunt.registerTask('js',              ['concat', 'uglify']);
    grunt.registerTask('html',            ['ect', 'copy:html', 'clean:ect'])

  };

})();
