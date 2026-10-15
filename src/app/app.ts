import { AfterViewInit,Component, signal,ViewChild, OnInit,Inject } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';


import { Estado } from './interfaces/estado'; 
import { EstadoService } from './servicios/estado-service'; 
import { DialogoInsertarEditarEstado } from './Dialogo/dialogo-insertar-editar-estado/dialogo-insertar-editar-estado';
{DialogoInsertarEditarEstado}


@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnInit{

  

  protected readonly title = signal('FrontEstado');

  constructor(private estadoService:EstadoService, public dialog: MatDialog){}

  //readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogoInsertarEditarEstado);
  }

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];
  dataSourceEstado = new MatTableDataSource<Estado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceEstado.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.ListarEstados();
  }

  dialogoInsertarEditarEstado(){
    this.dialog.open(DialogoInsertarEditarEstado).disableClose(true),
    width: '350px'
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="creado"){
        this.ListarEstados();
      }
  });
}


  ListarEstados(){
    this.estadoService.listarEstados().subscribe({next:(listaEstados:Estado[])=>{
      
      this.dataSourceEstado.data = listaEstados;  
    },error:(error)=>console.error(error)});
  }
}