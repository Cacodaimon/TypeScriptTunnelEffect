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
        src: ['GameManager.ts', 'GameScreen.ts', 'GameObject.ts', 'FPSDisplay.ts', 'LookUpTable.ts', 'LookUpTableRender.ts', 'Vector.ts', 'Tunnel.ts', 'ImageDataLoader.ts'],
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
          'no-mangle-functions': true,
          'report': 'min'
        },
        files: {
          'compiled.min.js': ['temp/compiled.js']
        }
      },
      debug: {
        options: {
          'beautify': true,
          'no-mangle-functions': true
        },
        files: {
          'compiled.min.js': ['temp/compiled.js']
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
        src: 'style.css',
        dest: 'style.min.css',
      },
    },
    watch: {
      scripts: {
        files: ['*.ts', '*.css'],
        tasks: ['default'],
      },
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '',
        src: ['*.css', '!*.min.css'],
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
npm install grunt-contrib-cssmin
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-watch*/