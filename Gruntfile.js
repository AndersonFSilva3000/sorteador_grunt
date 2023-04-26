module.exports = function(grunt) {
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          'dev/styles/main.css': 'src/styles/main.less'
        }
      },
      production: {
        options: {
          compress: true,
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.less'
        }
      }
    },
    watch: { //configuração do watch para pegar o less
      less: {
        files: ['src/styles/**/*.less'],
        tasks: ['less:development']
      },
      html: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [ //O replace é a substituição, ele encontar uma palavra e troca pelo valor que eu definir
            {
              match: 'ENDERECO_DO_CSS',  //Palavra que o plugin vai encontrar
              replacement: './styles/main.css'
            },
            {
              match: 'ENDERECO_DO_JS',  //Palavra que o plugin vai encontrar
              replacement: '../src/scripts/main.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {
        options: {
          patterns: [ //O replace é a substituição, ele encontar uma palavra e troca pelo valor que eu definir
            {
              match: 'ENDERECO_DO_CSS',  //Palavra que o plugin vai encontrar
              replacement: './styles/main.min.css'
            },
            {
              match: 'ENDERECO_DO_JS',  //Palavra que o plugin vai encontrar
              replacement: './scripts/main.min.js'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/index.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,     //Remove os Comentarios do HTML
          collapseWhitespace: true  //Apaga todos os espasos em branco
        },
        files: {
          'prebuild/index.html': 'src/index.html'
        }
      }
    },
    clean: ['prebuild'],
    uglify: {
      target: {
        files: {
          'dist/scripts/main.min.js': 'src/scripts/main.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.registerTask('default', ['watch']); //roda o watch
  grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);
}