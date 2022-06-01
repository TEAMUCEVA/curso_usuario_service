import { Component, OnInit } from '@angular/core';
import {Usuario} from "./usuario";
import {UsuarioService} from "./usuario.service";
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
        usuarios => this.usuarios = usuarios
    )
  }

  borrarUsuario(usuario: Usuario): void {
    swal.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente ${usuario.nombre} ${usuario.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario)
            swal.fire(
              'Eliminado!',
              `Se ha eliminado el usuario ${usuario.nombre} ${usuario.apellido}`,
              'success'
            )
          }
        )
      }
    })
  }

}
