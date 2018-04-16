var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

const transactionSchema = new mongoose.Schema({
	buyer: User,
	seller: User,
	Item: Item
}); //schema for transactions
/*
module.exports.coursesCreate = function(req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.coursesReadOne = function(req, res) {
    console.log('Finding course details', req.params);
    if (req.params && req.params.courseid) {
        Cor
            .findById(req.params.courseid)
            .exec(function(err, course) {
                if (!course) {
                    sendJsonResponse(res, 404, {
                        "message": "courseid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(course)
                sendJsonResponse(res, 200, course);
            });
    } else {
        console.log('No courseid specified');
        sendJsonResponse(res, 404, {
            "message": "No courseid in request"
        });
    }
};


module.exports.coursesUpdateOne = function(req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};

module.exports.coursesDeleteOne = function(req, res) {
    sendJsonResponse(res, 200, { "status": "success" });
};
*/
