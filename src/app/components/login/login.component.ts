import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User;
  public identity: any;
  public token: string;

  constructor( private _userService: UserService, private _router: Router, private _route: ActivatedRoute ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    // Se ejecuta siempre y se cierra sesión con la ruta /logout/1
    this.logout();

    // Si está logueado no puede estar en login
    let login = this._userService.getToken();
    if (login != null) {
      this._router.navigate(['home']);
    }

  }

  onSubmit(form: any) {
    this._userService.login(this.user).subscribe( response => {
      if (response.status != 'error') {

        // Token
        this.token = response;

        // Info de usuario
        this._userService.login(this.user, true).subscribe( response => {
          this.identity = JSON.stringify(response);
          document.getElementById('registerSuccess').click();

          // Guardar info en LocalStorage
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', this.identity);

          // Redirigir al Home
          this._router.navigate(['home']);
        });

      } else {
        document.getElementById('registerError').click();
      }
    }, error => {
      document.getElementById('registerError').click();
      console.log( <any>error );
    });
  }

  // Función para Cerrar Sesión
  logout() {
    // Obtener parámetro
    this._route.params.subscribe(params => {

      let logout = +params['sure'];

      if (logout == 1) {

        // Borrar información de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Pasar a nulas las variables del menú
        this.identity = null;
        this.token = null;

        // Redireccionar a inicio
        this._router.navigate(['home']);
      }

    });
  }

}
