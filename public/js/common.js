$(document).ready(() => {

	console.log('inside common.js');


	var apiOptions = {
	    server: "http://localhost:8080"
	};

	if (process.env.NODE_ENV === 'production') {
	    apiOptions.server = "https://nameless-basin-42853.herokuapp.com";
	}
	var items = [];

	$(function(){
		path = "/usersanditems/recentItems";
		console.log('inside of ajax')
		$.ajax({
			type:'GET',
			data: JSON.stringify(data),
			contentType: 'application/json',
	        url: apiOptions.server + path,						
	        success: function(data) {
	            console.log('success');
	                console.log(JSON.stringify(data));
	        }
		});
	});


});
