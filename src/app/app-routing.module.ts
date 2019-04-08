import { ErrorComponent } from './components/error/error.component';
// Importar componentes
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// Imports para rutas
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Definir rutas
const routes: Routes = [
  { path: 'home', component: HomeComponent} ,
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: ErrorComponent }
];

// Exportar configuración
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
