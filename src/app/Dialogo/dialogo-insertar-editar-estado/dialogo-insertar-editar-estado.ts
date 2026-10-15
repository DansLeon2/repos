import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import{ EstadoService } from '../../servicios/estado-service';
import { Estado } from '../../interfaces/estado';


@Component({
  selector: 'app-dialogo-insertar-editar-estado',
  standalone: false,
  templateUrl: './dialogo-insertar-editar-estado.html',
  styleUrl: './dialogo-insertar-editar-estado.css',
})


export class DialogoInsertarEditarEstado implements OnInit{

  formEstado:FormGroup;
  tituloFormulario:string = "Editar"
  tituloBoton:string = "Actualizar"


  constructor(private dialogoReferencia:MatDialogRef<DialogoInsertarEditarEstado>,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private estadoServicio:EstadoService,
    @Inject(MAT_DIALOG_DATA) public dataEditarEstado: Estado
  ){

    this.formEstado= this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      activo:[1,Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.dataEditarEstado) {
      this.formEstado.patchValue({
        id:this.dataEditarEstado.id||0,
        nombre:this.dataEditarEstado.nombre,
        descripcion:this.dataEditarEstado.descripcion,
        activo:this.dataEditarEstado.activo
      })
      this.tituloFormulario = "Editar";
      this.tituloBoton = "Actualizar";
    }
  }

  agregarInsertarEstado(){

    console.log(this.formEstado);
    console.log(this.formEstado.value);

    const modelo:Estado = {
      id:this.formEstado.value.id||0,
      nombre:this.formEstado.value.nombre,
      descripcion:this.formEstado.value.descripcion,
      activo:this.formEstado.value.activo
    }
    this.estadoServicio.insertarEstado(modelo).subscribe({
      next:(respuesta)=>{

        this.alerta("Estado agregado","Listo");
        this.dialogoReferencia.close("agregado");
      },error:(e)=>{
        this.alerta("Error al agregar estado","Error");
      }
    })
  }
  

  alerta(msg:string, accion:string){
    this.snackBar.open(msg,accion,{

      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000

    });
  }

}
