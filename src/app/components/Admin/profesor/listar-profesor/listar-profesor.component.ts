import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/utils/interfaces/Interface';
import { ProfesorService } from '../profesor.service';

@Component({
  selector: 'app-listar-profesor',
  templateUrl: './listar-profesor.component.html',
  styleUrls: ['./listar-profesor.component.css']
})
export class ListarProfesorComponent implements OnInit {
  public profesores:Profesor[]=[]
  public idProfesor: number =0;
  public cargaCompleta:boolean=false

  constructor(private profesorService:ProfesorService) { }

  ngOnInit(): void {
    this.listarProfesores();
  }
  listarProfesores(){
    this.profesorService.listarProfesor().subscribe((response)=>{
      this.profesores= response;
      this.cargaCompleta=true
    })
  }

  guardarid(id:number){
    this.idProfesor = id;
  }

  eliminarProfesor(){
    this.profesorService.eliminarProfesor(this.idProfesor)
      .subscribe((response)=>{
        this.listarProfesores()
      });
  }
}
