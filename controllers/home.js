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
