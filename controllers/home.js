
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
  res.render('home', {
    title: 'Home'
  });
};


exports.newcommon = (req,res) => {
    var responseData = [];
    res.render('common', {
        title: 'common',
        items: responseData
    });
}

exports.profile = (req, res) => {
	console.log('inside profile');
	console.log(req.params.userid);
	
	getUser(req, res, function(req, res, responseData) {
		renderProfile(req, res, responseData);
	});
};

var renderProfile = (req,res, responseData) => {
	console.log('inside renderProfile');
	console.log(responseData);
	res.render('profile', {
	    title: 'profile',
	    p_user: responseData
	  });
}

/**
 * GET /
 * About Us page
 */
exports.about = (req, res) => {
    console.log('inside index in home.js');
    res.render('about', {
      title: 'About'
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

/**
* GET /:itemid
*
*/
exports.item = (req,res) => {
	console.log('inside item');
	console.log(req.params.itemid);
	console.log(req.params.userid);

	getSingleItem(req, res, function(req, res, responseData) {
		renderItem(req, res, responseData);
	});


	
};

var getSingleItem = (req, res, callback) => {
	var requestOptions, path;
	console.log('inside getSingleItem');
    path = "/usersanditems/item/" + req.params.userid + "/" + req.params.itemid;
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

var renderItem = (req,res, responseData) => {
	console.log('inside renderItem');
	console.log(responseData);
	res.render('item', {
	    title: 'item',
	    item: responseData
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
		{ $project: {email: 1, _id: 1, profile: 1, item_id: "$sale._id", item_name: "$sale.name", item_category: "$sale.category", item_price: "$sale.price", item_create: "$sale.created", description: "$sale.description"} },
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
