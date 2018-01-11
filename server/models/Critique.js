var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CritiqueSchema = new mongoose.Schema({
    _bar: {type: Schema.Types.ObjectId, ref: 'Bar'},
    rhymeComplexity: {type: String},
    cleverness: {type: String},
    humor: {type: String},
    originality: {type: String},
    wordplay: {type: String},
    makeSense: {type: String},
    insult: {type: String},
    flow: {type: String},
    totalScore: {type: Number},
    _owner: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});
mongoose.model('Critique', CritiqueSchema);
var Critique = mongoose.model('Critique', CritiqueSchema);
