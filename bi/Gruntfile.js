module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    fixturesPath: ".",
    includereplace: {
      dist: {
        options: {
          // Task-specific options go here.
        },
        src: ['<%= fixturesPath %>/htmlSrc/**/*.html'],
        dest: '<%= fixturesPath %>/.html/'
      }
    },
    copy: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= fixturesPath %>/.html/<%= fixturesPath %>/htmlSrc/',
          src: ['**/*.html'],
          dest: '<%= fixturesPath %>/html/'
        }]
      }

    },
    uglify: {
      options: {
        // banner: '/*<%= grunt.template.date(new Date(),"yyyy-mm-dd HH:MM:ss") %> */\n',
        beautify: {
          ascii_only: true // 转义non-ascii字符
        }
      },
      js: {
        files: [{
          expand: true,
          cwd: '.js/',
          src: ['init/**/*.js', '!init/**/*-debug.js'], // 压缩除debug文件
          dest: 'js/',
          ext: '.js'
        }]
      },
    },
    transport: {
      options: {
        idleading: ''
      },
      all: {
        files: [{
          expand: true,
          cwd: 'jsSrc/',
          src: ['**/*.js'],
          dest: '.js/',
          ext: '.js'
        }]
      }
    },

    concat: {
      main: {
        options: {
          include: 'all'
        },
        files: [{
          expand: true,
          cwd: '.js/',
          src: ['init/*.js', 'init/**/*.js'], // 合并所有js/任意/page/的所有js文件
          dest: '.js/',
          ext: '.js'
        }]
      }
    },
    less: {
      active: {
        files: [{
          expand: true,
          cwd: 'less/',
          src: [
            "**/*.less"
          ],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    watch: {
      options: {
        // event: ["changed"],
        // debounceDelay: 250
      },
      html_active: {
        files: [
          'htmlSrc/**/*.html'
        ],
        tasks: ['includereplace:dist', 'copy', 'clean']
      },
      lessss: {
        files: [
          'less/**/*.less'
        ],
        tasks: ['less', 'copy:less']
      },
      js: {
        files: [
          'jsSrc/**/*.js', 'jsSrc/*.js'
        ],
        tasks: ['clean', 'transport', 'concat', 'uglify', 'clean']
      }


    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      js: {
        src: ['.build/jsSrc/init/*.js', '!.build/jsSrc/init/*-debug.js']
      }
    },
    usemin: {
      html: '.html/htmlSrc/*.html',
      options: {
        blockReplacements: {
          filerev: function(block) {
            // return '<link rel="stylesheet" href="' + block.dest + '">';
            return '<script type="text/javascript" src="'+ block.dest +'"> </script>';
          }
        }
      }
    },
    clean: {
      dest: ['.html', '.js', '.css']
    }

  });
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-less');


  //'copy','clean','less','copy:less'   ,'filerev', 'usemin'
  grunt.registerTask('default', ['clean', 'transport', 'concat', 'uglify', 'includereplace', 'copy','clean']);
  grunt.registerTask('watch_html', ['watch']);
  grunt.registerTask('lesses', ['less', 'clean']);


}
