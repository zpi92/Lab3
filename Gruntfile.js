
module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
     sass: {
     files: '**/*.scss',
       tasks: ['css']        
      },   	
	  
      concat: {
        files: ['js/hello.js','js/main.js'], //source
        tasks: ['concat']
      },
      uglify: {
        files: 'release/js/built.js', // destination
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      all: {
        files: ['**/*.html'],
        options: {
          livereload: true
        }
      }
    },	

	//11.2.	Перевірити весь JavaScript код у своєму проекті на валідність за допомогою JSHint, стиснути його та помістити у один файл. 
	jshint: {   //валідність
	  files: ['Gruntfile.js', 'src/**/*.js'],  
	  options: {  
		globals: {
		  jQuery: true,
		  console: true,
		  module: true
		}
	  }
	},

	// concat: { //стиснути
        // files: ['src/**/*.js'], //source
        // tasks: ['concat']
      // },
      // uglify: {
        // files: 'release/js/built.js', // destination
        // tasks: ['uglify'],
        // options: {
          // livereload: true
        // }
      // },	
	

    concat: { //один файл
      options: {
        separator: '\n/*next file*/\n\n'
      },
      dist: {
        src:['js/*.js','js/main.js'],
        dest: 'release/js/built.js'
      }
    },

    uglify: {
      build: {
        files: {
          'release/js/built.min.js': ['release/js/built.js'] // стискається файл отрманий після обєднання concat:dest
        }
      }
    },

	//11.4.	Стиснути усі зображення проекту та згенерувати для них спрайти.
	imagemin: { //Стиснути
		dynamic: {
			files: [{
				expand: true,
				cwd: 'img/', //source
				src: ['**/*.{png,jpg,gif}'],
				dest: 'release/img/' // destination
			}]
		}
	},

	sprite:{ //спрайти
      all: {
        src: 'release/img/*.png',
        dest: 'release/sprite/spritesheet.png',
        destCss: 'release/sprite/sprites.css'
      }
    },

		
	//11.3.	Помістити усі стилі проекту у один файл CSS, стиснути його.
	cssmin: {
	  options: {
		shorthandCompacting: false,
		roundingPrecision: -1
	  },
	  combine: {
		files: {
		  'release/output.min.css': ['css/*.css', '!css/*.min.css'] // 'destination': 'source'  
		}
	  }
	},	
		

  htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
       'release/index.html'  :'index.html'     // 'destination': 'source'        
      }
    },
    dev: {                                       // Another target
      files: {
        'release/index.html'  :'index.html'     // 'destination': 'source'  
      }
    }
  },
  
   less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "release/less/style.css": "less/less.style1.less" // destination file and source file
        }
      }
    }
	
		  
 });



  
  //grunt.registerTask('default', ['watch']);
  grunt.registerTask('css', ['cssmin']);
  grunt.registerTask('js', [ 'concat', 'uglify']);
  
  
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'imagemin', 'cssmin', 'sprite',  'htmlmin', 'less']);

  // Load up tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');     
  grunt.loadNpmTasks('grunt-contrib-uglify'); 
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-contrib-imagemin');  
  grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
  grunt.loadNpmTasks('grunt-contrib-less'); 
  grunt.loadNpmTasks('grunt-spritesmith');

};
