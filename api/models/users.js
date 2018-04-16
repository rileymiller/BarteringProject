/*var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dueDate: { type: String, required: true },
    points: {type: Number, "default": 0, min: 0, max: 100},
    status: String
});

var courseSchema = new mongoose.Schema({
    cid: { type: String, required: true },
    name: { type: String, required: true },
    credits: Number,
    time: String,
    assignments: [assignmentSchema]
})



mongoose.model('users', courseSchema); //model for users*/