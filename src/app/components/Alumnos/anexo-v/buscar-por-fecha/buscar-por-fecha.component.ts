import { Component, Input, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnexoVService } from '../anexo-v.service';
import { Tarea } from 'src/app/utils/interfaces/Interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customValidatorFecha } from 'src/app/utils/Validators/otrasValidaciones';
/**
 * The buscar por fecha component
 */
@Component({
  selector: 'app-buscar-por-fecha',
  templateUrl: './buscar-por-fecha.component.html',
  styleUrls: ['./buscar-por-fecha.component.css']
})
export class BuscarPorFechaComponent implements OnInit {
  /**
   * Datos a mostrar matriz
   */
  public datos: any = []
  /**
   * Fecha minima seleccion
   */
  public fechaMinimo: string = JSON.parse(localStorage.getItem("user")!).created_at
  /**
   * Fecha maxima seleccion
   */
  public fechaMaxima: Date = new Date()
  /**
   * Controls fecha inicio
   */
  get inicio() {
    return this.formBuscaTarea.controls['inicio']
  }
  /**
   * Controls fecha inicio
   */
  get fin() {
    return this.formBuscaTarea.controls['fin']
  }
  /**
   * Matriz tareas
   */
  public tareas: Tarea[] = []
  /**
   * Matriz Tareas temporal
   */
  public tareasTmp: Tarea[] = []
  /**
   * Buscar 
   */
  public buscar: boolean = false
  /**
   * Formulario
   */
  public formBuscaTarea: FormGroup

  // Paginación campos
  /**
   * tareas totakes
   */
  public totalElements: number;
  /**
   * Pagina actual
   */
  @Input()
  public currentPage: number = 0;
  /**
   * Pagina total
   */
  @Input()
  public totalPages: number = 0;
  /**
   * Pagina tamaño
   */
  @Input()
  public pageSize: number = 5;
  /**
   * Matriz de tamaño de paginas
   */
  public sizes: number[] = [5, 10,15,20];
  /**
   * Constructor
   * @param anexovService 
   * @param fb 
   */
  constructor(private anexovService: AnexoVService,
    private fb: FormBuilder) {
    this.formBuscaTarea = this.fb.group({
      inicio: ["", Validators.required],
      fin: ["", Validators.required],
    }, { validator: customValidatorFecha.customValidFecha('inicio', 'fin') })
  }
  /**
   * Descargar anexo v
   */
  downloadPDF() {
    // Extraemos el
    let dniAlumno = JSON.parse(localStorage.getItem("user")!).username
    const DATA = <HTMLElement>document.getElementById('pdfdata');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    (<HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("hide"))[0].classList.remove("hide")
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${dniAlumno}_Tareas_de_${this.inicio}_a_${this.fin}.pdf`);
    });
  }
  /**
   * metodo listar 
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.semanal()
    }, 600);
  }
  /**
   * Buscar tareas
   */
  public buscarTareas() {
    if (this.formBuscaTarea.valid) {
      this.currentPage = 1
      this.buscar = true
      let idAlumno = sessionStorage.getItem('id');
      const objetoFechas = {
        "primeraFecha": this.inicio.value,
        "segundaFecha": this.fin.value,
      }
      this.anexovService.listarTareasEntreFechasAlumno(objetoFechas, idAlumno)
        .subscribe(
          (res) => {
            this.tareas = res
            setTimeout(() => {
              this.totalElements = this.tareas.length
              this.totalPages = Math.ceil(this.totalElements / this.pageSize)
            }, 300);
            this.tareasTmp = []
            for (let i = 0; i <this.pageSize * this.currentPage&& this.tareas.length > i ; i++) {
              this.tareasTmp[i] = this.tareas[i];
            }
            this.buscar = false
          })
    }
  }
  /**
   * Redirige a la primer pagina
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
   * Redirige a la siguiente pagina
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
   * Redirige a la anterior pagina
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
   * Redirige a la ultima pagina
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
    this.buscarTareas()
  }
  /**
   * Listar tareas semanales
   */
  public semanal() {
    this.anexovService.fichasemanal().subscribe((res) => {
      this.datos = res
    })
  }
}
