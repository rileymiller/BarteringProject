var items = [];

$(document).ready(() => {

	console.log('inside common.js');
	
	/*var apiOptions = {
	    server: "http://localhost:8080"
	};*/

	var server = window.location.origin;



	// if (process.env.NODE_ENV === 'production') {
	//     apiOptions.server = "https://nameless-basin-42853.herokuapp.com";
	// }
	 
	 console.log(window.location.origin);
	$(function(){
		path = "/usersanditems/recentItems";
		console.log('inside of ajax')
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('success');
	             console.log(JSON.stringify(data));
	             console.log(data);
	             items = data;
	             console.log(typeof(data));
	             drawSVG();
	        }
		});
	});


	//console.log(items);

});


var drawSVG = () => {
	console.log(items);
	console.log(typeof(items));
}