var mongoose = require('mongoose');
var User = mongoose.model('User');
var Battle = mongoose.model('Battle');
var Bar = mongoose.model('Bar');
var Critique = mongoose.model('Critique');

// var bcrypt = require('bcrypt-as-promised');

errors ={
    usernameInUse: false,
    emailInUse: false,
    loginError: false
}

module.exports = {

    register: function(req, res){
        // check to see if username is already in use
        console.log("It made it to the function to put the user in the database - users.js")
        User.find({username: req.body.username}, function(err, user){
            if(err){
                console.log("There was an error checking to see if the username is already in use.");
            } else {
                console.log("got into the find username part of the server deal");
                if(user.length > 0){
                    this.errors['usernameInUse'] = true;
                    this.errors['emailInUse'] = false;
                    this.errors['loginError'] = false;
                    res.json(this.errors);
                }else{
                    console.log("Got into the server part where it's finding if the email is in use");
                    User.find({email: req.body.email}, function(err, user){
                        // check to see if email is already in use
                        if(err){
                            console.log("There was an error checking to see if the email address is already in use.");
                        }else{
                            console.log("Here is the part where it has either found the email or not");
                            if(user.length > 0){
                                this.errors['emailInUse'] = true;
                                this.errors['usernameInUse'] = false;
                                this.errors['loginError'] = false;
                                res.json(this.errors);
                            }else{
                                console.log("Here we are where the email is not in use and we'll hash the password soon");
                                this.errors['emailInUse'] = false;
                                this.errors['usernameInUse'] = false;
                                this.errors['loginError'] = false;
                                var userInstance = new User(req.body);
                                console.log("Here we've created a new instance of USER, next line is password hash");
                                // bcrypt.hash(req.body.password, 10)
                                // .then(hashed_password =>{
                                //     console.log("Got into the hashing function");
                                //     userInstance.password = hashed_password;
                                    userInstance.save(function(err, data){
                                        console.log("Got past the hashing, the previous line was saving the user instance");
                                        if(err){
                                            console.log("The user was not created at the server.js level.");
                                        } else {
                                            req.session.userId = data._id;
                                            res.json(data);
                                        }
                                    })   
                                
                                .catch(error=>{});

                            }
                        }
                    })
                }
            }
        })
    },

    login: function(req, res){
        User.find({username: req.body.username}, function(err, user){
            if(err){
                console.log("There was an error getting the user at the server.js level.");
            }else{
                if(user.length < 1){
                    this.errors['loginError']=true;
                    this.errors['usernameInUse']=false;
                    this.errors['emailInUse']=false;
                    res.json(this.errors);
                }else{ 
                    // bcrypt.compare(req.body.password, user[0].password)
                    // .then(function(){
                    //     req.body.password, user[0].password;
                    //     this.errors['loginError']=false;
                    //     this.errors['usernameInUse']=false;
                    //     this.errors['emailInUse']=false;
                    //     req.session.userId = user[0]._id;
                    //     res.json(user)})
                    // .catch(function(){
                    //     this.errors['loginError']=true;
                    //     this.errors['usernameInUse']=false;
                    //     this.errors['emailInUse']=false;
                    //     res.json(this.errors);
                    // })
                    if(req.body.password != user[0].password){
                        this.errors['loginError']=true;
                        this.errors['usernameInUser']=false;
                        this.errors['emailInUse']=false;
                        res.json(this.errors);
                    } else {
                        this.errors['loginError']=false;
                        this.errors['usernameInUser']=false;
                        this.errors['emailInUse']=false;
                        req.session.userId = user[0]._id;
                        res.json(user);
                    }
                }
            }
        })
    },

    getUsername: function(req, res){
        User.findOne({_id: req.session.userId}).populate('barsCritiqued').exec(function(err, user){
            if(err){
                console.log("Couldn't get the user in the username function at the server level.")
            }else{
                res.json(user);
            }
        })
    },

    logout: function(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}