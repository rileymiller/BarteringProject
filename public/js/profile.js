var items = [];
var user = {};
var server = window.location.origin;
var userid;

$(document).ready(() => {

  // Place JavaScript code here...
 	userid = $('#id').text();
	userid.replace(/\s+/g, '');
	server = window.location.origin;
	console.log(window.location.origin);

	$('button#submit').on('click', function(e) {
		console.log('form submit button clicked');
		e.preventDefault();

		console.log(userid);
		var name = $('#name').val();
		var category = $('#category').val();
		var price = $('#price').val();
		var description = $('#description').val();

		console.log("name: " + name + ", category: " + category + ", price: " + price + ", description: " + description);

		if(name == '' || category == '' || price == '' || description ==''){
			$('#error').append('<div class=\"alert alert-danger\" role=\"alert\">All fields must be filled out!</div>')
			.attr('class', 'error');
		} else {
			$('#error').attr('class', 'noerror');
			var path = "/usersanditems/" + userid + '/item';
			console.log(window.location.href);

			// create the new item
			$.ajax({
				type:'POST',
				contentType: 'application/json',
		        url: server + path,
		        data: JSON.stringify({name: name, category: category, description: description, price: price}),						
		        success: function(data) {
		            console.log('success creating new item');
		            $('#new-item-modal').modal('hide');
		            //socket.emit('item created', data);
		            // clearModal();
		            // $('#blockCanvas').remove();
		            // getRecentItems();
		            location.reload();
		        }, error: function(d) {
		        	console.log(d);
		        }
			});
		}
	});

	$('[id^=esubmit-').on('click', function(e) {
		console.log('esubmit clicked')
		console.log(this);
		console.log(this.id)

		var id = this.id;
		var item_id = id.substring(id.indexOf('-') + 1);

		console.log(item_id);

		var name = $('#name-' + item_id).val();
		var category = $('#category-' + item_id).val();
		var price = $('#price-' + item_id).val();
		var description = $('#description-' + item_id).val();

		console.log("name: " + name + ", category: " + category + ", price: " + price + ", description: " + description);

		if(name == '' || category == '' || price == '' || description == ''){
			$('#error').append('<div class=\"alert alert-danger\" role=\"alert\">All fields must be filled out!</div>')
			.attr('class', 'error');
		} else {
			$('#error').attr('class', 'noerror');
			var path = "/usersanditems/item/" + userid + '/' + item_id;
			console.log(window.location.href);

			// create the new item
			$.ajax({
				type:'PUT',
				contentType: 'application/json',
		        url: server + path,
		        data: JSON.stringify({name: name, category: category, description: description, price: price}),						
		        success: function(data) {
		            console.log('success editing item item');
		            $('#edit-item-modal-' + item_id).modal('hide');
		            location.reload();
		            //socket.emit('item created', data);
		            // clearModal();
		            // $('#blockCanvas').remove();
		            // getRecentItems();
		            //location.reload();
		        }, error: function(d) {
		        	console.log(d);
		        }
			});
		}
	});

	$('[id^=delete-item-').on('click', function(e) {
		console.log('esubmit clicked')
		console.log(this);
		console.log(this.id)

		var id = this.id;
		var item_id = id.substring(id.indexOf('-') + 1);
		item_id = item_id.substring(item_id.indexOf('-') + 1);
		console.log(item_id);

		var path = "/usersanditems/item/" + userid + '/' + item_id;
			console.log(window.location.href);

			// create the new item
			$.ajax({
				type:'DELETE',
				contentType: 'application/json',
		        url: server + path,
		        data: JSON.stringify({name: name, category: category, description: description, price: price}),						
		        success: function(data) {
		            console.log('success deleting item');
		            // $('#edit-item-modal-' + item_id).modal('hide');
		            location.reload();
		            //socket.emit('item created', data);
		            // clearModal();
		            // $('#blockCanvas').remove();
		            // getRecentItems();
		            //location.reload();
		        }, error: function(d) {
		        	console.log(d);
		        }
			});
	});
	
});
