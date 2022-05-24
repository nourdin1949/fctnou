import { Component, OnInit } from '@angular/core';
import { AnexoVService } from 'src/app/components/Alumnos/anexo-v/anexo-v.service';
import { TutorEscolarService } from 'src/app/components/TutorEscolar/tutor-escolar.service';
import { Tarea } from 'src/app/Shared/interfaces/Interface';
import { TutorEmpresaService } from '../../tutor-empresa.service';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {
  public tareas: Tarea[] = []
  public alumnos: any[] =[]
  public alumnoAbuscar: number
  public fechaDesde: Date
  public fechaHasta: Date
  public disabled = true
  public ids: any = []
  constructor(
    private tutorResponsableService: TutorEmpresaService,
    private anexovService: AnexoVService) {

  }

  ngOnInit(): void {
   setTimeout(() => {
    this.listarAlumnosDelResponsable()
   }, 1000);
  }
  mostrarTareasDelAlumno() {
    const objeto = {
      "primeraFecha": this.fechaDesde,
      "segundaFecha": this.fechaHasta,
    }
    this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
      .subscribe((response) => {
        this.tareas = response.filter(tarea => tarea.validadoResponsable == 0)
        console.log(this.tareas)
      })

  }
  guardarid(event) {
    this.ids.push(event.source.value)
  }
  validarTarea() {
    this.ids.forEach(element => {
      this.tutorResponsableService.validarTareaResponsable(element).subscribe(() => {
        if(this.ids[this.ids.length-1]==element){
          (<HTMLButtonElement>document.getElementById("validado")).click()
          setTimeout(() => {
            (<HTMLElement>document.getElementById('validarTarea')).classList.remove('modal-open');
            (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('modal-backdrop'))[0].classList.remove('modal-backdrop')
          }, 300);
        }
      })
    });
  }

  listarAlumnosDelResponsable(){
    this.tutorResponsableService.listarAlumnosDelResponsable().subscribe((res)=>{
      this.alumnos= res
    })
  }
}
