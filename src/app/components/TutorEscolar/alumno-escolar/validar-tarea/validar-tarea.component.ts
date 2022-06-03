import { AfterContentChecked, AfterViewInit, Component, DoCheck, Input, OnInit } from '@angular/core';
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
export class ValidarTareaComponent implements OnInit {
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

  // Paginación campos
  public tareasTmp: Tarea[] = []
  public totalElements: number;
  public listElements: object[];
  @Input()
  public currentPage: number = 0;
  @Input()
  public totalPages: number = 0;
  @Input()
  public pageSize: number = 5;
  public sizes: number[] = [5, 10];

  constructor(
    private tutorEscolarService: TutorEscolarService,
    private anexovService: AnexoVService,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.formBuscaTarea = this.fb.group({
      inicio: ["", Validators.required],
      fin: ["", Validators.required],
      alumno: ["", Validators.required]
    }, { validator: customValidatorFecha.customValidFecha('inicio', 'fin') })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.listarAlumnosDelTutor()
    }, 1000);
  }
  private showBasicSnack() {
    let snackBarColor = this.matSnackBar.open(`No tiene tareas pendientes entre ${this.inicio.value} y ${this.fin.value}`, "Close",
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
    if (this.formBuscaTarea.valid) {
      this.currentPage = 1
      this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
        .subscribe((response) => {
          this.tareas = response.filter(tarea => tarea.validadoResponsable == 1 && tarea.validadoTutor == 0)
          if (this.tareas.length == 0) {
            this.showBasicSnack()
          } else {
            setTimeout(() => {
              let area = <NodeListOf<HTMLTextAreaElement>>document.querySelectorAll(".cajas-texto")
              area.forEach((elemento) => {
                console.log(elemento.scrollHeight + 2)
                elemento.style.height = `${elemento.scrollHeight + 2}px`
                console.log(`${elemento.scrollHeight}px`)
              }, 1000);
              setTimeout(() => {
                this.totalElements = this.tareas.length
                this.totalPages = Math.ceil(this.totalElements / this.pageSize)
              }, 300);
              this.tareasTmp = []
              for (let i = 0; i <this.pageSize * this.currentPage&& this.tareas.length > i ; i++) {
                this.tareasTmp[i] = this.tareas[i];
              }
            })
          }

        })
    }

  }
  public guardarid(event) {


    console.log(this.ids, event.source.value)
    if (!this.ids.find(element => element = event.source.value)) {
      this.ids.push(event.source.value)
    }
    console.log(this.ids)
  }
  public validarTarea() {
    this.ids.forEach(element => {
      this.tutorEscolarService.validarTareaTutor(element).subscribe(() => {
        if (this.ids[this.ids.length - 1] == element) {
          this.snackValidado()
          this.ids = []
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
  private listarAlumnosDelTutor() {
    this.tutorEscolarService.listarAlumnosDelTutor().subscribe((res) => {
      this.alumnos = res
    })
  }

  public firstPage() {
    if (this.currentPage === 1) {
      return false;
    }

    this.currentPage = 1;
    let x = 0;
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.tareasTmp[x] = this.tareas[i]
      x++;
    }
    this.tareasTmp = this.tareasTmp.sort(function (a, b) { return a.id - b.id; });

    return true
  }

  public nextPage() {
    if (this.currentPage >= this.totalPages) {
      return false;
    }
    this.currentPage++;

    this.tareasTmp = []

    let x = 0
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.tareas.length > i; i++) {
      this.tareasTmp[x] = this.tareas[i]
      x++;
    }

    return true
  }

  public prevPage() {
    if (this.currentPage <= 1) {
      return false;
    }
    this.currentPage--;

    this.tareasTmp = []
    let x = 0
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.tareasTmp[x] = this.tareas[i]
      x++;
    }
    this.tareasTmp = this.tareasTmp.sort(function (a, b) { return a.id - b.id; });

    return true
  }

  public lastPage() {
    if (this.currentPage === this.totalPages) {
      return false;
    }
    this.currentPage = this.totalPages;

    this.tareasTmp = []
    let x = 0;
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.tareas.length > i; i++) {
      this.tareasTmp[x] = this.tareas[i]
      x++;
    }

    return true
  }

  public changeSize() {
    this.currentPage = 1
    this.mostrarTareasDelAlumno()
  }

}
