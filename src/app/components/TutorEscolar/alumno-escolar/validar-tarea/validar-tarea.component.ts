import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private anexovService: AnexoVService,
    private matSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
   this.listarAlumnosDelTutor()
  }
  showBasicSnack() {
    let snackBarColor = this.matSnackBar.open(`No tiene tareas entre ${this.fechaDesde} y ${this.fechaHasta}`, "Close",
    {
      duration: 4000,
      panelClass: ["snack-style"]
    });
    snackBarColor.onAction().subscribe(() => {
      snackBarColor.dismiss();
    });
  }
  mostrarTareasDelAlumno() {
    const objeto = {
      "primeraFecha": this.fechaDesde,
      "segundaFecha": this.fechaHasta,
    }
    this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
      .subscribe((response) => {
        this.tareas = response.filter(tarea => tarea.validadoResponsable == 1 && tarea.validadoTutor == 0)
        if(this.tareas.length==0) this.showBasicSnack()
      })
  }
  guardarid(event) {
  
    this.ids.push(event.source.value)
  }
  validarTarea() {
    this.ids.forEach(element => {
      this.tutorEscolarService.validarTareaTutor(element).subscribe(() => {
        if(this.ids[this.ids.length-1]==element){
          this.snackValidado()
          this.ids=[]
        }
      })
    });
  }

  public snackValidado() {
    let snackBarColor = this.matSnackBar.open(`Tareas validadas con éxito`, "Close",
    {
      duration: 4000,
      panelClass: ["snack-style"]
    });
    snackBarColor.onAction().subscribe(() => {
      snackBarColor.dismiss();
    });
  }
  private listarAlumnosDelTutor(){
    this.tutorEscolarService.listarAlumnosDelTutor().subscribe((res)=>{
      this.alumnos= res
      console.log(res)
    })
  }
}
