var item;
var sellerid;
var buyerid;
var buyer;
var seller;
var server = window.location.origin;

$(document).ready(() => {


	pathname = window.location.pathname
	sellerid = pathname.substring(1,25)
	console.log('sellerid ',sellerid)
	itemid = pathname.substring(31,55)
	console.log('itemid', itemid)
	buyerid = pathname.substring(67)
	console.log(buyerid)

	// GET the item
	// getItem(function(responseData) {
	// 	console.log(buyer);
	// });
	getItem(function(){
		console.log(buyer)
	})
	

	$('button#buy').on('click', function(e) {
		console.log('buy button clicked');
	});
});

var getItem = () => {
	$(function(){
		var path = "/usersanditems/item/" + sellerid + '/' + itemid;
		console.log('inside of get items')
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('success');
	            // console.log(JSON.stringify(data));
	            // console.log(data);
	            item = data;
	            getSeller()
	        }
		});
	});
}

var getSeller = () => {
	$(function(){
		var path = "/usersanditems/user/" + sellerid ;
		console.log('inside of get seller')
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('success');
	            // console.log(JSON.stringify(data));
	            // console.log(data);
	            seller = data;
	            getBuyer()
	        }
		});
	});
}

var getBuyer = () => {
	$(function(){
		var path = "/usersanditems/user/" + buyerid ;
		console.log('inside of get buyer')
		$.ajax({
			type:'GET',
			contentType: 'application/json',
	        url: server + path,						
	        success: function(data) {
	            console.log('success');
	            // console.log(JSON.stringify(data));
	            // console.log(data);
	            buyer = data;
	            updateBuyer()
	        }
		});
	});
}

var updateBuyer = () => {
	console.log('in updateBuyer')
	console.log(item)
	console.log(buyer)
	console.log(seller)
	$(function(){
		var path = "/usersanditems/item/" + buyerid + '/' + itemid;
		console.log('inside of update buyer')
		$.ajax({
			type:'PUT',
			contentType: 'application/json',
	        url: server + path,	
	        json: {

	        },				
	        success: function(data) {
	            console.log('success');
	            // console.log(JSON.stringify(data));
	            // console.log(data);
	            item = data;
	        }
		});
	});
}