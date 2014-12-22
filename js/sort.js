var sortToUp = function(id) {
	pushDataToArray = pushDataToArray.sort(function(a, b) {
	    if (a[id] > b[id]) return 1;
	    if (a[id] < b[id]) return -1;
	    checkSort = 0;
	    return 0;
	});

	refreshFunc();
};

var refreshFunc = function() {
	// object which contain all data
	var showAllData = {
		"getData" : pushDataToArray
	};

	var template = $('#template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, showAllData);
	$('#showInfo').html(rendered);
};