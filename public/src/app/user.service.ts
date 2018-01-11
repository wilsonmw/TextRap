import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  loggedIn;
  curUsername = "";

  errors = {
    loginError: false,
    usernameInUse: false,
    emailInUse: false
  }
  user = {
    username: "",
    email: "",
    password: "",
    battles: [],
    collabs: [],
    bars: [],
    barsCritiqued: [],
    critiques: [],
    declinedBattles: [],
    ranking: 0,
    pointsToLevelUp: 0,
  };
  
  errorObserver = new BehaviorSubject(this.errors);
  loggedInObserver = new BehaviorSubject(this.loggedIn);
  usernameObserver = new BehaviorSubject(this.curUsername);
  userObserver = new BehaviorSubject(this.user);
  

  constructor(private _http: Http, private _route: ActivatedRoute, private _router: Router) { }

  createUser(user){
    console.log("Got into the service function to create a user.");
    this._http.post('/user', user).subscribe(
      (response)=>{
        console.log("Got a response in the service.ts level");
        if(response.json().usernameInUse || response.json().emailInUse){
          this.errors = response.json();
          this.errorObserver.next(this.errors);
          return;
        } else {
          this.curUsername = user.username;
          this.user = user;
          this._router.navigate(['/home/dashboard']);
        }
      },
      (err)=>{
        console.log("User not created successfully at service.ts level.");
      }
    )
  }

  login(user){
    this._http.post('/login', user).subscribe(
      (response)=>{
        if(response.json().loginError){
          this.errors = response.json();
          this.errorObserver.next(this.errors);
          this.loggedIn = false;
          this.loggedInObserver.next(this.loggedIn);
          return;
        } else{
          this.errors = {
            loginError: false,
            usernameInUse: false,
            emailInUse: false
          }
          this.errorObserver.next(this.errors);
          this.loggedIn = true;
          this.loggedInObserver.next(this.loggedIn);
          this.curUsername = user.username;
          this.user = user;
          this._router.navigate(['/home/dashboard']);
        }
      },
      (err)=>{
        console.log("There was an error getting the user at the service.ts level.");
      }
    )
  }

  getUsername(){
    this._http.get('/username').subscribe(
      (response)=>{
        if(response.json()==null){
          this._router.navigate(['/loginReg']);
        }
        this.user = response.json();
        this.userObserver.next(this.user);
        this.curUsername = response.json().username;
        this.usernameObserver.next(this.curUsername);
        return this.curUsername;
      },(err)=>{
        console.log("couldn't get the username at the service level");
      }
    )
  }

  clearDeclined(user){
    this._http.post('/clearDeclined', user).subscribe(
      (response)=>{
        this._router.navigate(['/home/dashboard']);
      },(err)=>{
        console.log("There was an error at the service level deleting the declined battle array.");
      }
    )
  }
}

  