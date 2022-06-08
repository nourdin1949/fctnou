import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profesor } from 'src/app/utils/interfaces/Interface';
import { ProfesorService } from '../profesor.service';
/**
 * The listar profesor component
 */
@Component({
  selector: 'app-listar-profesor',
  templateUrl: './listar-profesor.component.html',
  styleUrls: ['./listar-profesor.component.css']
})
export class ListarProfesorComponent implements OnInit {
  /**
   * Matriz de profesores
   */
  public profesores: Profesor[] = []
  /**
   * ID profesor
   */
  public idProfesor: number = 0;
  /**
   * al cargar completa
   */
  public cargaCompleta: boolean = false
  // Paginación campos
  /**
   * profesores temporales en matriz
   */
  public profesorTmp: Profesor[] = []
  /**
   * Total de profesores
   */
  public totalElements: number;
  /**
   * Pagina actual
   */
  @Input()
  public currentPage: number = 1;
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
  public sizes: number[] = [5, 10, 15, 20];
  /**
   * Constructor
   * @param profesorService 
   */
  constructor(
    private profesorService: ProfesorService,
    private _snackBar: MatSnackBar) { }

  /**
   * NgOnInit
   */
  ngOnInit(): void {
    this.listarProfesores();

  }

  /**
   * Listar Profesores
   */
  public listarProfesores() {
    this.profesorService.listarProfesor()
      .subscribe(
        (response) => {
          this.profesores = response;
          this.cargaCompleta = true
          this.totalElements = this.profesores.length
          this.totalPages = Math.ceil(this.totalElements / this.pageSize)
          this.profesorTmp = []
          for (let i = 0; i < this.pageSize * this.currentPage && this.profesores.length > i; i++) {
            this.profesorTmp[i] = this.profesores[i];
          }
        })
  }
  /**
   * Metodo guardar id profesor
   * @param id 
   */
  public guardarid(id: number) {
    this.idProfesor = id;
  }
  /**
   *Metodo eliminar profesor
   */
  public eliminarProfesor() {
    this.profesorService.eliminarProfesor(this.idProfesor)
      .subscribe(
        () => {
          this.listarProfesores()
          this.openSnackBar()
          this.firstPage()
        });
  }
  /**
  * metodo open snack bar al eliminar
  */
  public openSnackBar() {
    this._snackBar.open("Eliminado con éxito", "Close",
      {
        duration: 3000
      });
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
      this.profesorTmp[x] = this.profesores[i]
      x++;
    }
    this.profesorTmp = this.profesorTmp.sort(function (a, b) { return a.id - b.id; });

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

    this.profesorTmp = []

    let x = 0
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.profesores.length > i; i++) {
      this.profesorTmp[x] = this.profesores[i]
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

    this.profesorTmp = []
    let x = 0
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.profesorTmp[x] = this.profesores[i]
      x++;
    }
    this.profesorTmp = this.profesorTmp.sort(function (a, b) { return a.id - b.id; });

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

    this.profesorTmp = []
    let x = 0;
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.profesores.length > i; i++) {
      this.profesorTmp[x] = this.profesores[i]
      x++;
    }

    return true
  }
  /**
   * Cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.listarProfesores()
  }
}
