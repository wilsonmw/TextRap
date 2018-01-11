var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

module.exports = {

    // Function to join a battle
    joinBattle: function(req, res){
        Battle.findOne({_id: req.body._id}, function(err, battle){
            if(err){
                console.log("There was a problem finding the battle to join.");
            } else {
                User.findOne({_id: req.session.userId}).populate("battles").exec(function(err, user){
                    if(err){
                        console.log("Couldn't find the current user.");
                    } else {
                        // Check to make sure these users aren't already in a battle with each other
                        for(let i=0; i<user.battles.length;i++){
                            if(user.battles[i].ownerName == battle.ownerName || user.battles[i].opponentName == battle.ownerName){
                            return res.json(battle);
                            }
                        }
                        battle._opponent = user._id;
                        battle.opponentName = user.username;
                        battle.openToJoin = false;
                        battle.accepted = true;
                        battle.whoseMic = battle.ownerName;
                        battle.save(function(err){
                            if(err){
                                console.log("There was a problem saving the joined battle.");
                            } else {
                                user.battles.push(battle);
                                user.save(function(err){
                                    if(err){
                                        console.log("There was a problem saving the user after adding the joined battle to their battles array.");
                                    } else {
                                        res.json(battle);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    // Function to accept a challenge
    acceptChallenge: function(req, res){
        Battle.findOne({_id: req.body._id}, function(err, battle){
            if(err){
                console.log("There was an error accepting the battle at the server level.");
            } else{
                battle.accepted = true;
                battle.save();
                res.json(battle);
            }
        })
    },

    // Function to decline a challenge
    declineChallenge: function(req, res){
        User.findOne({_id: req.body._owner}, function(err, user){
            if(err){
                console.log("Problem getting the user when declining the battle.");
            }else{
                user.declinedBattles.push(req.body.opponentName);
                user.save();
                Battle.remove({_id: req.body._id}, function(err){
                    if(err){
                        console.log("There was an error deleting the battle at the server level.");
                    } else{
                        res.json();
                    }
                })
            }
        })
    },

    // Function to clear the declined battle array of a particular user
    clearDeclined: function(req, res){
        User.findOne({_id: req.body._id}, function(err, user){
            if(err){
                console.log("Couldn't get the user to delete the declined battle array.");
            } else{
                user.declinedBattles = [];
                user.save();
                res.json(user);
            }
        })
    }
}