import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, throwError} from "rxjs";
import {USUARIOS} from "./usuarios.json";
import {Usuario} from "./usuario";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/usuario_service/usuarios';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    //return of(USUARIOS);
    return this.httpClient.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  getUsuario(id: any): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.urlEndPoint}/${id}`)
  }

  crearUsuario(usuario: Usuario): Observable<Usuario>{
    console.log("debug");
    return this.httpClient.post<Usuario>(this.urlEndPoint, usuario,{headers: this.httpHeaders}).pipe(
      map(response => response as Usuario)
    );
  }

  modificarUsuario(usuario: Usuario): Observable<any>{
    return this.httpClient.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario,{headers: this.httpHeaders}).pipe(
      catchError(e => {
           if(e.status == 400){
              throwError(e);
           }
           console.log(e.error.message());
            return throwError(e);
      }
      )
    );
  }

  borrarUsuario(id: number): Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
          console.log(e.error.message());
          return throwError(e);
        }
      )
    );
  }

}
