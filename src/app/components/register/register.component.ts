import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;
  public status: string;

  constructor(private _userService: UserService) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe( response => {
      if (response.status == 'success') {
        this.status = response.status;
        document.getElementById('registerSuccess').click();
        form.reset();
      } else {
        this.status = 'error';
        document.getElementById('registerError').click();
      }
    }, error => {
      console.log(<any>error);
    });
  }

}
