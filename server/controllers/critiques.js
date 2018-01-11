var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

module.exports = {

    // Function to post a new critique - also adds up scores of the battle if battle has ended
    newCritique: function(req, res){
        var newCritique = new Critique(req.body);
        newCritique.save(function(err){
            if(err){
                console.log("There was an error saving the critique at the server level.");
            } else {
                // Put the critique into the users critique array
                User.findOne({_id: newCritique._owner}, function(err, user){
                    if(err){
                        console.log("There was an error trying to get the user within the critique server function.");
                    } else {
                        user.critiques.push(newCritique);
                        // Put the critique in the particular bars critique array
                        Bar.findOne({_id: newCritique._bar}, function(err, bars){
                            if(err){
                                console.log("There was an error getting the bars within the critique server function.");
                            } else{
                                bars.critiques.push(newCritique);
                                bars.save();
                                user.barsCritiqued.push(bars);
                                user.save();
                                // Check to see if the battle is finished, and if so calculate the score of all critiques
                                Battle.findOne({_id: bars._battle}).populate('bars').exec(function(err, battle){
                                    if(err){
                                        console.log("Error getting the battle after the critique was posted.");
                                    } else {
                                        if(battle.ongoing == false){
                                            var left_to_go = battle.bars.length;
                                            var ownerScore = 0;
                                            var opponentScore = 0;
                                            // Loop through all the bars and add up the critique scores
                                            for(var i=0; i<battle.bars.length; i++){
                                                Bar.findOne({_id: battle.bars[i]._id}).populate("critiques").exec(function(err, bar){
                                                    if(err){
                                                        console.log("Couldn't get the individual bars after getting the battle.");
                                                    }else{
                                                        left_to_go -= 1;
                                                        if(bar.critiques.length > 0){
                                                            for(var j = 0; j<bar.critiques.length; j++){
                                                                if(bar._owner.equals(battle._owner)){
                                                                    ownerScore += bar.critiques[j].totalScore;
                                                                }
                                                                if(bar._owner.equals(battle._opponent)){
                                                                    opponentScore += bar.critiques[j].totalScore;
                                                                }
                                                            }
                                                        }
                                                    if(left_to_go <= 0){
                                                        if(ownerScore > opponentScore){
                                                            battle.winner = battle._owner;
                                                        }
                                                        else if(opponentScore > ownerScore){
                                                            battle.winner = battle._opponent;
                                                        }
                                                        else if(ownerScore == opponentScore){
                                                            battle.winner = "Tie";
                                                        }
                                                        if(battle.winner != "Tie"){
                                                            // If the battle is not a tie, get the username of the winner and put it in the battle object
                                                            User.findOne({_id: battle.winner}, function (err, user){
                                                                if(err){
                                                                    console.log("Error getting the winner of the battle object.");
                                                                } else {
                                                                    battle.winner = user.username;
                                                                    console.log(battle.winner);
                                                                    battle.save();
                                                                    res.json();
                                                                }
                                                            })
                                                        } else{
                                                            battle.save();
                                                            res.json();
                                                        }
                                                    }
                                                    }
                                                })
                                            }
                                        }else {
                                            res.json();
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
}