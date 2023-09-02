const mongoose = require('mongoose');

const todoList = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = new mongoose.model("Todo",todoList);
