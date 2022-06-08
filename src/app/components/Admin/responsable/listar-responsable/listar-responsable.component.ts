import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Responsable } from 'src/app/utils/interfaces/Interface';
import { ResponsableService } from '../responsable.service';
/**
 * The listar responsable compents
 */
@Component({
  selector: 'app-listar-responsable',
  templateUrl: './listar-responsable.component.html',
  styleUrls: ['./listar-responsable.component.css']
})

export class ListarResponsableComponent implements OnInit {
  /**
   * Responsables matriz
   */
  public responsables: Responsable[] = []
  /**
   * Id responsable 
   */
  public idResponsable: number = 0
  /**
   * Carga completa
   */
  public cargaCompleta: boolean = false
  // Paginación campos
  /**
   * Responsables temporales en matriz
   */
  public respTmp: Responsable[] = []
  /**
   * Total de responsables
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
   * @param responsbaleService 
   * @param _snackBar 
   */
  public constructor(
    private responsbaleService: ResponsableService,
    private _snackBar: MatSnackBar) {}
    
  /**
   * NgOnInt
   */
  public ngOnInit(): void {
    this.listarResponsbles()
  }
  
  /**
   * Metodo listar responsables
   */
  public listarResponsbles() {
    this.responsbaleService.listarResponsables()
      .subscribe(
        (response) => {
          this.responsables = response;
          this.cargaCompleta = true
          setTimeout(() => {
            this.totalElements = this.responsables.length
            this.totalPages = Math.ceil(this.totalElements / this.pageSize)
          }, 300);
          this.respTmp = []
          for (let i = 0; i < this.pageSize * this.currentPage && this.responsables.length > i; i++) {
            this.respTmp[i] = this.responsables[i];
          }

        })
  }
  /**
   * Guardar id responsable
   * @param idResponsable 
   */
  public guardarid(idResponsable: number) {
    this.idResponsable = idResponsable
  }
  /**
   * Eliminar Reponsable
   */
  public eliminarResponsable() {
    this.responsbaleService.eliminarResponsable(this.idResponsable)
      .subscribe(
        () => {
          this.openSnackBar()
          this.listarResponsbles()
          this.firstPage()
        })
  }
  /**
   * Metodo snackbar 
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
      this.respTmp[x] = this.responsables[i]
      x++;
    }
    this.respTmp = this.respTmp.sort(function (a, b) { return a.id - b.id; });

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

    this.respTmp = []

    let x = 0
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.responsables.length > i; i++) {
      this.respTmp[x] = this.responsables[i]
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

    this.respTmp = []
    let x = 0
    for (let i = this.pageSize * this.currentPage - 1; i > this.pageSize * (this.currentPage - 1) - 1; i--) {
      this.respTmp[x] = this.responsables[i]
      x++;
    }
    this.respTmp = this.respTmp.sort(function (a, b) { return a.id - b.id; });

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

    this.respTmp = []
    let x = 0;
    for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * this.currentPage && this.responsables.length > i; i++) {
      this.respTmp[x] = this.responsables[i]
      x++;
    }

    return true
  }
  /**
   * Cambiar tamaño de la pagina
   */
  public changeSize() {
    this.currentPage = 1
    this.listarResponsbles()
  }
}
