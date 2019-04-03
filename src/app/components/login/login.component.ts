import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public token: any;
  public identity: any;
  public name: string = '';

  constructor( private _userService: UserService, private _router: Router, private _route: ActivatedRoute ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    // Se ejecuta siempre y cierra sesión solo cuando le llega el parámetro sure por la URL
    this.logout();
  }

  onSubmit(form: any) {
    // Obtener Token
    this._userService.login(this.user).subscribe( response => {
      if(response.status != 'error') {
        this.token = response;

        // Obtener información del usuario
        this._userService.login(this.user, true).subscribe( response => {
          this.identity = response;

          // Guardar datos en Local Storage
          localStorage.setItem('token', this.token);
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Mostrar modal
          this.name = this.identity.name;
          document.getElementById('loginSuccess').click();

          // Redirect Home
          this._router.navigate(['inicio']);

        });

      } else {
        document.getElementById('loginError').click();
      }
    }, error => {
      console.log( <any>error );
      document.getElementById('loginError').click();
    });
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if(logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redirect Home
        this._router.navigate(['inicio']);
      }
    });
  }

}
