$('#testThisId').on('click', function(id) {
	sortByUSD(id);
});

// edit item
var editItem = function(id) {
	marketId = id;

	// if div exists, remove it
	var element = document.getElementById('dialog-form');

	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

	var getDataById = JSON.parse(localStorage.getItem(id));

	// open modal window
	dialog = $('#edit-form').dialog({
		modal: true,
		buttons: {
			"Save": function(marketId) {
				if (validForm.valid()) {
					addItem(marketId);
					$(this).dialog('close');
				}
			},
			Cancel: function() {
				dialog.dialog('close');
			}
		}
	});

	form = $('#edit-form form').on('submit', function(id) {
		event.preventDefault();
		addItem();
		dialog.dialog('close');
	});
	
	var pushValueToForm = '<form id="myForm">\
	      <fieldset>\
	        <label for="title">Title</label>\
	        <input name="title" id="title" type="text" value="' + getDataById.title + '" class="text ui-widget-content ui-corner-all">\
	        <label for="brand">Brand</label>\
	        <input type="text" name="brand" id="brand" value="' + getDataById.brand + '" class="text ui-widget-content ui-corner-all">\
	        <label for="usd">Estimated Sales Ammount</label>\
	        <input type="text" name="usd" id="usd" value="' + getDataById.usd + '" class="text ui-widget-content ui-corner-all">\
	        <label for="quarter">Launch Timeframe</label>\
	        <select id="quarter" value="Q2">\
	          <option>Q1</option>\
	          <option>Q2</option>\
	        </select>\
	        <select id="year">\
	          <option>2011</option>\
	          <option>2012</option>\
	        </select>\
	        <label for="confidential">Win Confidential</label>\
	        <select id="editConfidential">\
	          <option' + (getDataById.confidential === 'Low' ? ' selected' : '') + '>Low</option>\
	          <option' + (getDataById.confidential === 'Medium' ? ' selected' : '') + '>Medium</option>\
	          <option' + (getDataById.confidential === 'High' ? ' selected' : '') + '>High</option>\
	        </select>\
	        <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">\
	      </fieldset>\
	    </form>';

    document.getElementById('edit-form').innerHTML = pushValueToForm;
    showLabels();
    validateMyForm();
};


// show labels bottom of the table
var showLabels = function() {
	var marketLaunches = localStorage.length;
	var regionalSalesPotential = 0;
	var globalSalesPotential = 0;

	for (var i = 0; i < localStorage.length; i++) {
		regionalSalesPotential += parseInt(pushDataToArray[i].usd);
		globalSalesPotential += parseInt(pushDataToArray[i].chf);
	};

	var showLabelsObject = {
		marketLaunches : marketLaunches,
		regionalSalesPotential : regionalSalesPotential,
		globalSalesPotential : globalSalesPotential
	};

	var leftLabel = $('#leftLabel').html();
	Mustache.parse(leftLabel);   // optional, speeds up future uses
	var rendered = Mustache.render(leftLabel, showLabelsObject);
	$('#showLabels').html(rendered);
};


// 
var loadAddForm = function() {
	var defaultForm = '<form id="myForm">\
      <fieldset>\
        <label for="title">Title</label>\
        <input type="text" name="title" id="title" minlength="3" required class="text ui-widget-content ui-corner-all" />\
        \
        <label for="brand">Brand</label>\
        <input type="text" name="brand" id="brand" minlength="3" class="text ui-widget-content ui-corner-all" required>\
				\
        <label for="usd">Estimated Sales Ammount</label>\
        <input type="text" name="usd" id="usd" class="text ui-widget-content ui-corner-all" required>\
        \
        <label for="quarter">Launch Timeframe</label>\
        <select id="quarter" value="Q2">\
          <option>Q1</option>\
          <option>Q2</option>\
        </select>\
        \
        <select id="year">\
          <option>2011</option>\
          <option>2012</option>\
        </select>\
        \
        <label for="confidential">Win Confidential</label>\
        <select id="confidential">\
          <option>Low</option>\
          <option>Medium</option>\
          <option>High</option>\
        </select>\
        \
        <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">\
      </fieldset>\
    </form>'

	document.getElementById('dialog-form').innerHTML = defaultForm;
};