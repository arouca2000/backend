const mongoose = require('mongoose');

const Box = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }]
}, {
        timestamps: true
    });

module.exports = mongoose.model('Box', Box);
