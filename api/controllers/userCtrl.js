var mongoose = require('mongoose');
var User = mongoose.model('User');


var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getUserById = function(req, res) {
    console.log('reading one user');
    console.log('Finding user details', req.params);
    if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(user)
                sendJsonResponse(res, 200, user);
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
};

module.exports.getBoughtItems = function(req, res) {
	console.log('getting bought items for user ', req.params.userid)
	if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .select('bought')
            .exec(
                function(err, user) {
                    console.log(user);
                    var response;

                    // checks if user is valid
                    if (!user) {
                        sendJsonResponse(res, 404, {
                            "message": "user not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }

                    // returns all bought items for a user, can return empty array
                    if (user.bought) { 
                        response = {
                            bought: user.bought
                        };
                        sendJsonResponse(res, 200, response);
                    } else {
                        sendJsonResponse(res, 404, {
                            "message": "No bought items found"
                        });
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid is both required"
        });
    }
};

module.exports.getSaleItems = function(req, res) {
	console.log('getting sale items for user ', req.params.userid)
	if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .select('sale')
            .exec(
                function(err, user) {
                    console.log(user);
                    var response;

                    // checks if user is valid
                    if (!user) {
                        sendJsonResponse(res, 404, {
                            "message": "user not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }

                    // returns all bought items for a user, can return empty array
                    if (user.sale) { 
                        response = {
                            sale: user.sale
                        };
                        sendJsonResponse(res, 200, response);
                    } else {
                        sendJsonResponse(res, 404, {
                            "message": "No sale found"
                        });
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid is both required"
        });
    }
};