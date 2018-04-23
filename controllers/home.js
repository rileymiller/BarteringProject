
//const userCtrl = require('../api/controllers/userCtrl.js')//;
//const itemCtrl = require('../api/controllers/itemCtrl.js');
var mongoose = require('mongoose');
const User = require('../models/User');
var request = require('request');
var apiOptions = {
    server: "http://localhost:8080"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://nameless-basin-42853.herokuapp.com";
}


/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  console.log('inside index in home.js');
  //console.log(req.params.userid);
  res.render('home', {
    title: 'Home'
  });
};

/**
* redirect from OAuth2.0 session from Google as of now
*
*/

exports.newcommon = (req,res) => {
    console.log('inside newcommon')
    var items_blank = [];
    res.render('common', {
        title: 'common',
        items: items_blank
      });
}

/**
* GET /:userid
* Common Page
*
*/
exports.common = (req,res) => {
	console.log('inside common in home.js');
	console.log(req.params.userid);
	
	getUser(req, res, function(req, res, responseData) {
		renderCommonArea(req, res, responseData);
	});


	
};

var getUser = (req, res, callback) => {
	var requestOptions, path;
	console.log('inside getUser');
    path = "/usersanditems/user/" + req.params.userid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {

                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

var renderCommonArea = (req,res, responseData) => {
	console.log('inside renderCommonArea');
	console.log(responseData);
	res.render('common', {
	    title: 'common',
	    items: responseData
	  });
}

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};




var getRecentItems = (req, res, callback) => {
	var requestOptions, path;
	console.log('inside getRecentItems');
    path = "/usersanditems/recentItems";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {

                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
}

/**
* GET /recentItems
* get the most recent items
*/
exports.recentItems = (req,res) => {
	console.log('getting recent items in exports')
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
