var express = require('express');
var router = express.Router();
var itemCtrl = require('../controllers/itemCtrl');
var userItemCtrl = require('../controllers/userCtrl');
var userCtrl = require('../../controllers/api.js'); // This is the path to the passport user api
var allItems = require('../../controllers/home.js');

// user-item routes
router.get('/user/:userid', userItemCtrl.getUserById); 
router.get('/user/:userid/bought', userItemCtrl.getBoughtItems);
router.get('/user/:userid/sale', userItemCtrl.getSaleItems);

// user routes


// item routes
router.post('/:userid/item', itemCtrl.createItem);
router.put('/item/:userid/:itemid', itemCtrl.updateItem);
router.delete('/item/:userid/:itemid', itemCtrl.deleteItem);
router.get('/item/:userid/:itemid', itemCtrl.getItemById);
router.get('/recentItems', allItems.recentItems);

module.exports = router;