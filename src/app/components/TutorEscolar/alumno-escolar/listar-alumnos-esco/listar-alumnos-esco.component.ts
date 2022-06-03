import { Component, OnInit } from '@angular/core';
import { constrainPoint } from '@fullcalendar/core/util/geom';
import { TutorEscolarService } from '../../tutor-escolar.service';

@Component({
  selector: 'app-listar-alumnos-esco',
  templateUrl: './listar-alumnos-esco.component.html',
  styleUrls: ['./listar-alumnos-esco.component.css']
})
export class ListarAlumnosEscoComponent implements OnInit {
  public alumnos:any[]=[]
  public sinAlumnos:boolean=false
  constructor(
    private tutorEscolarService:TutorEscolarService,) { 
      
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.listarAlumnosDelTutor()
    }, 1000);
  }
  public listarAlumnosDelTutor(){
    this.tutorEscolarService.listarAlumnosDelTutor().subscribe((res)=>{
      this.alumnos= res
      if(this.alumnos.length>0){
        this.sinAlumnos=false
      }else{
        this.sinAlumnos=true
      }
    })
  }
}
