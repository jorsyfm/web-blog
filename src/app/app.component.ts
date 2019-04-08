import { UserService } from './services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'web-blog';
  public token: any;
  public identity: any;

  constructor( public _userService: UserService ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // console.log('Esta es la identidad', this.identity);
  }

  ngOnInit() { }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
