var ticss = ticss || {};

ticss.Css = ticss.Css || function(params) { return (function(params) {
	params = params || {};
	var map = params.map || null;
	
	var self = {};
	
	self.get = function(id) {
		var result = map;
		var parts = id.split("_");
		for (var i = 0, l = parts.length; i < l; ++i) {
			result = result[parts[i]];
			if (!result) {
				return {};
			}
		}
		return result;
	};
	
	return self;
}(params))};
