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
	res.render('common', {
	    title: 'common'
	  });
};
