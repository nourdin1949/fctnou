import { Component, OnInit } from '@angular/core';
import { TutorEmpresaService } from '../../tutor-empresa.service';

@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrls: ['./listar-todos.component.css']
})
export class ListarTodosComponent implements OnInit {
  public alumnos: any[]=[]
  public sinAlumnos:boolean=false

  constructor(
    private tutorEmpresaService:TutorEmpresaService) { }

  ngOnInit(): void {
  setTimeout(() => {
    this.listarAlumnosDelResponsable()
  }, 1000);
  }



  public listarAlumnosDelResponsable(){
    this.tutorEmpresaService.listarAlumnosDelResponsable().subscribe((res)=>{
      this.alumnos= res
      if(this.alumnos.length>0){
        this.sinAlumnos=false
      }else{
        this.sinAlumnos=true
      }
    })
  }
}
