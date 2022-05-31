import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private anexovService: AnexoVService,
    private matSnackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
   setTimeout(() => {
    this.listarAlumnosDelResponsable()
   }, 1000);
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
  public mostrarTareasDelAlumno() {
    const objeto = {
      "primeraFecha": this.fechaDesde,
      "segundaFecha": this.fechaHasta,
    }
    this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
      .subscribe((response) => {
        this.tareas = response.filter(tarea => tarea.validadoResponsable == 0)
        if(this.tareas.length==0){
          console.log("ddd")
          this.showBasicSnack()
        }
      })

  }
  public guardarid(event) {
    this.ids.push(event.source.value)
  }
  public validarTarea() {
    this.ids.forEach(element => {
      this.tutorResponsableService.validarTareaResponsable(element).subscribe(() => {
        if(this.ids[this.ids.length-1]==element){
          this.snackValidado()
          this.ids=[]
        }
      })
    });
  }
  snackValidado() {
    let snackBarColor = this.matSnackBar.open(`Tareas validadas con éxito`, "Close",
    {
      duration: 4000,
      panelClass: ["snack-style"]
    });
    snackBarColor.onAction().subscribe(() => {
      snackBarColor.dismiss();
    });
  }
  private listarAlumnosDelResponsable(){
    this.tutorResponsableService.listarAlumnosDelResponsable().subscribe((res)=>{
      this.alumnos= res
    })
  }
}
