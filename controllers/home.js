
//const userCtrl = require('../api/controllers/userCtrl.js')//;
//const itemCtrl = require('../api/controllers/itemCtrl.js');
var mongoose = require('mongoose');
const User = require('../models/User');



/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  console.log('inside index in home.js');
  res.render('home', {
    title: 'Home'
  });
};

/**
* GET /:userid
* Common Page
*
*/
exports.common = (req,res) => {
	console.log('inside common in home.js');
	console.log(req.params.userid);

	res.render('common', {
	    title: 'common'
	  });
};

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/**
* GET /recentItems
* get the most recent items
*/
exports.recentItems = (req,res) => {
	console.log('getting recent items')
	items = User.aggregate(
		[{ $unwind: "$sale" },
		{ $project: {email: 1, _id: 1, item_id: "$sale._id", item_name: "$sale.name", item_category: "$sale.category", item_price: "$sale.price", item_create: "$sale.created"} },
		{ $sort: {item_create: -1} }, {$limit : 5}]).exec(
		  	function(err, items) {
		  		if (!items){
		  			sendJsonResponse(res, 404, 'No documents found');
		  			return;
		  		} else if (err) {
		  			sendJsonResponse(res, 400, err)
		  			return;
		  		}
		  		if(items) {
		  			sendJsonResponse(res, 200, items);
		  		}
		  	}
		);
}
