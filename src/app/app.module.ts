import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { FormComponent } from './usuarios/form/form.component';
import { FormsModule } from '@angular/forms';
import {UsuarioService} from "./usuarios/usuario.service";

const rutas: Routes = [
  {path: '', redirectTo: '/usuarios', pathMatch: 'full'},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form', component: FormComponent},
  {path: 'usuarios/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UsuariosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(rutas),
    RouterModule.forChild([
      {
        path: '',
        component: UsuariosComponent,
        data: {shouldDetach: true}
      },
    ]),
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
