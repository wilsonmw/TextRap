var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BarSchema = new mongoose.Schema({
    line1: {type: String, required: true, minlength:15, maxlength: 200},
    line2: {type: String, required: true, minlength:15, maxlength: 200},
    _owner: {type: Schema.Types.ObjectId, ref: 'User'},
    ownerName: {type: String},
    _battle: {type: Schema.Types.ObjectId, ref: 'Battle'},
    critiques: [{type: Schema.Types.ObjectId, ref: 'Critique'}],
    scores: [{type: Number}],
    totalScore: {type: Number}
}, {timestamps: true});
mongoose.model('Bar', BarSchema);
var Bar = mongoose.model('Bar', BarSchema);
