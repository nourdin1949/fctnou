import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { AnexoVService } from '../anexo-v.service';
/**
 * The modificar anexo v component
 */
@Component({
  selector: 'app-modificar-anexo-v',
  templateUrl: './modificar-anexo-v.component.html',
  styleUrls: ['./modificar-anexo-v.component.css']
})
export class ModificarAnexoVComponent implements OnInit {
  /**
   * Id
   */
  public id: number=0
  /**
   * Fecha
   */
  public fecha: string=""
  /**
   * Matriz tareas
   */
  public tareas:Tarea[]=[]
  /**
   * Eliminado 
   */
  public eliminado:boolean=false
  /**
   * Al carga 
   */
  public cargaCompleta:boolean=false
  /**
   * Constructor
   * @param anecovService 
   * @param activatedRoute 
   * @param route 
   */
  constructor(
    private anecovService:AnexoVService, 
    private activatedRoute:ActivatedRoute,
    private route:Router) {
      this.activatedRoute.params.subscribe((param)=>{
        this.id = param['id']
        this.fecha = param['fecha']
      })
     }
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    this.cargarTabla()
  }
  /**
   * Datos en la tabla 
   */
  public cargarTabla(){
    this.anecovService.listarTareasPorID(this.id).subscribe((res)=>{
      this.tareas=res
      this.cargaCompleta=true
    })
  }
  /**
   * Modificar tareas
   */
  public modificarTareas(){
    for (let i = 0; i < this.tareas.length; i++) {
      const tarea:Tarea={
        "id":this.id,
        "alumno_id":"0",
        "descripcion":(<HTMLInputElement>document.getElementById(`descripcion${i}`))?.value,
        "orientacion":(<HTMLInputElement>document.getElementById(`orientacion${i}`))?.value,
        "tiempo":(<HTMLInputElement>document.getElementById(`tiempo${i}`))?.value+":00",
        "fecha":new Date(this.fecha),
        "dificultad":(<HTMLInputElement>document.getElementById(`dificultad${i}`))?.value,
        "observaciones":(<HTMLInputElement>document.getElementById(`observaciones${i}`))?.value,
        "validadoResponsable":0,
        "validadoTutor":0
      }
      this.anecovService.modificarTareaAlumno(tarea,this.id)
        .subscribe(
          ()=>{
            (<HTMLButtonElement>document.getElementById("modificado")).click()
      })
    }
  }
  /**
   * Eliminar tareas
   */
  public eliminarTarea(){
    this.anecovService.eliminarTarea(this.id)
      .subscribe(()=>{
        this.tareas=[]
        this.eliminado=true
        this.cargaCompleta=false
        this.route.navigateByUrl('alumno/calendario')
    })
  }
}
