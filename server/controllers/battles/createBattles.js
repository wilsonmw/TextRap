var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

opponentErrors = {
    alreadyInBattle: false,
    opponentNotExist: false
}

module.exports = {


    // Function for creating a battle with a specified opponent
    createNewBattle: function(req, res){       
        User.findOne({username: req.body.opponent}, function(err, foundO){
            if(err){
                console.log("Error finding the opponent in the server level");
            } else {
                // Check to see if the opponent is actually a user of the site
                if(foundO == null){
                    this.opponentErrors.opponentNotExist = true;
                    this.opponentErrors.alreadyInBattle = false;
                    res.json(this.opponentErrors);
                } else {
                    // Check to see if the two participants are already in a battle
                    Battle.find({$or: [{ownerName: req.body.owner, opponentName: req.body.opponent}, {ownerName: req.body.opponent, opponentName: req.body.owner}]}, function(err, already){
                        if(err){
                            console.log("There was an error checking to see if a battle already exists");
                        } else {
                            if(already.length > 0){
                                this.opponentErrors.alreadyInBattle = true;
                                this.opponentErrors.opponentNotExist = false;
                                res.json(this.opponentErrors);
                            } else {
                                // If the opponent exists and they don't already have a battle going, create the battle
                                var newBattle = new Battle(req.body);
                                // Total sets of bars of the battle must be even and greater than or equal to 6, wait time must be at least 2 hours
                                if(newBattle.totalBars % 2 != 0){
                                    newBattle.totalBars = newBattle.totalBars -1;
                                }
                                if(newBattle.totalBars <= 4){
                                    newBattle.totalBars = 6;
                                }
                                if(newBattle.maxWait <= 1){
                                    newBattle.maxWait = 2;
                                }
                                newBattle.lastBarDate = Date.now();
                                newBattle.timeSince = "No bars posted yet";
                                newBattle.ownerName = req.body.owner;
                                newBattle.opponentName = req.body.opponent;
                                newBattle.whoseMic = req.body.owner;
                                newBattle.openToJoin = false;
                                newBattle.accepted = false;
                                // Find the creater of the battle and make them the owner
                                User.findOne({username: req.body.owner}, function(err, owner){
                                    if(err){
                                        console.log("Error finding the owner")
                                    }else{
                                        newBattle._owner = owner._id;
                                        // Find the opponent and make them the battle opponent
                                        User.findOne({username: req.body.opponent}, function(err, opponent){
                                            if(err){
                                                console.log("Error finding the opponent");
                                            } else{
                                                newBattle._opponent = opponent._id;
                                                if(!newBattle._owner || !newBattle.ownerName || !newBattle._opponent || !newBattle.opponentName){
                                                    res.redirect('/');
                                                } else{
                                                    newBattle.save()
                                                    opponent.battles.push(newBattle);
                                                    opponent.save();
                                                    // Find the owner again in order to push the new battle into their battle array
                                                    User.findOne({username: req.body.owner}, function(err, owner){
                                                        if(err){
                                                            console.log("Error finding the owner a 2nd time");
                                                        }else{
                                                            owner.battles.push(newBattle);
                                                            owner.save();
                                                            res.json(newBattle); 
                                                        }
                                                    });
                                                }
                                            }
                                        })
                                    }
                                })  
                            }
                        }
                    })
                }
            }
        })
    },

    // Function for creating a new battle with no specified opponent
    createNewNoOpponent: function(req, res){
        var newBattle = new Battle(req.body);
        if(newBattle.totalBars % 2 != 0){
            newBattle.totalBars = newBattle.totalBars -1;
        }
        if(newBattle.totalBars <= 4){
            newBattle.totalBars = 6;
        }
        if(newBattle.maxWait <= 1){
            newBattle.maxWait = 2;
        }
        newBattle.lastBarDate = Date.now();
        newBattle.timeSince = "No bars posted yet";
        newBattle.ownerName = req.body.owner;
        newBattle.whoseMic = req.body.owner;
        newBattle._owner = req.session.userId;
        newBattle.accepted = false;
        newBattle.save(function(err){
            if(err){
                console.log("there was an error saving the battle with no opponent");
            } else{
                res.json(newBattle);
            }
        });
    },


}