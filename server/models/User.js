var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minlength: 3},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 8},
    ranking: {type: Number},
    pointsToLevelUp: {type: Number},
    battles: [{type: Schema.Types.ObjectId, ref: "Battle"}],
    bars: [{type: Schema.Types.ObjectId, ref: "Bar"}],
    barsCritiqued: [{type: Schema.Types.ObjectId, ref: "Bar"}],
    critiques: [{type: Schema.Types.ObjectId, ref: "Critique"}],
    declinedBattles: [{type: String}]
}, {timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User', UserSchema);
