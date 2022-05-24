import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/components/Admin/alumnos/alumnos.service';
import { AnexoVService } from 'src/app/components/Alumnos/anexo-v/anexo-v.service';
import { Tarea } from 'src/app/Shared/interfaces/Interface';
import { TutorEscolarService } from '../../tutor-escolar.service';

@Component({
  selector: 'app-validar-tarea',
  templateUrl: './validar-tarea.component.html',
  styleUrls: ['./validar-tarea.component.css']
})
export class ValidarTareaComponent implements OnInit {
  public tareas: Tarea[] = []
  public alumnos: any[] = []
  public alumnoAbuscar: number
  public fechaDesde: Date
  public fechaHasta: Date
  public disabled = true
  public ids: any = []
  constructor(
    private tutorEscolarService: TutorEscolarService,
    private anexovService: AnexoVService) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.alumnos = this.tutorEscolarService.alumnos
    }, 1000);
  }
  mostrarTareasDelAlumno() {
    const objeto = {
      "primeraFecha": this.fechaDesde,
      "segundaFecha": this.fechaHasta,
    }
    this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
      .subscribe((response) => {
        this.tareas = response.filter(tarea => tarea.validadoResponsable == 1 && tarea.validadoTutor == 0)
      })
  }
  guardarid(event) {
  
    this.ids.push(event.source.value)
  }
  validarTarea() {
    this.ids.forEach(element => {
      this.tutorEscolarService.validarTareaTutor(element).subscribe(() => {
        console.log("aaaa", element)
      })
    });
  }

}
