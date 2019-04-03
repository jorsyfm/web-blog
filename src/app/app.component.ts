import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'web-blog';
  public identity: any;
  public token: any;

  constructor(public _userService: UserService) {
    // this.identity = this._userService.getIdentity();
    // this.token = this._userService.getToken();
    this.loadUser();
  }

  ngOnInit() {

  }

  ngDoCheck() {
    // this.identity = this._userService.getIdentity();
    // this.token = this._userService.getToken();
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
