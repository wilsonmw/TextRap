var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

module.exports = {
    getSingleSetBars: function(req, res){
        Bar.findOne({_id: req.params.id}, function(err, bars){
            if(err){
                console.log("Couldn't get the single bars at the server level.");
            } else {
                res.json(bars);
            }
        })
    },

    newBars: function(req, res){
        Battle.findOne({_id: req.body._battle}, function(err, battle){
            var newBar = new Bar(req.body);
            newBar.save(function(err){
                battle.bars.push(newBar);
                // Update the time of the most recent bars, and switch whose turn it is - also end the battle if total bars have been reached
                battle.lastBarDate = newBar.createdAt;
                if(battle.whoseMic == battle.ownerName){
                    battle.whoseMic = battle.opponentName;
                } else {
                    battle.whoseMic = battle.ownerName;
                }
                if(battle.bars.length == battle.totalBars){
                    battle.ongoing = false;
                    battle.whoseMic = "Completed";
                }
                battle.save(function(err){
                    if(err){
                        console.log("error saving the new bar into the battle's bar array.");
                    } else {
                        res.json(battle);
                    }
                })
            })
        })
    }
}