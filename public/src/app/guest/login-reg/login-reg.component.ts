import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
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
    ranking: 0,
    pointsToLevelUp: 0
  };

  regUser = {
    username: "",
    email: "",
    password: "",
    pwConfirm: "",
  };

  loginUser = {
    username: "",
    password: ""
  }

  constructor(private _userService: UserService, private _route: ActivatedRoute) {
    this._userService.errorObserver.subscribe(errors => {
      this.errors = errors;
    })
   }

  regSubmit(){
    this.user.username = this.regUser.username;
    this.user.email = this.regUser.email;
    this.user.password = this.regUser.password;
    this._userService.createUser(this.user);
    this.user = {
      username: "",
      email: "",
      password: "",
      battles: [],
      collabs: [],
      bars: [],
      barsCritiqued: [],
      critiques: [],
      ranking: 0,
      pointsToLevelUp: 0
    };
  }

  loginSubmit(){
    this._userService.login(this.loginUser);
  }
  
  ngOnInit() {
  }

}
