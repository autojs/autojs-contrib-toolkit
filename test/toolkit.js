describe('toolkit', function () {
	var toolkit = require('../lib/toolkit')
	  , path = require('path')
	  , os = require('os');

	describe('.each(obj, fn)', function () {
		it('should call the specified function on each owned property', function() {
			function Test() {
				this.this1 = 1;
				this.this2 = true;
				this.this3 = 'test';
			}

			Test.prototype.not = 'this';

			var result = [];

			toolkit.each(new Test(), function(key, value) {
				result.push([key, value]);
			});

			result.should.eql([
				['this1', 1],
				['this2', true],
				['this3', 'test']
			]);
		});
	});

	describe('.extend(destination)', function () {
		it('should iterate over each argument except the first and extend these object values', function() {
			toolkit.extend({
				prop1: 1
			}, {
				prop1: 0,
				prop2: 1,
				prop3: 2
			}).should.eql({
				prop1: 0,
				prop2: 1,
				prop3: 2
			});

			toolkit.extend({
				prop1: 1
			}, {
				prop2: 1,
				prop3: 2
			}).should.eql({
				prop1: 1,
				prop2: 1,
				prop3: 2
			});
		});
	});

	describe('.noop()', function () {
		it('should be a empty function', function () {
			toolkit.noop.should.be.an.instanceof(Function);
			toolkit.noop.toString().should.equal('function noop() {}');
		});
	});

	describe('.abstractMethod(name)', function () {
		it('should throw an error', function() {
			(function() {
				toolkit.abstractMethod('test');
			}).should.throw();
		});
	});

	describe('.adapter(pathname, file, platform)', function () {
		it('should require and return specified adapter file', function() {
			var pathname = __dirname
			  , name = 'test';

			toolkit.adapter(pathname, name, 'win32').should.equal(require(path.join(pathname, 'adapters', os.platform(), name)));
		});
	});

	describe('.adapterFallback(path, file, fallback)', function () {
		it('should require and return specified adapter file if missing then return the fallback file', function() {
			var pathname = __dirname
			  , name = 'test2'
			  , fallback = 'adapters/fallback';

			toolkit.adapterFallback(pathname, name, fallback).should.equal(require(path.join(pathname, fallback)));
		});
	});
});