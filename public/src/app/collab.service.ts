import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class CollabService {

  numParticipants;

  numParticipantsObserver = new BehaviorSubject(this.numParticipants);

  constructor(private _http: Http, private _route: ActivatedRoute, private _router: Router) { }


  getParticipants(num){
    this.numParticipants = num;
    this.numParticipantsObserver.next(this.numParticipants);
  }

}
