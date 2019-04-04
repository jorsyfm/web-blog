import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  providers: [UserService]
})
export class ProfileEditComponent implements OnInit {

  private user: User;
  public identity: any;
  public token: string;

  constructor(private _userService: UserService) {
    this.user = new User(1,'','','USER','','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    // Asignar valores del usuario en Form
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      'USER',
      this.identity.email,
      '',
      this.identity.description,
      ''
    );

  }

  ngOnInit() {
  }

  onSubmit(form) {  
    this._userService.update(this.token, this.user).subscribe( response => {

      if(response && response.status == 'success') {

        document.getElementById('editSuccess').click();

        // Cambiar valores del LocalStorage para actualizar sesión
        this.identity.name = response.changes.name;
        this.identity.surname = response.changes.surname;
        this.identity.email = response.changes.email;

        localStorage.setItem('identity', JSON.stringify(this.identity));

      } else {

        document.getElementById('editError').click();

      }

    }, error => {
      document.getElementById('editError').click();
    });
  }

}
