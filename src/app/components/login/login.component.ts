import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor( private _userService: UserService ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form: any) {
    this._userService.login(this.user).subscribe( response => {
      console.log(response);
    }, error => {
      console.log( <any>error );
    });
  }

}
