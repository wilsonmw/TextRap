var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

var moment = require('moment');
// moment().format();

module.exports = {

    // Function to get a single battle, which also includes the owner and opponent of the battle
    getSingleBattle: function(req, res){
        // An array to hold the battle, the owner, and the opponent
        var battleInfo = [];
        Battle.findOne({_id: req.params.id}).populate('bars').exec(function(err, battle){
            if(err){
                console.log("There was an error getting the battle at the server.js level.");
            } else {
                battleInfo.push(battle);
                User.findOne({_id: battle._owner}, function(err, owner){
                    if(err){
                        console.log("error getting the owner of the battle at server.js");
                    }else{
                        battleInfo.push(owner);
                        User.findOne({_id: battle._opponent}, function(err, opponent){
                            if(err){
                                console.log("error getting the opponent at server.js");
                            } else{
                                battleInfo.push(opponent);
                                // Check to see if the participant whose turn it is has waited too long; if so, their turn is forfeit
                                battle.timeSince = moment(battle.lastBarDate).fromNow(true);
                                var lastBar = moment(battle.lastBarDate);
                                var curTime = moment(Date.now());
                                var hoursSinceLastBars = curTime.diff(lastBar, 'hours');
                                if(battle.maxWait < hoursSinceLastBars && battle.ongoing == true && battle.accepted == true){
                                    var forfeitBar = new Bar();
                                        forfeitBar.line1 = "!! TURN FORFEIT !!";
                                        forfeitBar.line2 = battle.whoseMic + " waited too long!";
                                        forfeitBar.ownerName = battle.whoseMic;
                                        forfeitBar.totalScore = 0;
                                        if(battle.whoseMic == battle.ownerName){
                                            console.log(battle.whoseMic, battle.ownerName, "here is the whoseMic and the ownerName inside the if when assigning the owner of the forfeit bar");
                                            forfeitBar._owner = owner;
                                        } else if(battle.whoseMic == battle.opponentName){
                                            console.log(battle.whoseMic, battle.ownerName, "here is the whoseMic and the ownerName inside the else if when assigning the owner of the forfeit bar");
                                            forfeitBar._owner = opponent;
                                        }
                                        forfeitBar._battle = battle._id;
                                    
                                        forfeitBar.save(function(err){
                                            if(err){
                                            }
                                            battle.bars.push(forfeitBar);
                                            if(battle.whoseMic == battle.ownerName){
                                                console.log(battle.whoseMic, battle.ownerName, "here is the whoseMic and the ownerName inside the if before the switch");
                                                battle.whoseMic = battle.opponentName;
                                                console.log(battle.whoseMic, battle.ownerName, "here is the whoseMic and the ownerName inside the if after the switch");
                                            } else {
                                                console.log(battle.whoseMic, battle.ownerName, "here is the whoseMic and the ownerName inside the else before the switch");
                                                battle.whoseMic = battle.ownerName;
                                                console.log(battle.whoseMic, battle.ownerName, "here is the whoseMic and the ownerName inside the else after the switch");
                                            }
                                            battle.lastBarDate = curTime;
                                            battle.save(function(err){
                                                battleInfo[0] = battle;
                                                res.json(battleInfo);
                                            });
                                    });
                                    
                                } else{
                                    res.json(battleInfo);
                                }
                            }
                        })
                    }
                })
            }
        })
    },

    // Function to get all battles
    getAllBattles: function(req, res){
        var id=req.session.userId;
        Battle.find({_owner: {$ne: id}, _opponent: {$ne: id}, openToJoin: {$ne: true}, accepted: true}, function(err, battles){
            if(err){
                console.log("error getting all the battles at the server level")
            }else{
                res.json(battles);
            }
            
        }).sort('-createdAt')
    },

    // Function to get the battles the current user is in
    getUsersBattles: function(req, res){
        var id=req.session.userId;
        Battle.find({$or: [{_owner: id}, {_opponent: id}], openToJoin: {$ne: true}, accepted: true}, function(err, battles){
            if(err){
                console.log("error getting the user battles at the server level")
            }else{
                res.json(battles);
            }
            
        }).sort('-createdAt')
    },

    // Function to get all the open battles that can be joined
    getOpenBattles: function(req, res){
        var id=req.session.userId;
        Battle.find({openToJoin: true, _owner: {$ne: id}}, function(err, battles){
            if(err){
                console.log("error getting the open battles at the server level")
            }else{
                res.json(battles);
            }
            
        }).sort('-createdAt')
    },

    // Function to get one specific open battle that can be joined
    getOneOpenBattle: function(req, res){
        Battle.findOne({_id: req.params.id}).populate('bars').exec(function(err, battle){
            if(err){
                console.log("There was an error getting the one open battle at the server.js level.");
            } else {
                res.json(battle);
            }
        })
    },

    // Function to get all the challenges for the current user that have not been accepted or declined yet
    getChallenges: function(req, res){
        Battle.find({_opponent: req.session.userId, accepted: false}, function(err, battles){
            if(err){
                console.log("error getting the challenges at the server level")
            } else {
                res.json(battles);
            }
        })
    }
}