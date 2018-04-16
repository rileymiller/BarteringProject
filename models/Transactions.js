var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

const transactionSchema = new mongoose.Schema({
	buyer: User,
	seller: User,
	Item: Item
});