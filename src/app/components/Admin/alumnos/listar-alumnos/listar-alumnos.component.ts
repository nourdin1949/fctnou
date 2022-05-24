import { Component, OnInit } from '@angular/core';

import { AlumnosService } from '../alumnos.service';
import { Alumno, Empresa } from 'src/app/Shared/interfaces/Interface';
@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrls: ['./listar-alumnos.component.css']
})
export class ListarAlumnosComponent implements OnInit {
  public empresas:Empresa[]=[]
  public alumnos:Alumno[]=[]
  public alumnosfct:Alumno[]=[]
  public id:number=0
  constructor(private alumnoservice:AlumnosService) {
 
  }
  
  ngOnInit(): void {
    this.listarAlumnos()
  }
  listarAlumnos(){
    this.alumnoservice.listarAlumnos().subscribe((response)=>{
      this.alumnos=response
    })
  }
  public eliminarAlumno(idAlumno:number){
    this.alumnoservice.eliminarAlumno(idAlumno).subscribe((response)=>{
      this.listarAlumnos()
    })
  }
  public guardarid(idAlumno:number){
    this.id=idAlumno
  }
}
