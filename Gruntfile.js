module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('debug', ['typescript', 'rename:debug', 'clean', 'copy:debug']);
  grunt.registerTask('default', ['typescript', 'uglify:prod', 'cssmin', 'clean']);

  grunt.initConfig({
    typescript: {
      base: {
        src: ['lib/GameManager.ts', 
              'lib/GameScreen.ts', 
              'lib/GameObject.ts', 
              'lib/FPSDisplay.ts', 
              'lib/LookUpTable.ts', 
              'lib/LookUpTableRender.ts', 
              'lib/Vector.ts', 
              'lib/Tunnel.ts', 
              'lib/ImageDataLoader.ts'],
        dest: 'temp/compiled.js',
        target: 'ES3',
        options: {
            module: 'commonjs',
        }
      }
    },
    uglify: {
      prod: {
        options: {
          'beautify': false,
          'no-mangle-functions': false,
          'report': 'min'
        },
        files: {
          'js/compiled.min.js': ['temp/compiled.js']
        }
      },
      debug: {
        options: {
          'beautify': true,
          'no-mangle-functions': true
        },
        files: {
          'js/compiled.min.js': ['temp/compiled.js']
        }
      }
    },
    clean: ['temp/'],
    rename: {
      debug: {
        src: 'temp/compiled.js',
        dest: 'compiled.min.js'
      },
    },
    copy: {
      debug: {
        src: 'css/style.css',
        dest: 'css/style.min.css',
      },
    },
    watch: {
      scripts: {
        files: ['lib/*.ts', 'style/*.css'],
        tasks: ['default'],
      },
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '',
        src: ['css/*.css', 'css/!*.min.css'],
        dest: '',
        ext: '.min.css'
      }
    }
  });
};

/*grunt init
npm install grunt-contrib-clean --save-dev
npm install grunt-typescript --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-rename --save-dev
npm install grunt-contrib-cssmin --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-watch --save-dev*/