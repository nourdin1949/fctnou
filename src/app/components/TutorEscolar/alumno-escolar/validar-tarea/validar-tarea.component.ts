import {  Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnexoVService } from 'src/app/components/Alumnos/anexo-v/anexo-v.service';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { customValidatorFecha } from 'src/app/utils/Validators/otrasValidaciones';
import { TutorEscolarService } from '../../tutor-escolar.service';
/**
 * The validar tarea component
 */
@Component({
  selector: 'app-validar-tarea',
  templateUrl: './validar-tarea.component.html',
  styleUrls: ['./validar-tarea.component.css']
})
export class ValidarTareaComponent {
  /**
   * Matriz de tareas
   */
  public tareas: Tarea[] = []
  /**
   * Matriz de alumnos
   */
  public alumnos: any[] = []
  /**
   * Alumno a validar sus tareas
   */
  public alumnoAbuscar: number
  /**
   * Fecha Maxima
   */
  public fechaMaxima: Date = new Date()
  /**
   * Deshabilitar
   */
  public disabled = true
  /**
   * Matriz de ids de tareas a validar
   */
  public ids: any = []
  /**
   * Formulario
   */
  public formBuscaTarea: FormGroup
  /**
   * Controls de fecha inicio
   */
  get inicio() {
    return this.formBuscaTarea.controls['inicio']
  }
  /**
   * Controls de fecha fin
   */
  get fin() {
    return this.formBuscaTarea.controls['fin']
  }

  // Paginación campos
  /**
   * Tareas temporales en matriz
   */
  public tareasTmp: Tarea[] = []
  /**
   * Total de tareas
   */
  public totalElements: number;
  /**
   * Pagina actual
   */
  @Input()
  public currentPage: number = 0;
  /**
   * Total de paginas
   */
  @Input()
  public totalPages: number = 0;
  /**
   * Numero de filas a mostrar en la tabla
   */
  @Input()
  public pageSize: number = 5;
  /**
   * Tamaños de página a elegir
   */
  public sizes: number[] = [5, 10,15,20];
  /**
   * Contructor
   * @param tutorEscolarService 
   * @param anexovService 
   * @param matSnackBar 
   * @param fb 
   */
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
  /**
   * NgOnInit
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.listarAlumnosDelTutor()
    }, 1000);
  }
  /**
   * Mostrar un snakckbar 
   */
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
  /**
   * Metodo buscar tareas de alumnos
   */
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
  /**
   * Método guardar id de tareas a validar
   * @param event 
   */
  public guardarid(event) {
    if (!this.ids.find(element => element == event.source.value)) {
      this.ids.push(event.source.value)
    }else{
      if (this.ids.indexOf(event.source.value)!=-1 ) {
        this.ids.splice(this.ids.indexOf(event.source.value),1);
      }
    }
  }
  /**
   * Metodo para validar la tarea
   */
  public validarTarea() {
    this.ids.forEach(element => {
      this.tutorEscolarService.validarTareaTutor(element).subscribe(() => {
        if (this.ids[this.ids.length - 1] == element) {
          this.mostrarTareasDelAlumno()
          this.snackValidado()
          this.ids = []
        }
      })
    });
  }
  /**
   * Metodo para mostrar un snackbar
   */
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
  /**
   * Método para listar alumnos del tutor
   */
  private listarAlumnosDelTutor() {
    this.tutorEscolarService.listarAlumnosDelTutor().subscribe((res) => {
      this.alumnos = res
    })
  }
  /**
   * Metodo dirige a la primera página
   * @returns 
   */
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
  /**
   * Método dirige a la siguiente pagina
   * @returns 
   */
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
/**
   * Método dirige a la anteriro pagina
   * @returns 
   */
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
  /**
   * Método dirige a la ultima pagina
   * @returns 
   */
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
  /**
   * Cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.mostrarTareasDelAlumno()
  }

}
