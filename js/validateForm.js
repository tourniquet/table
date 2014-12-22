var validForm;

var validateMyForm = function() {
	$('#myForm').validate({
	  rules: {
	    title: {
	      required: true,
	      minlength: 3
	    },
	    brand: {
	      required: true,
	      minlength: 3
	    },
	    usd: {
	    	number: true,
	      required: true,
	      minlength: 3
	    }
	  }
	});

	validForm = $('#myForm');
	validForm.validate();
};