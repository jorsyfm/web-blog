import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// HTTP Client
import { HttpClientModule } from '@angular/common/http';

// Import for Form
import { FormsModule } from '@angular/forms';

// Import Font Awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Sweet Alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Import Angular Froala Editor Text.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    SweetAlert2Module.forRoot({
        buttonsStyling: false,
        customClass: 'modal-content',
        confirmButtonClass: 'button is-success',
        cancelButtonClass: 'button is-warning'
    }),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
