$(document).ready(function() {
	sortToUp();
	loadUser();
	showLabels();
});

// insert all localStorage key values
var getAllLocalStorageKeys = [];

// array that will contain all data from localStorage
var pushDataToArray = [];

// declaring dialog and form variable for modal window
var dialog, form, marketId;


var addItem = function() {
	// get data from input forms
	var title = $("#title").val();
	var brand = $("#brand").val();
	var usd = parseInt($("#usd").val());
	// get launch time quarter and year
	var quarter = $("#quarter").val();
	var year = $("#year").val();
	var launchTime = quarter + " " + year;
	var confidential = $('#confidential').val();

 	// 1chf = 1.1usd
	var chf = parseInt(usd / 1.1);

	var getDataToLocalStorage = {
		id : marketId,
		title : title,
		brand : brand,
		launchTime : launchTime,
		usd : usd,
		chf : chf,
		confidential : confidential
	};


	// create new localStorage element
	localStorage.setItem(marketId, JSON.stringify(getDataToLocalStorage));

	loadUser();
	showLabels();
};


// open modal window
var openModal = function() {
	loadAddForm();
	validateMyForm();

	dialog = $('#dialog-form').dialog({
		modal: true,
		buttons: {
			"Save": function() {
				if (validForm.valid()) {
					addItem();
					$(this).dialog('close');
				}
			},
			Cancel: function() {
				dialog.dialog('close');
			}
		}
	});
};


form = $('#dialog-form form').on('submit', function(event) {
	event.preventDefault();
	if (validForm.valid()) {
		addItem();
	};
	dialog.dialog('close');
});


var loadUser = function() {
	// if localStorage is not empty, push localStorage elements to array 
	getAllLocalStorageKeys = [];
	pushDataToArray = [];

	// push all localStorage keys to getAllLocalStorageKeys and parse data from localStorage to pushDataToArray
	for (var i = 0; i < localStorage.length; i++) {
		getAllLocalStorageKeys.push(parseInt(localStorage.key(i)));
	};

	//  sort elements in array 
	getAllLocalStorageKeys = getAllLocalStorageKeys.sort(function(a, b) { return a - b});

	for (var j = 0; j < localStorage.length; j++) {
		pushDataToArray.push(JSON.parse(localStorage.getItem(getAllLocalStorageKeys[j])));
	};

	// JSON formating data
	// incremented marketId compared to the last
	marketId = pushDataToArray.length ? parseInt(pushDataToArray[pushDataToArray.length - 1].id) + 1 : 1;

	// object which contain all data
	var showAllData = {
		"getData" : pushDataToArray
	};


	var template = $('#template').html();
	Mustache.parse(template);   // optional, speeds up future uses
	var rendered = Mustache.render(template, showAllData);
	$('#showInfo').html(rendered);
};


// remove item, cap! :)
var removeItem = function(id) {
	var remove = $("#remove-form").dialog({
		resizable: false,
		modal: true,
		buttons: {
			"Delete item": function() {
				localStorage.removeItem(id);
				loadUser();
				showLabels();
				$(this).dialog("close");
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});
};