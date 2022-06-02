import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnosService } from 'src/app/components/Admin/alumnos/alumnos.service';
import { AnexoVService } from 'src/app/components/Alumnos/anexo-v/anexo-v.service';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { customValidatorFecha } from 'src/app/utils/Validators/otrasValidaciones';
import { TutorEscolarService } from '../../tutor-escolar.service';

@Component({
  selector: 'app-validar-tarea',
  templateUrl: './validar-tarea.component.html',
  styleUrls: ['./validar-tarea.component.css']
})
export class ValidarTareaComponent implements OnInit, AfterContentChecked {
  public tareas: Tarea[] = []
  public alumnos: any[] = []
  public alumnoAbuscar: number
  public fechaMaxima: Date = new Date()
  public disabled = true
  public ids: any = []
  public formBuscaTarea: FormGroup
  get inicio() {
    return this.formBuscaTarea.controls['inicio']
  }
  get fin() {
    return this.formBuscaTarea.controls['fin']
  }
  constructor(
    private tutorEscolarService: TutorEscolarService,
    private anexovService: AnexoVService,
    private matSnackBar: MatSnackBar,
    private fb:FormBuilder) {
      this.formBuscaTarea = this.fb.group({
        inicio: ["", Validators.required],
        fin: ["", Validators.required],
        alumno:["", Validators.required]
      }, { validator: customValidatorFecha.customValidFecha('inicio', 'fin') })
  }

  ngOnInit(): void {
   this.listarAlumnosDelTutor()
  }
  
  showBasicSnack() {
    let snackBarColor = this.matSnackBar.open(`No tiene tareas entre ${this.inicio.value} y ${this.fin.value}`, "Close",
    {
      duration: 4000,
      panelClass: ["snack-style"]
    });
    snackBarColor.onAction().subscribe(() => {
      snackBarColor.dismiss();
    });
  }
  public ngAfterContentChecked(): void {
    let area = <NodeListOf<HTMLTextAreaElement>>document.querySelectorAll(".cajas-texto")
    area.forEach((elemento) => {
      elemento.style.height = `${elemento.scrollHeight}px`
      console.log(`${elemento.scrollHeight}px`)
    })
  }
  mostrarTareasDelAlumno() {
    const objeto = {
      "primeraFecha": this.inicio.value,
      "segundaFecha": this.fin.value,
    }
    if (this.formBuscaTarea.valid) {
      this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
        .subscribe((response) => {
          this.tareas = response.filter(tarea => tarea.validadoResponsable == 1 && tarea.validadoTutor == 0)
          if (this.tareas.length == 0) this.showBasicSnack()
        })
    }

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
