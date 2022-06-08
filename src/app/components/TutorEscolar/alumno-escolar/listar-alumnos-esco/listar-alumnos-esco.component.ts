import { Component, OnInit } from '@angular/core';
import { TutorEscolarService } from '../../tutor-escolar.service';
/**
 * The listar alumnos component
 */
@Component({
  selector: 'app-listar-alumnos-esco',
  templateUrl: './listar-alumnos-esco.component.html',
  styleUrls: ['./listar-alumnos-esco.component.css']
})
export class ListarAlumnosEscoComponent implements OnInit {
  /**
   * Matriz alumnos
   */
  public alumnos:any[]=[]
  /**
   * Tutor sin alumnos
   */
  public sinAlumnos:boolean=false
  /**
   * Constructor
   * @param tutorEscolarService 
   */
  constructor(
    private tutorEscolarService:TutorEscolarService,) { 
      
    }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.listarAlumnosDelTutor()
    }, 1000);
  }
  /**
   * Metedo lista alumnos del tutor
   */
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
