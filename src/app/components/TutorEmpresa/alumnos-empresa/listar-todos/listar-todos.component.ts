import { Component, OnInit } from '@angular/core';
import { TutorEmpresaService } from '../../tutor-empresa.service';
/**
 * The listar todos component
 */
@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrls: ['./listar-todos.component.css']
})
export class ListarTodosComponent implements OnInit {
  /**
   * Matriz de alumnos
   */
  public alumnos: any[]=[]
  /**
   * Responsable sin alumos
   */
  public sinAlumnos:boolean=false
  /**
   * Constructor
   * @param tutorEmpresaService 
   */
  constructor(
    private tutorEmpresaService:TutorEmpresaService) { }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.listarAlumnosDelResponsable()
    }, 1000);
  }
  /**
   * Metodo listar alumnos del responsable
   */
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
