var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

var path = require('path');

var users = require('../controllers/users');
var getBattles = require('../controllers/battles/getBattles');
var createBattles = require('../controllers/battles/createBattles');
var bars = require('../controllers/bars');
var joinDeclineBattles = require('../controllers/battles/joinDeclineBattles');
var critiques = require('../controllers/critiques');


module.exports = function(app){
   
// USER ROUTES

    // Route for registering a new user
    app.post('/user', function(req, res){
        console.log("Got to the route for creating a user");
        users.register(req, res);
    })

    // Route for logging in
    app.post('/login', function(req, res){
        users.login(req, res);
    })

    // Route to get just the username for display purposes
    app.get('/username', function(req, res){
        users.getUsername(req, res);
    })

    // Route to log out
    app.get('/logout', function(req, res){
        users.logout(req, res);
    })


// CREATING BATTLE ROUTES

    // Route for creating a new battle
    app.post('/battle', function(req, res){
        createBattles.createNewBattle(req, res);
    });

    // Create a battle with no opponent, so anyone can take the challenge
    app.post('/battleWithNoOpponent', function(req, res){
        createBattles.createNewNoOpponent(req, res);
    })

// GETTING AND CREATING BARS ROUTES

    // Route to get a single set of bars
    app.get('/getBars/:id', function(req, res){
        bars.getSingleSetBars(req, res);
    })

    // Route to add a new set of bars
    app.post('/newBar', function(req, res){
        bars.newBars(req, res);
    })


// GETTING BATTLE ROUTES

    // Route to get a single battle
    app.get('/getBattle/:id', function(req, res){
        getBattles.getSingleBattle(req, res);
    })

    // Route to get all the battles to display on the dashboard
    app.get('/allBattles', function(req, res){
        getBattles.getAllBattles(req, res);
    })

    // Route to get the current users battles to display
    app.get('/userBattles', function(req, res){
        getBattles.getUsersBattles(req, res);
    })

    // Route to get open battles that can be joined
    app.get('/openBattles', function(req, res){
        getBattles.getOpenBattles(req, res);
    })

    // Route to get one battle that is open to be joined
    app.get('/getOneOpenBattle/:id', function(req, res){
        getBattles.getOneOpenBattle(req, res);
    })

    // Route to get all the challenges for the current user that haven't been accepted yet
    app.get('/challenges', function(req, res){
        getBattles.getChallenges(req, res);
    })


// JOINING AND DECLINING BATTLE ROUTES

    // Route to join a battle
    app.post('/joinBattle', function(req, res){
        joinDeclineBattles.joinBattle(req, res);
    })

    // Route to accept a challenge initiated by someone else
    app.post('/acceptChallenge', function(req, res){
        joinDeclineBattles.acceptChallenge(req, res);
    })

    // Route to decline a challenge someone else initiated
    app.post('/declineChallenge', function(req, res){
        joinDeclineBattles.declineChallenge(req, res);
    })

    // Route to clear the declined battle array after displaying what battles were declined
    app.post('/clearDeclined', function(req, res){
        joinDeclineBattles.clearDeclined(req, res);
    })


// CRITIQUE ROUTES

    // Route to post a new critique of a set of bars
    app.post('/newCritique', function(req, res){
        critiques.newCritique(req, res);
    })

    

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("../../public/dist/index.html"))
    });
}