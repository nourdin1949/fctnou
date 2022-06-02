import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnexoVService } from 'src/app/components/Alumnos/anexo-v/anexo-v.service';
import { TutorEscolarService } from 'src/app/components/TutorEscolar/tutor-escolar.service';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { customValidatorFecha } from 'src/app/utils/Validators/otrasValidaciones';
import { TutorEmpresaService } from '../../tutor-empresa.service';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit, AfterContentChecked {
  public tareas: Tarea[] = []
  public alumnos: any[] =[]
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
    private tutorResponsableService: TutorEmpresaService,
    private anexovService: AnexoVService,
    private matSnackBar: MatSnackBar,
    private  fb:FormBuilder) {

      this.formBuscaTarea = this.fb.group({
        inicio: ["", Validators.required],
        fin: ["", Validators.required],
        alumno:["", Validators.required]
      }, { validator: customValidatorFecha.customValidFecha('inicio', 'fin') })
  }

  public ngOnInit(): void {
    this.listarAlumnosDelResponsable()
  }
  public ngAfterContentChecked(): void {
    let area = <NodeListOf<HTMLTextAreaElement>>document.querySelectorAll(".cajas-texto")
    area.forEach((elemento) => {
      elemento.style.height = `${elemento.scrollHeight}px`
      console.log(`${elemento.scrollHeight}px`)
    })
  }
  private showBasicSnack() {
    let snackBarColor = this.matSnackBar.open(`No tiene tareas entre ${this.inicio.value} y ${this.fin.value}`, "Close",
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
      "primeraFecha": this.inicio.value,
      "segundaFecha": this.fin.value,
    }
    if(this.formBuscaTarea.valid){
      this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
      .subscribe((response) => {
        this.tareas = response.filter(tarea => tarea.validadoResponsable == 0)
        if(this.tareas.length==0){
          console.log("ddd")
          this.showBasicSnack()
        }
      })
    }
    
  }
  public guardarid(event) {
    this.ids.push(event.source.value)
  }
  public validarTarea() {
    this.ids.forEach(element => {
      this.tutorResponsableService.validarTareaResponsable(element).subscribe(() => {
        if(this.ids[this.ids.length-1]==element){
          this.mostrarTareasDelAlumno()
          this.snackValidado()
          this.ids=[]
        }
      })
    });
  }
  private snackValidado() {
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
