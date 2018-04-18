var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.createItem = function(req, res) {
    if (req.params.userid) {
        User
            .findById(req.params.userid)
            .select('sale')
            .exec(
                function(err, course) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        doAddItem(req, res, course);
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid required"
        });
    }

};

var doAddItem = function(req, res, user) {
    if (!user) {
        sendJsonResponse(res, 404, "userid not found");
    } else {

        // console.log(item);
        // console.log(req.body);
        user.sale.push({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            status: req.body.status
        });

        item.save(function(err, item) {
            var thisItem;
            if (err) {
                console.log(err);
                sendJsonResponse(res, 400, err);
            } else {

                thisItem = user.sale[user.sale.length - 1];
                //console.log(thisAssignment);
                sendJsonResponse(res, 201, thisItem);
            }
        });

    }
};

module.exports.getItemById = function(req, res) {
    console.log("Getting item by id");
    if (req.params && req.params.userid && req.params.itemid) {
        User
            .findById(req.params.userid)
            .select('sale')
            .exec(
                function(err, user) {
                    console.log(user);
                    var response, item;
                    if (!user) {
                        sendJsonResponse(res, 404, {
                            "message": "userid not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    if (user.sale) {
                        item = user.sale.id(req.params.itemid);
                        if (!item) {
                            sendJsonResponse(res, 404, {
                                "message": "itemid not found"
                            });
                        } else {
                            response = {
                                user: {
                                    id: req.params.userid
                                },
                                item: item
                            };
                            sendJsonResponse(res, 200, response);
                        }
                    } else {
                        sendJsonResponse(res, 404, {
                            "message": "No item found"
                        });
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid and itemid are both required"
        });
    }
};

module.exports.updateItem = function(req, res) {
    if (!req.params.userid || !req.params.itemid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid and itemid are both required"
        });
        return;
    }
    User
        .findById(req.params.userid)
        .select('sale')
        .exec(
            function(err, user) {
                var thisItem;
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (user.sale) {
                    thisItem = user.sale.id(req.params.itemid);
                    if (!thisItem) {
                        sendJsonResponse(res, 404, {
                            "message": "itemid not found"
                        });
                    } else {
                        console.log(user);
                        console.log(req.body)

                        thisItem.name = req.body.name;
                        thisItem.category = req.body.category;
                        thisItem.description = req.body.description;
                        thisItem.price = req.body.price;
                        thisItem.status = req.body.status;

                        user.save(function(err, user) {
                            // var thisItem;
                            if (err) {
                                sendJsonResponse(res, 400, err);
                            } else {
                            	console.log(thisItem);
                                sendJsonResponse(res, 200, thisItem);
                            }
                        });

                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No item to update"
                    });
                }
            }
        );
};

module.exports.deleteItem = function(req, res) {
    if (!req.params.userid || !req.params.itemid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, userid and itemid are both required"
        });
        return;
    }
    Cor
        .findById(req.params.userid)
        .select('sale')
        .exec(
            function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (user.sale) {
                    if (!user.sale.id(req.params.itemid)) {
                        sendJsonResponse(res, 404, {
                            "message": "itemid not found"
                        });
                    } else {
                        user.sale.id(req.params.itemid).remove();
                        user.save(function(err) {
                            if (err) {
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No item to delete"
                    });
                }
            }
        );
};
