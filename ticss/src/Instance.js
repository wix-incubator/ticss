var ticss = ticss || {};

ticss.Instance = ticss.Instance || (function() {
	var self = {};
	
	var theCss = null;
	
	function read(path) {
		var file = Ti.Filesystem.getFile(path);
		if (!file.exists()) {
			throw new Error("ticss file is missing: " + path);
		}
	
		var data = file.read();
		var json = data.text;
		return JSON.parse(json);
	}
	
	self.init = function(params) {
		params = params || {};
		var map = params.map || null;
		var file = params.file || null;
		
		if (map === null) {
			if (file === null) {
				throw new Error("ticss.Instance could not be initialized");
			}
			map = read(file);
		}
		theCss = new ticss.Css({
			map : map
		});
	};
	
	function clone(obj, deep) {
		if (deep) {
			return JSON.parse(JSON.stringify(obj));
		}
		
		var cloned = {};
		for (var i in obj) {
			cloned[i] = obj[i];
		}
		return cloned;
	}
	
	self.css = function(id, extra) {
		if (theCss === null) {
			throw new Error("ticss.Instance was not initialized");
		}
		
		// No need for deep clone as we use plain 1-level objects
		var obj = clone(theCss.get(id));
		
		if (extra) {
			for (var i in extra) {
				obj[i] = extra[i];
			}
		}
		
		return obj;
	};
	
	return self;
}());

// syntactic sugar
var css = ticss.Instance.css;
