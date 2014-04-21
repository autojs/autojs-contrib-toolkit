module.exports = function(grunt) {
	grunt.registerTask('default', ['jshint', 'mochaTest']);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jsLib: 'lib/**/*.js',
		jsTest: 'test/**/*.js',
		release: {
			options: {
				github: {
					repo: 'autojs/autojs-contrib-toolkit',
					usernameVar: 'GITHUB_USERNAME',
					passwordVar: 'GITHUB_PASSWORD'
				}
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					clearRequireCache: true,
					require: ['should']
				},
				src: ['<%= jsTest %>']
			}
		},
		jshint: {
			options: {
				jshintrc: true
			},
			all: ['<%= jsLib %>', '<%= jsTest %>'] 
		},
		watch: {
			test: {
				options: {
					spawn: false
				},
				files: ['<%= jsLib %>', '<%= jsTest %>'],
				tasks: ['default']
			}
		}
	});

	var defaultTestSrc = grunt.config('mochaTest.test.src');

	grunt.event.on('watch', function(action, filepath) {
		grunt.config('mochaTest.test.src', defaultTestSrc);

		if(filepath.match('test/')) grunt.config('mochaTest.test.src', filepath);
	});

	Object.keys(grunt.config('pkg.devDependencies')).forEach(function(task) {
		if(/^grunt-/.test(task)) grunt.loadNpmTasks(task);
	});
};