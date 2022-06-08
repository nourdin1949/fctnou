import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnexoVService } from 'src/app/components/Alumnos/anexo-v/anexo-v.service';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { customValidatorFecha } from 'src/app/utils/Validators/otrasValidaciones';
import { TutorEmpresaService } from '../../tutor-empresa.service';
/**
 * The validar component
 */
@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {
  /**
   * Matriz tareas 
   */
  public tareas: Tarea[] = []
  /**
   * Matriz alumnos
   */
  public alumnos: any[] =[]
  /**
   * Dni alumno a validar tareas
   */
  public alumnoAbuscar: number
  /**
   * Fecha máxima a seleccionar
   */
  public fechaMaxima: Date = new Date()
  /**
   * Deshabilitar
   */
  public disabled = true
  /**
   * Matriz de id de tareas a validar
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
  * Matriz de tareas temporales
  */
  public tareasTmp: Tarea[] = []
  /**
   * Tareas totales
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
   * Tamaño de pagina
   */
  @Input()
  public pageSize: number = 5;
  /**
   * Matriz de tamaño de pagina
   */
  public sizes: number[] = [5, 10,15,20];
  /**
   * Constructor
   * @param tutorResponsableService 
   * @param anexovService 
   * @param matSnackBar 
   * @param fb 
   */
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
  /**
   * NgOnInit
   */
  public ngOnInit(): void {
   setTimeout(() => {
    this.listarAlumnosDelResponsable()
   }, 1000);
  }
  /**
   * Método mostrar snackbar
   */
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
  /**
   * Metodo listar tareas del usuario
   */
  public mostrarTareasDelAlumno() {
    const objeto = {
      "primeraFecha": this.inicio.value,
      "segundaFecha": this.fin.value,
    }
    if(this.formBuscaTarea.valid){
      console.log("formulario")
      this.currentPage = 1
      this.anexovService.listarTareasEntreFechas(objeto, this.alumnoAbuscar)
      .subscribe((response) => {
        this.tareas = response.filter(tarea => tarea.validadoResponsable == 0)
        if(this.tareas.length==0){ this.showBasicSnack()
        } else {
          setTimeout(() => {
            let area = <NodeListOf<HTMLTextAreaElement>>document.querySelectorAll(".cajas-texto")
            area.forEach((elemento) => {
              elemento.style.height = `${elemento.scrollHeight + 2}px`
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
   * Método guardar ids de tareas a validar
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
   * Método validar tareas
   */
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
  /**
   * Método mostrar snackbar
   */
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
  /**
   * Método listar alumnos del responsble
   */
  private listarAlumnosDelResponsable(){
    this.tutorResponsableService.listarAlumnosDelResponsable().subscribe((res)=>{
      this.alumnos= res
    })
  }
  /**
   * Metodo dirige a la primera pagina
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
   * Metodo dirige a la siguiente pagina
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
   * Metodo dirige a la anterior pagina
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
   * Metodo dirige a la ultima pagina
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
   * Metodo cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.mostrarTareasDelAlumno()
  }

}
