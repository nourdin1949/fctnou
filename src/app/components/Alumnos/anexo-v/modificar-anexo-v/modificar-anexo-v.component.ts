import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Tarea } from 'src/app/Shared/interfaces/Interface';
import { AnexoVService } from '../anexo-v.service';

@Component({
  selector: 'app-modificar-anexo-v',
  templateUrl: './modificar-anexo-v.component.html',
  styleUrls: ['./modificar-anexo-v.component.css']
})
export class ModificarAnexoVComponent implements OnInit {
  public id: number=0
  public fecha: string=""
  public tareas:Tarea[]=[]
  public eliminado:boolean=false
  public cargaCompleta:boolean=false
  constructor(
    private anecovService:AnexoVService, 
    private activatedRoute:ActivatedRoute,
    private route:Router) {
      this.activatedRoute.params.subscribe((param)=>{
        this.id = param['id']
        this.fecha = param['fecha']
      })
     }

  ngOnInit(): void {
    this.cargarTabla()
  }

  cargarTabla(){
    this.anecovService.listarTareasPorID(this.id).subscribe((res)=>{
      this.tareas=res
      this.cargaCompleta=true
      console.log(this.tareas)
    })
  }
  modificarTareas(){
    console.log((<HTMLInputElement>document.getElementById(`dificultad${0}`))?.value)
    for (let i = 0; i < this.tareas.length; i++) {
      console.log((<HTMLInputElement>document.getElementById(`descripcion${i}`))?.value)
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
      this.anecovService.modificarTareaAlumno(tarea,this.id).subscribe(()=>{
        (<HTMLButtonElement>document.getElementById("modificado")).click()
      })
    }
  }
  public eliminarTarea(){
    this.anecovService.eliminarTarea(this.id)
      .subscribe(()=>{
        this.tareas=[]
        this.eliminado=true
        this.cargaCompleta=false
        // this.route.navigateByUrl('alumno/calendario')
    })
  }
}
