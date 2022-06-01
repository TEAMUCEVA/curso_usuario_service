import { Component, OnInit } from '@angular/core';
import {Usuario} from "../usuario";
import swal from "sweetalert2";
import {UsuarioService} from "../usuario.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public usuario= new Usuario();

  public titulo: string = "Crear usuario"

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("iniciando form")
    this.cargarUsuario()
  }

  cargarUsuario(): void{
    console.log("vamos a cargar al usuario")
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  create(): void {
    this.usuarioService.crearUsuario(this.usuario)
      .subscribe(usuario => {
          this.router.navigate(['/usuarios'])
          swal.fire({
            title: 'Nuevo usuario',
            text: `Usuario ${usuario.nombre} creado con éxito!`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
      );
  }

  update():void{
    this.usuarioService.modificarUsuario(this.usuario)
      .subscribe( usuario => {
          this.router.navigate(['/usuarios'])
          swal.fire({
            title: 'Cliente Actualizado',
            text: `Cliente ${usuario.nombre} actualizado con éxito!`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }

      )
  }

}
