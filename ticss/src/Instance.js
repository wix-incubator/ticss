var ticss = ticss || {};

ticss.Instance = ticss.Instance || (function() {
	var self = {};
	
	var isLtr = null;
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
		var dir = params.dir || "ltr";
		var map = params.map || null;
		var file = params.file || null;
		
		isLtr = (dir === "ltr");
		
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
	
	function convert(obj) {
		if ((!obj) || (!obj.replace)) {
			return obj;
		}
		
		var start = (isLtr ? "left" : "right");
		var end = (isLtr ? "right" : "left");
		return obj.replace(/START/g, start).replace(/END/g, end);
	}
	
	function cloneAndConvert(obj) {
		var cloned = {};
		for (var i in obj) {
			cloned[convert(i)] = convert(obj[i]);
		}
		return cloned;
	}
	
	self.css = function(id, extra) {
		if (theCss === null) {
			throw new Error("ticss.Instance was not initialized");
		}
		
		// No need for deep clone as we use plain 1-level objects
		var obj = cloneAndConvert(theCss.get(id));
		
		if (extra) {
			for (var i in extra) {
				obj[convert(i)] = convert(extra[i]);
			}
		}
		
		return obj;
	};
	
	return self;
}());

// syntactic sugar
var css = ticss.Instance.css;
