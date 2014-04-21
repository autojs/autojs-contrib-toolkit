var path = require('path')
  , os = require('os')
  , currentPlatform = os.platform();

function noop() {}

function each(obj, fn) {
	var key;

	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			fn(key, obj[key]);
		}
	}
}

function extend(destination) {
	Array.prototype.slice.call(arguments, 1).forEach(function(source) {
		each(source, function(key, value) {
			destination[key] = value;
		});
	});

	return destination;
}

function abstractMethod(name) {
	throw new Error('Method, ' + name + ', must be overriden');
}

function adapter(pathname, name, platform) {
	return require(path.join(pathname, 'adapters', platform || currentPlatform, name));
}

function adapterFallback(pathname, name, fallback) {
	try {
		return adapter(pathname, name);
	} catch(e) {
		return require(path.join(pathname, fallback || 'abstract'));
	}
}

extend(exports, {
	noop: noop,
	each: each,
	extend: extend,
	abstractMethod: abstractMethod,
	adapter: adapter,
	adapterFallback: adapterFallback
});