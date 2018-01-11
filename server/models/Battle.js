var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BattleSchema = new mongoose.Schema({
    _owner: {type: Schema.Types.ObjectId, ref: "User"},
    _opponent: {type: Schema.Types.ObjectId, ref: "User"},
    ownerName: {type: String},
    opponentName: {type: String},
    accepted: {type: Boolean},
    bars: [{type: Schema.Types.ObjectId, ref: "Bar"}],
    lastBarDate: {type:Date},
    timeSince: {type:String},
    whoseMic: {type: String},
    openToJoin: {type: Boolean},
    ongoing: {type: Boolean},
    maxWait: {type: Number},
    totalBars: {type: Number, required: true},
    winner: {type: String},
}, {timestamps: true});
mongoose.model('Battle', BattleSchema);
var Battle = mongoose.model('Battle', BattleSchema);
